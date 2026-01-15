// корневой store

import { types } from "mobx-state-tree";
import type { Instance } from "mobx-state-tree";
import { MeterStore } from "./MeterStore";

export const RootStore = types.model("RootStore", {
  meterStore: MeterStore,
});

// Создаём экземпляр
export const createRootStore = () => RootStore.create({
  meterStore: {
    meters: [],
    count: 0,
    loading: false,
    offset: 0,
    limit: 20,
  },
});

// Тип для использования в компонентах
export type RootStoreType = Instance<typeof RootStore>;