import { connect, ConnectedProps } from 'react-redux';
import { LogIn as LogInComponent, LogInFormValues } from '../components/log-in/log-in';
import { logIn } from '../store/user/actions';
import { RootState } from '../store';

const mapDispatch = {
  onLogIn: (values: LogInFormValues) => {
    return logIn(values);
  }
}

const mapState = (state: RootState) => ({
  user: state.users.user,
  logInError: state.users.logInError
});

const connector = connect(mapState, mapDispatch)
export type LogInReduxProps = ConnectedProps<typeof connector>

export const LogIn = connector(LogInComponent);