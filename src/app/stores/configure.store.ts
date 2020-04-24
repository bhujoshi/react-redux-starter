import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../screens/LoginScreen/login.reducer';
import dashboardReducer from '../screens/DashboardScreen/dashboard.reducer';
import chapterReducer from '../screens/ChapterScreen/chapter.reducer';
import conceptReducer from '../screens/ConceptScreen/concept.reducer';
import testReducer from '../screens/TestScreen/test.reducer';
import createSagaMiddleware from 'redux-saga';
// static reducer
const staticReducer = combineReducers({
  login: loginReducer,
  dashboard: dashboardReducer,
  chapter: chapterReducer,
  concept: conceptReducer,
  test: testReducer,
});

// type of state
export type RootState = ReturnType<typeof staticReducer>;

// create the saga middleware
export const sagaMiddleware = createSagaMiddleware();

const createStore = function() {
  return configureStore({
    reducer: staticReducer,
    middleware: [sagaMiddleware],
  });
};

export default createStore;
