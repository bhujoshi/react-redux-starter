import {
  ROUTE_TYPE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
} from '../../constants/route.constant';
import { isLogin } from '../../helpers/local.storage.helper';

interface AuthHocInterface {
  type: ROUTE_TYPE;
  screen: (props: any) => JSX.Element;
}

const AuthHoc = function(props: AuthHocInterface) {
  const { type, screen } = props;
  switch (type) {
    case ROUTE_TYPE.public:
      if (isLogin()) {
        //@ts-ignore
        window.location = DASHBOARD_ROUTE.path;
      }
      break;
    case ROUTE_TYPE.private:
      if (!isLogin()) {
        //@ts-ignore
        window.location = LOGIN_ROUTE.path;
      }
      break;
  }
  return screen;
};

export default AuthHoc;
