import { connect } from 'react-redux';

import TestScreen from './test.screen';
import { TEST_ROUTE } from '../../constants/route.constant';
import AuthHoc from '../../components/hoc/auth.hoc';
import { RootState } from 'app/stores/configure.store';

const mapState = (state: RootState) => ({
  tests: state.test.tests,
});

const mapDispatch = {};
const authLayer = AuthHoc({ type: TEST_ROUTE.type, screen: TestScreen });
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
