import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';

export const testReducerName = 'tests';
const testSlice = createApiReducer(testReducerName, []);

const { reducer, actions } = testSlice;
export const testActions = { ...actions };
export default combineReducers({
  tests: reducer,
});
