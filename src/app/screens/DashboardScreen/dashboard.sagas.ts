import createSaga from '../../helpers/sagas.helper';
import { classReducerName } from './dashboard.reducer';

export const fetchClasses = createSaga(classReducerName);
