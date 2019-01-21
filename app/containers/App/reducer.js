import { fromJS } from 'immutable';

import {
  LOAD_SEGLIST,
  LOAD_SEGLIST_SUCCESS,
  LOAD_SEGLIST_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  info: false,
  video_data: {
    segslist: [],
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SEGLIST:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_SEGLIST_SUCCESS:
      return state
        .setIn(['video_data', 'segslist'], action.segslist)
        .set('loading', false)
        .set('info', action.info);
    case LOAD_SEGLIST_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
