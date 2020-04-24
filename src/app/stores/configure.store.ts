import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../screens/LoginScreen/login.reducer';
import dashboardReducer from '../screens/DashboardScreen/dashboard.reducer';
import createSagaMiddleware from 'redux-saga';
// static reducer
const staticReducer = combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
});

// State type defination 
export type RootState = ReturnType<typeof staticReducer>;

// Createing a saga middleware
export const sagaMiddleware = createSagaMiddleware();

const makeStore = function() {
  return configureStore({
    reducer: staticReducer,
    middleware: [sagaMiddleware],
  });
};

export default makeStore;
