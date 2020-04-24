import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Loading } from './app/components';
import createStore from './app/stores/configure.store';
import { Provider } from 'react-redux';
import './global.css';
import Layout from './layout';
import {
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  CHAPTER_ROUTE,
  CONCEPT_ROUTE,
  TEST_ROUTE,
} from './app/constants/route.constant';

const store = createStore();

const LoginScreen = React.lazy(() =>
  import('./app/screens/LoginScreen/login.container'),
);

const DashboardScreen = React.lazy(() =>
  import('./app/screens/DashboardScreen/dashboard.container'),
);

const ChapterScreen = React.lazy(() =>
  import('./app/screens/ChapterScreen/chapter.container'),
);

const ConceptScreen = React.lazy(() =>
  import('./app/screens/ConceptScreen/concept.container'),
);

const TestScreen = React.lazy(() =>
  import('./app/screens/TestScreen/test.container'),
);

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Layout>
        <Router>
          <React.Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path={LOGIN_ROUTE.path}>
                <LoginScreen />
              </Route>
              <Route exact path={DASHBOARD_ROUTE.path}>
                {<DashboardScreen />}
              </Route>
              <Route exact path={CHAPTER_ROUTE.path}>
                {<ChapterScreen />}
              </Route>
              <Route exact path={CONCEPT_ROUTE.path}>
                {<ConceptScreen />}
              </Route>
              <Route exact path={TEST_ROUTE.path}>
                {<TestScreen />}
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
