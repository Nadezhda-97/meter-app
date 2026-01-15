// модель одного счётчика

import { types } from "mobx-state-tree";
import type { Instance } from "mobx-state-tree";

export const Meter = types.model("Meter", {
    id: types.identifier,
    _type: types.string, // ColdWaterAreaMeter или HotWaterAreaMeter
    installation_date: types.string,
    is_automatic: types.boolean,
    initial_values: types.array(types.number),
    description: types.string,
});

export type MeterInstance = Instance<typeof Meter>;

// позже - добавить адрес