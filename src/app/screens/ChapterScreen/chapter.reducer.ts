import createApiReducer from '../../stores/api.reducer';
import { combineReducers } from 'redux';
export const chapterReducerName = 'chapters';
export const studentReducerName = 'students';

const chapterSlice = createApiReducer(chapterReducerName, []);
const studentSlice = createApiReducer(studentReducerName, []);
export const chapterActions = chapterSlice.actions;
export const studentActions = studentSlice.actions;

export default combineReducers({
  chapters: chapterSlice.reducer,
  students: studentSlice.reducer,
});
