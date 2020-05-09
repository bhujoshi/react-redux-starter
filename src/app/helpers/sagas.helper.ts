import { call, put } from 'redux-saga/effects';
import { logout } from './local.storage.helper';

export default function createSaga(reducerName: string) {
  return function*(apiFunction: (...args: any[]) => {}, apiParams: any) {
    try {
      yield put({
        type: `${reducerName}/${reducerName}Loading`,
        payload: null,
      });
      const response = yield call(apiFunction, apiParams);
      if (response.data.code === 200) {
        yield put({
          type: `${reducerName}/${reducerName}Loaded`,
          payload: response.data.data.list,
        });
      } else {
        yield put({
          type: `${reducerName}/${reducerName}Error`,
          payload: response.data.message,
        });
      }
    } catch (e) {
      // check is user authorized?
      if (e && e.response && e.response.data.code === 401) {
        window.location.assign('/');
        logout();
        return '';
      } else {
        yield put({
          type: `${reducerName}/${reducerName}Failed`,
          payload: e.message,
        });
      }
    }
  };
}
