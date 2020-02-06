import React, { Suspense, lazy } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from 'src/helpers/history';

import { PrivateRoute } from '../PrivateRoute';
import Spinner from '../Spinner';

const Home = lazy(() => import('../Home'));
const Login = lazy(() => import('../Login'));
const Register = lazy(() => import('../Register'));

const App: React.FC = () => {
  return (
    <div data-testid="App" className="App">
      <div className="container">
        <Router history={history}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </Suspense>
        </Router>
      </div>
    </div>
  );
};

export default App;
