import createSaga from '../../helpers/sagas.helper';
import { testReducerName } from './test.reducer';

export const fetchTests = createSaga(testReducerName);
