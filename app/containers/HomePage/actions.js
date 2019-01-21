
import { CHANGE_SEGINFO } from './constants';


export function changeSegInfo(info) {
  return {
    type: CHANGE_SEGINFO,
    info
  };
}
