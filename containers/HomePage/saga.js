
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_SEGLIST } from 'containers/App/constants';
import { seglistLoaded, seglistLoadingError } from 'containers/App/actions';
import aesjs from 'aes-js';
import request from 'utils/request';
import { getInfo } from 'containers/HomePage/selectors';


const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};


export const encryptData = (text, newKey, newIv) => {
  const key = aesjs.utils.utf8.toBytes(newKey);
  const iv = aesjs.utils.utf8.toBytes(newIv);
  const textBytes = aesjs.padding.pkcs7.pad(aesjs.utils.utf8.toBytes(text));

  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const encryptedBytes = aesCbc.encrypt(textBytes);

  return arrayBufferToBase64(encryptedBytes);
};

export const getTimeTick = (date) => {
  let d = new Date();
  let n = d.getTimezoneOffset() * 60;
  let datum = new Date(date);
  return (datum.getTime() - n * 1000) * 10000 + 621355968000000000;
}

export const getUrl = (serverID,segInfo,_MEDIA_ID) => {
  let now_unix_timestamp = Math.round((new Date()).getTime() / 1000);
  console.log(now_unix_timestamp);

  const serverArr = [
    "https://washington.nagacdn.com", 
    "https://dallas.nagacdn.com", 
    "https://sanjose.nagacdn.com", 
    "https://houston.nagacdn.com",
    "https://sydney.nagacdn.com",
    "https://tokyo.nagacdn.com",
    "https://singapore.nagacdn.com]"
  ];
  return `${serverArr[serverID]}/${_MEDIA_ID}${segInfo.quality}${getTimeTick(segInfo.start_dateTm)}${getTimeTick(segInfo.end_dateTm)}.list?${encryptData(now_unix_timestamp, "cFyKl6d4HNkpLckd", "znj9yYjEg9yGqsdP")}`;
}

export function* getSeglist() {
  const segInfo = yield select(getInfo());
  const requestURL = getUrl(3,segInfo,"29F512FB-5759-488A-914B-4FB70639CB");
  try {
    let segList = yield call(request, requestURL);
    segList = segList.split("\r")
    yield put(seglistLoaded(segList, "info"));
  } catch (err) {
  }
}

export default function* APPLOGIC() {
  yield takeLatest(LOAD_SEGLIST, getSeglist);
}
