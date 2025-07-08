import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/CartConstants";

export const CartReducers = (state = { cartItems: [] }, action) => {
  // this reducer will update the state of the cart
  switch (action.type) {
    case CART_ADD_ITEM:
      // playload is product
      const item = action.playload;
      // check if the item is already in the cart
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        // this will update the item in the cart
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        // this will add the item to the cart
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.playload),
      };
    // note that the playload is the product id
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,shippingAddress:action.playload
      };

    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,paymentMethod:action.playload
      };

      case CART_CLEAR_ITEMS:
        return {
          ...state, cartItems: []
        };
    default:
      return state;
  }
};
