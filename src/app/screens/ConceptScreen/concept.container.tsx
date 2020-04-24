import { connect } from 'react-redux';

import ConceptScreen from './concept.screen';
import { ROUTE_TYPE } from '../../constants/route.constant';
import AuthHoc from '../../components/hoc/auth.hoc';
import { conceptActions } from './concept.reducer';
// TODO - add state type later
const mapState = (state: any) => {
  return {
    concepts: state.concept.concepts,
  };
};
//@ts-ignore
const mapDispatch = {
  resetConceptsApi: conceptActions['conceptsInit'],
};
const authLayer = AuthHoc({ type: ROUTE_TYPE.private, screen: ConceptScreen });
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
