import React from 'react';
import Layout from './layout';
import createStore from './app/stores/configure.store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
} from './app/constants/route.constant';

const store = createStore();

const LoginScreen = React.lazy(() =>
  import('./app/screens/LoginScreen/login.container'),
);

const DashboardScreen = React.lazy(() =>
  import('./app/screens/DashboardScreen/dashboard.container'),
);

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Layout>
        <Router>
          <React.Suspense fallback={'Loading...'}>
            <Switch>
              <Route exact path={LOGIN_ROUTE.path}>
                <LoginScreen />
              </Route>
              <Route exact path={DASHBOARD_ROUTE.path}>
                {<DashboardScreen />}
              </Route>
              <Route path={'*'} render={() => <h1> Not found. </h1>}></Route>
            </Switch>
          </React.Suspense>
        </Router>
      </Layout>
    </div>
  </Provider>
);

export default App;
