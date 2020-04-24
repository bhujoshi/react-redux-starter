import LoginScreen from './login.screen';
import AuthHoc from '../../components/hoc/auth.hoc';
import { connect } from 'react-redux';
import { ROUTE_TYPE } from '../../constants/route.constant';
import {
  loginActions,
  organizationActions,
  organizationCenterActions,
} from './login.reducer';
import { RootState } from '../../stores/configure.store';
// TODO - add state type later
const mapState = (state: RootState) => ({
  organizations: state.login.organizations,
  organizationCentres: state.login.organizationCenters,
  selectedOrg: state.login.login.selectedOrg,
  selectedCenter: state.login.login.selectedCenter,
  employId: state.login.login.employId,
  password: state.login.login.password,
  selectedOrgForgetPassword: state.login.login.selectedOrgForgetPassword,
  selectedCenterForgetPassword: state.login.login.selectedCenterForgetPassword,
  employIdForgetPassword: state.login.login.employIdForgetPassword,
  isLoggedIn: state.login.login.isLoggedIn,
});
const mapDispatch = {
  setOrg: loginActions.setOrg,
  setOrgCenter: loginActions.setOrgCenter,
  setEmployId: loginActions.setEmployId,
  setPassword: loginActions.setPassword,
  setOrgForgetPassword: loginActions.setOrgForgetPassword,
  setOrgCenterForgetPassword: loginActions.setOrgCenterForgetPassword,
  setEmployIdForgetPassword: loginActions.setEmployIdForgetPassword,
  resetOrgApi: organizationActions['organizationsInit'],
  resetOrgCenterApi: organizationCenterActions['organizationCentersInit'],
  resetState: loginActions.resetState,
  setIsLoggedIn: loginActions.setIsLoggedIn,
};
const authLayer = AuthHoc({ type: ROUTE_TYPE.public, screen: LoginScreen });
const conector = connect(mapState, mapDispatch);
export default conector(authLayer);
