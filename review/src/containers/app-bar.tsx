import { connect } from 'react-redux';
import { logOut } from '../store/user/actions';
import { CustomAppBar } from '../components/app-bar/app-bar';
import { RootState } from '../store';

const mapDispatch = {
  onLogout: () => {
    localStorage.removeItem('loggedUser');
    return logOut();
  }
}

const mapState = (state: RootState) => ({user: state.users.user});
const connector = connect(mapState, mapDispatch);

export const AppBar = connector(CustomAppBar);
