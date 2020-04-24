import createSaga from '../../helpers/sagas.helper';
import {
  organizationReducerName,
  organizationCentersName,
} from './login.reducer';

export const fetchOrg = createSaga(organizationReducerName);
export const fetchOrgCenters = createSaga(organizationCentersName);
