import axios from "axios";
import {
  ORDER_ALL_FAIL,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
} from "../constants/OrderConstants";

// Admin Order Actions - using admin-only routes
export const adminGetAllOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ALL_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const url = process.env.REACT_APP_API_URL + "/api/admin/orders/";
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(url, config);
    dispatch({ type: ORDER_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_ALL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const adminGetOrderDetailsAction =
  (id) => async (dispatch, getState) => {
    try {
      console.log(`[ADMIN] Fetching order details for ID: ${id}`);
      dispatch({ type: ORDER_DETAILS_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const url =
        (process.env.REACT_APP_API_URL || "http://localhost:8000") +
        `/api/admin/orders/${id}/`;
      console.log(`[ADMIN] Request URL: ${url}`);
      console.log(
        `[ADMIN] User token: ${userInfo?.token ? "Present" : "Missing"}`
      );
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(url, config);
      console.log(`[ADMIN] Order data received:`, data);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      console.error(`[ADMIN] Error fetching order ${id}:`, error);
      console.error(`[ADMIN] Error response:`, error.response?.data);
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminPayOrderAction =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_PAY_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const url =
        process.env.REACT_APP_API_URL + `/api/admin/orders/${orderId}/pay/`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(url, paymentResult, config);
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const adminDeliverOrderAction =
  (id, formData = null) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVER_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const url =
        process.env.REACT_APP_API_URL + `/api/admin/orders/${id}/deliver/`;

      let config;
      let requestData;

      if (formData) {
        config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        requestData = formData;
      } else {
        config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        };
        requestData = {};
      }

      const { data } = await axios.put(url, requestData, config);
      dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
