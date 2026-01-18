// store для адресов

import { types, flow } from "mobx-state-tree";
import { Area } from "../models/Area";

interface AreaData {
  id: string;
  street: string;
  house: string;
  apartment: string | null;
}

interface AreaResponse {
  results: AreaData[];
}

export const AreaStore = types
  .model("AreaStore", {
    areas: types.map(Area),
    loading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    fetchAreas: flow(function* (areaIds: string[]) {
      // оставляем только неизвестные
      const idsToFetch = areaIds.filter(
        (id) => id && !self.areas.has(id)
      );

      if (idsToFetch.length === 0) return;

      self.loading = true;

      try {
        const response: Response = yield fetch(
          `/c300/api/v4/test/areas/?id__in=${idsToFetch.join(",")}`
        );

        if (!response.ok) return;

        const data = (yield response.json()) as AreaResponse;

        // кладём в map
        data.results.forEach((area: AreaData) => {
          self.areas.set(String(area.id), {
            id: area.id,
            street: area.street,
            house: area.house,
            apartment: area.apartment,
          });
        });
      } finally {
        self.loading = false;
      }
    }),
  }));
