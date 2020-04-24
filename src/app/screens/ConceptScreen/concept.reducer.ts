import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';
export const conceptReducerName = 'concepts';

const conceptSlice = createApiReducer(conceptReducerName, []);
export const conceptActions = conceptSlice.actions;

export default combineReducers({
  concepts: conceptSlice.reducer,
});
