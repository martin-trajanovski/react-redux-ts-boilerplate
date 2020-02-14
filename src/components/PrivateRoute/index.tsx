/* eslint-disable react/prop-types */
import React from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';

import { authService } from 'src/services';

export const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  if (!component) {
    throw Error('component is undefined');
  }

  const Component = component; // JSX Elements have to be uppercase.
  const render = (props: RouteComponentProps): React.ReactNode => {
    if (authService.isAuthenticated()) {
      return <Component {...props} />;
    }

    return <Redirect to={{ pathname: '/login' }} />;
  };

  return <Route {...rest} render={render} />;
};
