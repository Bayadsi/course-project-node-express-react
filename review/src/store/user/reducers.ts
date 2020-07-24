import {
  UserState,
  UserActionTypes,
  SIGN_UP,
  LOG_OUT,
  LOG_IN,
  GET_USERS,
  User,
  UPDATE_USER,
  DELETE_USER,
  SIGN_UP_FAILURE,
  LOG_IN_FAILURE,
  GET_USER,
} from "./types";

const loggedUser = localStorage.getItem('loggedUser');
let initialStateUser = undefined;

if (loggedUser) {
  initialStateUser = JSON.parse(loggedUser) as User;
}

const initialState: UserState  = {
  user: initialStateUser,
  logInError: '',
  signUpError: '',
  allUsers: [],
  currentUser: undefined,
}

export function userReducer(state = initialState, action: UserActionTypes): UserState {
  switch (action.type) {
    case LOG_IN: {
      return {
        ...state,
        user: action.payload,
        logInError: '',
      }
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        logInError: action.payload,
      }
    }
    case SIGN_UP: {
      return {
        ...state,
        user: action.payload,
        allUsers: [...state.allUsers, action.payload],
        signUpError: '',
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        signUpError: action.payload,
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        user: undefined,
      };
    }
    case GET_USERS: {
      return {
        ...state,
        allUsers: action.payload,
      }
    }
    case GET_USER: {
      return {
        ...state,
        currentUser: action.payload,
      }
    }
    case UPDATE_USER: {
      return {
        ...state,
        allUsers: [
          ...state.allUsers.filter((user: User) => user.username !== action.payload.username),
          action.payload,
        ]
      }
    }
    case DELETE_USER: {
      return {
        ...state,
        allUsers: [
          ...state.allUsers.filter(u => u._id !== action.payload)
        ],
      }
    }
    default: {
      return state;
    }
  }
}