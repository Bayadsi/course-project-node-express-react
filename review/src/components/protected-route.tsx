import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../store';
import { AppBar } from '../containers/app-bar';
const ProtectedRouteComponent = ({ component: Component, ...rest }: any) => {
  return (
    <Route {...rest} render={props => (
      rest.user ? (
        <>
          <AppBar path={rest.path} />
          <Component {...props} />
        </>
      ) : (
          <Redirect to='/log-in' />
        )
    )} />
  );
}

export const ProtectedRoute = connect(
  (state: RootState) => ({
    user: state.users.user,
  })
)(ProtectedRouteComponent);
