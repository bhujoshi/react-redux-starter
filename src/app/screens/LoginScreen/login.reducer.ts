import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';
export const organizationReducerName = 'organizations';
export const organizationCentersName = 'organizationCenters';

const initStateLogin = {
  selectedOrg: { value: '', label: '' },
  selectedCenter: { value: '', label: '' },
  employId: '',
  password: '',
  selectedOrgForgetPassword: { value: '', label: '' },
  selectedCenterForgetPassword: { value: '', label: '' },
  employIdForgetPassword: '',
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState: initStateLogin,
  reducers: {
    setOrg: (state, action) => ({ ...state, selectedOrg: action.payload }),
    setOrgCenter: (state, action) => ({
      ...state,
      selectedCenter: action.payload,
    }),
    setEmployId: (state, action) => ({ ...state, employId: action.payload }),
    setPassword: (state, action) => ({ ...state, password: action.payload }),
    setOrgForgetPassword: (state, action) => ({
      ...state,
      selectedOrgForgetPassword: action.payload,
    }),
    setOrgCenterForgetPassword: (state, action) => ({
      ...state,
      selectedCenterForgetPassword: action.payload,
    }),
    setEmployIdForgetPassword: (state, action) => ({
      ...state,
      employIdForgetPassword: action.payload,
    }),
    resetState: () => initStateLogin,
    setIsLoggedIn: (state, action) => ({
      ...state,
      isLoggedIn: action.payload,
    }),
  },
});

// generic reducer for api calls
const organizationSlice = createApiReducer(organizationReducerName, []);
const organizationCentersSlice = createApiReducer(organizationCentersName, []);

export const loginActions = loginSlice.actions;
export const organizationActions = organizationSlice.actions;
export const organizationCenterActions = organizationCentersSlice.actions;
const loginReducer = combineReducers({
  login: loginSlice.reducer,
  organizations: organizationSlice.reducer,
  organizationCenters: organizationCentersSlice.reducer,
});
export const LoginReducer = typeof loginReducer;
export default loginReducer;
