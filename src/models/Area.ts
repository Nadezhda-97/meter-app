import { types } from 'mobx-state-tree';

export const Area = types.model('Area', {
  id: types.identifier,
  street: types.maybeNull(types.string),
  house: types.maybeNull(types.string),
  apartment: types.maybeNull(types.string),
});
