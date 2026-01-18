// модель area (адреса)

import { types } from "mobx-state-tree";

export const Area = types.model("Area", {
  id: types.identifier, //types.identifierNumber,
  street: types.string,
  house: types.string,
  apartment: types.maybeNull(types.string),
});
