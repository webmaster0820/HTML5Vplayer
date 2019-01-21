/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const getInfo = () => createSelector(
  selectHome,
  (homeState) => homeState.get('segInfo')
);

export {
  selectHome,
  makeSelectUsername,
  getInfo,
};
