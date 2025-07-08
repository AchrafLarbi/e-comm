import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
} from "../constants/UserConstants";
// this is the reducer that will update the state
export const UserLoginReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.playload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.playload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const UserRegisterReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.playload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.playload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const UserDetailReducers = (state = { userDetail: [] }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userDetail: action.playload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.playload };
    case USER_UPDATE_PROFILE_RESET:
      return { userDetail: [] };
    default:
      return state;
  }
};

export const UserUpdateProfileReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.playload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.playload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
// user list reducer
export const UserListReducers = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.playload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.playload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

// delete user reducer
export const UserDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.playload };
    default:
      return state;
  }
};

// update user reducer
export const UserUpdateReducers = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.playload };
    case USER_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};