import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstants";
import axios from "axios";

// action for adding item to the cart
export const addToCartAction = (id, quantity) => async (dispatch, getState) => {
  const url =process.env.REACT_APP_API_URL + `/api/products/${id}/`;
  const { data } = await axios.get(url);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      quantity,
    },
  });
  // save the cart items in the local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeItemCartAction = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  // save the cart items in the local storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const saveShippingAddresAction = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethodAction = (payment) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: payment });
  localStorage.setItem("paymentMethod", JSON.stringify(payment));
};
