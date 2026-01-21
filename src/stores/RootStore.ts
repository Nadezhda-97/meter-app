import { types } from "mobx-state-tree";
import type { Instance } from "mobx-state-tree";
import { MeterStore } from "./MeterStore";
import { AreaStore } from "./AreaStore";

export const RootStore = types.model("RootStore", {
  meterStore: MeterStore,
  areaStore: AreaStore,
});

export const createRootStore = () => RootStore.create({
  meterStore: {
    meters: [],
    count: 0,
    loading: false,
    offset: 0,
    limit: 20,
  },
  areaStore: {
    areas: {},
    loading: false,
  },
});

export type RootStoreType = Instance<typeof RootStore>;