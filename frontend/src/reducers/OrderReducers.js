import {
  ORDER_ALL_FAIL,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_MYORDERS_FAIL,
  ORDER_MYORDERS_REQUEST,
  ORDER_MYORDERS_RESET,
  ORDER_MYORDERS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
} from "../constants/OrderConstants";

export const OrderReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.playload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.playload,
      };
    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// order details reducer
export const OrderDetailsReducers = (
  state = { order: {}, loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.playload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.playload,
      };
    default:
      return state;
  }
};

// pay order reducer
export const OrderPayReducers = (state = {  }, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.playload,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.playload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

// order list reducer
export const MyordersReducers = (state = {  }, action) => {
  switch (action.type) {
    case ORDER_MYORDERS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_MYORDERS_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: action.playload,
      };
    case ORDER_MYORDERS_FAIL:
      return {
        loading: false,
        error: action.playload,
      };
      case ORDER_MYORDERS_RESET:
      return {
        ...state,
      };
    default:
      return state;
  }
}

// all orders reducer
export const allOrdersReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_REQUEST:
      return {
        loading: true,
      };
    case ORDER_ALL_SUCCESS:
      return {
        loading: false,
        orders: action.playload,
      };
    case ORDER_ALL_FAIL:
      return {
        loading: false,
        error: action.playload,
      };
    default:
      return state;
  }
};

// order deliver reducer
export const OrderDeliverReducers = (state = {  }, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.playload,
      };
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.playload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};