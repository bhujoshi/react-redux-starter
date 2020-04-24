import { connect } from 'react-redux';

import DashboardScreen from './dashboard.screen';
import { ROUTE_TYPE } from '../../constants/route.constant';
import AuthHoc from '../../components/hoc/auth.hoc';
import { dashboardActions } from './dashboard.reducer';
// TODO - add state type later
const mapState = (state: any) => {
  return {
    classes: state.dashboard.classes,
  };
};
//@ts-ignore
const mapDispatch = {
  resetClassesApi: dashboardActions['classesInit'],
};
const authLayer = AuthHoc({
  type: ROUTE_TYPE.private,
  screen: DashboardScreen,
});
const conector = connect(mapState, mapDispatch);

export default conector(authLayer);
