// store списка счётчиков

import { types, flow } from "mobx-state-tree";
import { Meter } from "./Meter";

interface MeterApiData {
  id: string;
  _type: string | string[];
  installation_date: string;
  is_automatic: boolean | null; //boolean;
  initial_values: number[];
  description: string;
  area?: { id: string };
};

const normalizeType = (type: string | string[]) => {
  if (Array.isArray(type)) {
    return type[0];
  }
  return type;
};

const mapApiMeter = (meter: MeterApiData) => ({
  id: meter.id,
  _type: normalizeType(meter._type),
  installation_date: meter.installation_date,
  is_automatic: Boolean(meter.is_automatic),
  initial_values: meter.initial_values,
  description: meter.description ?? "",
});

export const MeterStore = types
  .model("MeterStore", {
    meters: types.array(Meter),
    count: types.number,
    loading: types.boolean,
    offset: types.number,
    limit: types.number,
  })
  .actions((self) => ({
    fetchMeters: flow(function* (offset = 0, limit = self.limit) {
      self.loading = true;
      try {
        const res = yield fetch(`/c300/api/v4/test/meters/?limit=${limit}&offset=${offset}`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = yield res.json();

        console.log('API Response:', data); // отладка

        self.count = data.count;
        self.meters.replace(data.results.map(mapApiMeter));
        self.offset = offset;
      } catch (error) {
        console.error("Failed to fetch meters", error);
      } finally {
        self.loading = false;
      }
    }),

    deleteMeter: flow(function* (id: string) {
      /* const fetchOne = flow(function* () {
      try {
        const nextOffset = self.offset + self.meters.length;
        const res = yield fetch(`/c300/api/v4/test/meters/?limit=1&offset=${nextOffset}`);

        if (!res.ok) return;

        const data = yield res.json();

        if (data.results.length > 0) {
          self.meters.push(mapApiMeter(data.results[0]));
        }
      } catch (error) {
        console.error("Failed to fetch next meter", error);
      }
    }); */

      try {
        const res = yield fetch(`/c300/api/v4/test/meters/${id}/`, { method: 'DELETE' });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        self.meters.replace(self.meters.filter((meter) => meter.id !== id));
        self.count -= 1;

        // локальный generator
        const nextOffset = self.offset + self.meters.length;
        const nextRes = yield fetch(`/c300/api/v4/test/meters/?limit=1&offset=${nextOffset}`);
        if (!nextRes.ok) return;

        const data = yield nextRes.json();
        if (data.results.length > 0) {
          self.meters.push(mapApiMeter(data.results[0]));
        }

        //yield self.fetchMeters(self.offset, self.limit);
      } catch (error) {
        console.error("Failed to delete meter", error);
      }
    })
  }));
