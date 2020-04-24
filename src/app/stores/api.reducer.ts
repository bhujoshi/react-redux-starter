import { createSlice } from '@reduxjs/toolkit';

export enum API_STATE {
  INIT,
  LOADING,
  LOADED,
  ERROR,
  FAILED,
}

interface ApiInterface {
  apiState: API_STATE;
  data: any;
  error: string;
}

export default function createApiReducer(reducerName: string, initData: any) {
  // Defining initial state
  const initialState = {
    apiState: API_STATE.INIT,
    data: initData,
    error: '',
  };

  return createSlice({
    name: reducerName,
    initialState,
    reducers: {
      [`${reducerName}Init`]: () => initialState,
      [`${reducerName}Loading`]: (state: ApiInterface) => ({
        ...state,
        apiState: API_STATE.LOADING,
      }),
      [`${reducerName}Loaded`]: (state: ApiInterface, action) => ({
        error: '',
        apiState: API_STATE.LOADED,
        data: action.payload,
      }),
      [`${reducerName}Error`]: (state: ApiInterface, action) => ({
        ...state,
        apiState: API_STATE.ERROR,
        error: action.payload,
      }),
      [`${reducerName}Failed`]: (state: ApiInterface, action) => ({
        ...state,
        apiState: API_STATE.FAILED,
        error: action.payload,
      }),
    },
  });
}
