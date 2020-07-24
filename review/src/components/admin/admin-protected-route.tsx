import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../../store';
import { AppBar } from '../../containers/app-bar';

const AdminProtectedRouteComponent = ({ component: Component, ...rest }: any) => (
  <Route {...rest} render={props => (
    rest.user && rest.user.role === 'admin' ? (
      <>
        <AppBar path={rest.path} />
        <Component {...props} />
      </>
    ) : (
        <Redirect to='/log-in' />
      )
  )} />
);

export const AdminProtectedRoute = connect(
  (state: RootState) => ({
    user: state.users.user,
  })
)(AdminProtectedRouteComponent);
