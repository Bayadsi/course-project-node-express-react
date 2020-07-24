export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  gender: 'Female' | 'Male';
  role: 'User' | 'Admin';
  registerTimestamp: Date;
  lastModifiedTimestamp: Date;
  picture?: string;
}

export interface UserState {
  user: User | undefined;
  logInError: string;
  signUpError: string;
  allUsers: User[];
  currentUser: User | undefined;
}

export const LOG_IN = 'LOG_IN';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';

interface GetUserAction {
  type: typeof GET_USER;
  payload: User;
}

interface LogInAction {
  type: typeof LOG_IN;
  payload: User;
}

interface LogInFailureAction {
  type: typeof LOG_IN_FAILURE;
  payload: string;
}

interface LogOUTAction {
  type: typeof LOG_OUT;
  payload: {};
}

interface SignUpAction {
  type: typeof SIGN_UP;
  payload: User;
}

interface SignUpFailureAction {
  type: typeof SIGN_UP_FAILURE;
  payload: string;
}

interface GetUsersAction {
  type: typeof GET_USERS;
  payload: User[];
}

interface UpdateUserAction {
  type: typeof UPDATE_USER;
  payload: User;
}

interface DeleteUserAction {
  type: typeof DELETE_USER;
  payload: string;
}

export type UserActionTypes =
  LogInAction
  | LogInFailureAction
  | LogOUTAction
  | SignUpAction
  | SignUpFailureAction
  | GetUsersAction
  | GetUserAction
  | UpdateUserAction
  | DeleteUserAction;
