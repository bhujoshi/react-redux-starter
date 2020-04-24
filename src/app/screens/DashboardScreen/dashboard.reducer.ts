import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';
export const classReducerName = 'classes';
const classSlice = createApiReducer(classReducerName, []);

export const dashboardActions = classSlice.actions;
export default combineReducers({
  classes: classSlice.reducer,
});
