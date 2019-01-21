/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectSegs = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['video_data', 'segslist'])
);

export {
    selectGlobal,
    makeSelectLoading,
    makeSelectError,
    makeSelectSegs,
  };
  