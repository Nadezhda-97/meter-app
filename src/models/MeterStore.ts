// store списка счётчиков

import { types, flow } from "mobx-state-tree";
import { Meter } from "./Meter";

interface MeterApiData {
  id: string;
  _type: string[];
  installation_date: string;
  is_automatic: boolean;
  initial_values: number[];
  description: string;
  area?: { id: string };
};

export const MeterStore = types
  .model("MeterStore", {
    meters: types.array(Meter),
    count: types.number,
    loading: types.boolean,
    offset: types.number,
    limit: types.number,
  })
  .actions((self) => ({
    fetchMeters: flow(function* (offset = 0, limit = 20) {
      self.loading = true;
      try {
        const res = yield fetch(`/c300/api/v4/test/meters/?limit=${limit}&offset=${offset}`);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = yield res.json();

        console.log('API Response:', data); // отладка

        self.count = data.count;
        self.meters.replace(
          data.results.map((meter: MeterApiData) => Meter.create({
            id: meter.id,
            _type: meter._type[0],
            installation_date: meter.installation_date,
            is_automatic: meter.is_automatic,
            initial_values: meter.initial_values,
            description: meter.description,
          }))
        );
        self.offset = offset;
      } catch (error) {
        console.error("Failed to fetch meters", error);
      } finally {
        self.loading = false;
      }
    }),
  }));
