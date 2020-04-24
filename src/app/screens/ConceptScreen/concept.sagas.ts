import createSaga from '../../helpers/sagas.helper';
import { conceptReducerName } from './concept.reducer';

export const fetchConcepts = createSaga(conceptReducerName);
