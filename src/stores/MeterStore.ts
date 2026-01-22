import { types, flow, getRoot } from 'mobx-state-tree';
import { Meter } from '../models/Meter';
import type { RootStoreType } from './RootStore';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

interface MeterApiData {
  id: string;
  _type: string | string[];
  area?: { id: string };
  installation_date: string;
  is_automatic: boolean | null;
  initial_values: number[];
  description: string;
}

const normalizeType = (type: string | string[]) => {
  if (Array.isArray(type)) {
    return type[0];
  }
  return type;
};

const mapApiMeter = (meter: MeterApiData) => ({
  id: meter.id,
  _type: normalizeType(meter._type),
  areaId: meter.area?.id ?? '',
  installation_date: meter.installation_date,
  is_automatic: Boolean(meter.is_automatic),
  initial_values: meter.initial_values,
  description: meter.description ?? '',
});

export const MeterStore = types
  .model('MeterStore', {
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
        const res = yield fetch(
          `${API_BASE}/v4/test/meters/?limit=${limit}&offset=${offset}`
        );

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = yield res.json();

        self.count = data.count;
        self.meters.replace(data.results.map(mapApiMeter));
        self.offset = offset;

        const areaIds = Array.from(
          new Set(self.meters.map((m) => m.areaId).filter(Boolean))
        );

        getRoot<RootStoreType>(self).areaStore.fetchAreas(areaIds);
      } catch (error) {
        console.error('Failed to fetch meters', error);
      } finally {
        self.loading = false;
      }
    }),

    deleteMeter: flow(function* (id: string) {
      const fetchNextMeter = flow(function* () {
        try {
          const nextOffset = self.offset + self.meters.length;
          const nextRes = yield fetch(
            `${API_BASE}/v4/test/meters/?limit=1&offset=${nextOffset}`
          );
          if (!nextRes.ok) return;

          const data = yield nextRes.json();

          const newMeter = mapApiMeter(data.results[0]);
          self.meters.push(newMeter);

          if (newMeter.areaId) {
            getRoot<RootStoreType>(self).areaStore.fetchAreas([
              newMeter.areaId,
            ]);
          }
        } catch (error) {
          console.error('Failed to fetch next meter', error);
        }
      });

      try {
        const res = yield fetch(`https://showroom.eis24.me/c300/api/v4/test/meters/${id}/`, {
          method: 'DELETE',
        });
        //`${API_BASE}/v4/test/meters/${id}/`

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        self.meters.replace(self.meters.filter((meter) => meter.id !== id));
        self.count -= 1;

        yield fetchNextMeter();
      } catch (error) {
        console.error('Failed to delete meter', error);
      }
    }),
  }));
