import { ORDER_MYORDERS_RESET } from "../constants/OrderConstants";
import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
} from "../constants/UserConstants";
import axios from "axios";
// here we make a request to the backend to make a login
// if the request is successful we dispatch the action to the reducer
// thats mean we send the action to the reducer to update the state
export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    //   send action to producer in cases success
    dispatch({ type: USER_LOGIN_REQUEST });
    const url = process.env.REACT_APP_API_URL + "/api/users/login/";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      url,
      {
        username: email,
        password: password,
      },
      config
    );
    dispatch({ type: USER_LOGIN_SUCCESS, playload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      playload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const userRegisterAction =
  (name, username, email, password) => async (dispatch) => {
    try {
      //   send action to producer in cases success
      dispatch({ type: USER_REGISTER_REQUEST });
      const url = process.env.REACT_APP_API_URL + "/api/users/register/";
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        url,
        {
          name: name,
          username: username,
          email: email,
          password: password,
        },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, playload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, playload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        playload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_UPDATE_PROFILE_RESET });
  dispatch({ type: USER_LIST_RESET });
  dispatch({ type: ORDER_MYORDERS_RESET });
};

export const getUserDetailAction = (id, url= `/api/users/${id}/`

) => async (dispatch, getState) => {
  try {
    url = process.env.REACT_APP_API_URL + url;
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(url, config);
    dispatch({ type: USER_DETAILS_SUCCESS, playload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      playload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
export const userUpadateProfileAction =
  (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const url = process.env.REACT_APP_API_URL + "/api/users/profile/update/";
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(url, user, config);
      dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, playload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, playload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        playload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
// user list action
export const userListAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const url = process.env.REACT_APP_API_URL + "/api/users/";
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(url, config);
    dispatch({ type: USER_LIST_SUCCESS, playload: data });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      playload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
// delete user action
export const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState(); // get the user info from the state
    const url = process.env.REACT_APP_API_URL + `/api/users/delete/${id}/`; // the url to make the request
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(url, config);
    dispatch({ type: USER_DETAILS_SUCCESS });
    dispatch(userListAction());
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      playload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// update user action
export const updateUserAction = (id,user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const url = process.env.REACT_APP_API_URL + `/api/users/update/${id}/`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(url, user, config);
    dispatch({ type: USER_UPDATE_SUCCESS, playload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      playload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};