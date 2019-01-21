
import {
  LOAD_SEGLIST,
  LOAD_SEGLIST_SUCCESS,
  LOAD_SEGLIST_ERROR,
} from './constants';


export function loadSeglist() {
  return {
    type: LOAD_SEGLIST
  };
}

export function seglistLoaded(segslist, info) {
  return {
    type: LOAD_SEGLIST_SUCCESS,
    segslist,
    info,
  };
}

export function seglistLoadingError(error) {
  return {
    type: LOAD_SEGLIST_ERROR,
    error,
  };
}
