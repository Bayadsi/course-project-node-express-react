import React from 'react';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';
import { Home as HomeComponent } from '../components/home/home';

const mapState = (state: RootState) => ({
  user: state.users.user,
});

const connector = connect(mapState, {});
type PropsFromRedux = ConnectedProps<typeof connector>

function HomeContainer(props: PropsFromRedux) {;

  return (
    <HomeComponent
      user={props.user}
    />
  )
};

export const Home = connector(HomeContainer);

