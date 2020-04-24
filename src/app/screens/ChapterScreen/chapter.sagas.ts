import createSaga from '../../helpers/sagas.helper';
import { chapterReducerName, studentReducerName } from './chapter.reducer';

export const fetchChapters = createSaga(chapterReducerName);
export const fetchStudents = createSaga(studentReducerName);
