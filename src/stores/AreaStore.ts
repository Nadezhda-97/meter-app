import { types, flow } from "mobx-state-tree";
import { Area } from "../models/Area";

interface AreaApiData {
  id: string;
  house?: {
    id: string;
    address?: string;
  };
  number?: number;
  str_number?: string;
  str_number_full?: string;
}

interface AreaResponse {
  results: AreaApiData[];
}

const mapApiArea = (area: AreaApiData) => {
  const address = area.house?.address ?? "";

  const [, streetPart, housePart] = address.match(/ул\s([^,]+),\sд\s(\d+)/) ?? [];

  const apartment =
    area.str_number ??
    area.str_number_full?.replace(/^кв\.\s*/i, "") ??
    null;

  return {
    id: area.id,
    street: streetPart ?? null,
    house: housePart ?? null,
    apartment,
  };
}

export const AreaStore = types
  .model("AreaStore", {
    areas: types.map(Area),
    loading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    fetchAreas: flow(function* (areaIds: string[]) {
      const idsToFetch = areaIds.filter(
        (id) => id && !self.areas.has(id)
      );

      if (idsToFetch.length === 0) return;

      self.loading = true;

      try {
        const query = idsToFetch.map((id) => `id__in=${id}`).join("&");

        const response: Response = yield fetch(
          `/c300/api/v4/test/areas/?${query}`
        );

        if (!response.ok) return;

        const data = (yield response.json()) as AreaResponse;

        data.results.forEach((area) => {
          const mapped = mapApiArea(area);
          self.areas.set(mapped.id, mapped);
        });
      } finally {
        self.loading = false;
      }
    }),
  }));
