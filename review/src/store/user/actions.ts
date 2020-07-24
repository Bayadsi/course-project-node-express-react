import { UserActionTypes, GET_USER, LOG_IN, LOG_IN_FAILURE, LOG_OUT, SIGN_UP, SIGN_UP_FAILURE, User, GET_USERS, UPDATE_USER, DELETE_USER } from "./types";
import UserAPI from "../../api-calls/users";

export function logIn(credentials: {username: string, password: string}) {
  return async function (dispatch: any) {
    const response = await UserAPI.login(credentials);
    if (response.success) {
      localStorage.setItem('loggedUser', JSON.stringify(response.user));
      dispatch({
        type: LOG_IN,
        payload: response.user,
      });
    } else {
      dispatch({
        type: LOG_IN_FAILURE,
        payload: response.message,
      });
    }
  }
}

export function getUser(id: string) {
  return async function (dispatch: any) {
    const user = await UserAPI.getUser(id);
    dispatch({
      type: GET_USER,
      payload: user,
    });
    return user;
  }
}

export function logOut(): UserActionTypes {
  return {
    type: LOG_OUT,
    payload: {},
  }
}

export function signUp(values: User) {
  return async function(dispatch: any) {
    try {
      const user: User = await UserAPI.createUser(values);
      if (user._id) {
        localStorage.setItem('loggedUser', JSON.stringify(user));
        dispatch({
          type: SIGN_UP,
          payload: user,
        });
      } else {
        dispatch({
          type: SIGN_UP_FAILURE,
          payload: 'Username is already taken'
        });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

export function getAllUsers() {
  return async function(dispatch: any) {
    const users = await UserAPI.getAllUsers() as User[];
    dispatch({
      type: GET_USERS,
      payload: users,
    });
    return users;
  };
}

export function updateUser(user: User) {
  return async function (dispatch: any) {
    const updatedUser = await UserAPI.updateUser(user);
    dispatch({
      type: UPDATE_USER,
      payload: updatedUser,
    });
  }
}

export function deleteUser(id: string) {
  return async function (dispatch: any) {
    await UserAPI.deleteUser(id);
    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  }
}