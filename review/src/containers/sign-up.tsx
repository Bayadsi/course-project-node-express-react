import React from 'react';
import { SignUp as SignUpComponent } from '../components/sign-up/sign-up';
import { User } from '../store/user/types';
import { signUp } from '../store/user/actions';
import { RootState } from '../store';
import { connect, ConnectedProps } from 'react-redux';

const mapDispatch = {
  onSignUp: (values: User) => {
    return signUp(values);
  }
}

const mapState = (state: RootState) => ({
  user: state.users.user,
  signUpError: state.users.signUpError,
});

const connector = connect(mapState, mapDispatch)
type PropsFromRedux = ConnectedProps<typeof connector>

function SignUpContainer(props: PropsFromRedux) {
  return (
    <SignUpComponent
      user={props.user}
      onSignUp={props.onSignUp}
      signUpError={props.signUpError}
    />
  )
}

export const SignUp = connector(SignUpContainer);
