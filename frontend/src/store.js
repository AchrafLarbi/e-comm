import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  ProductCreateOrUpdateReducers,
  ProductCreateReviewReducers,
  ProductDeleteReducers,
  ProductDetailsReducers,
  ProductListReducers,
  ProductTopRatedReducers,
} from "./reducers/ProducReducers";
import { CartReducers } from "./reducers/CartReducers";
import {
  UserDeleteReducers,
  UserDetailReducers,
  UserListReducers,
  UserLoginReducers,
  UserRegisterReducers,
  UserUpdateProfileReducers,
  UserUpdateReducers,
} from "./reducers/UserReducers";
import { allOrdersReducers, MyordersReducers, OrderDeliverReducers, OrderDetailsReducers, OrderPayReducers, OrderReducers } from "./reducers/OrderReducers";

// purpose of this file is to create a store and combine all the reducers
// and apply middleware to the store
// we will use this store in our main app component
// we will use this store to get the state and dispatch actions
// now we centralize all the state in one place
const reducer = combineReducers({
  // we will use it using useSelector hook in our components
  // USERS
  userList:UserListReducers,
  userDelete:UserDeleteReducers,
  userUpdate:UserUpdateReducers,
  userLogin: UserLoginReducers,
  userRegister: UserRegisterReducers,
  userDetail: UserDetailReducers,
  UserUpdateProfileReducers: UserUpdateProfileReducers,
   //  PRODUCTS
   productsList: ProductListReducers,
   productDetails: ProductDetailsReducers,
   productDelete:ProductDeleteReducers,
   productCreateOrUpdate:ProductCreateOrUpdateReducers,
   topRatedProducts:ProductTopRatedReducers,
   // CART
   cart: CartReducers,
  // ORDERS
  orderCreate:OrderReducers,
  orderDetails:OrderDetailsReducers,
  orderPay:OrderPayReducers,
  myOrdersReducers:MyordersReducers,
  allOrders:allOrdersReducers,
  orderDeliver:OrderDeliverReducers,
  createReview:ProductCreateReviewReducers,


});

var cartItems = [];
// if we have any initial state we can pass it here// and use try catch block to catch any error that may occur
if (localStorage.getItem("cartItems")) {
  try {
    cartItems = JSON.parse(localStorage.getItem("cartItems"));
  } catch (error) {
    cartItems = [];
  }
}
// load userInfo from local storage
var userInfo = null;
if (localStorage.getItem("userInfo")) {
  try {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  } catch (error) {
    userInfo = {};
  }
}
// load shipping address from local storage
var shippingAddress = {};
if (localStorage.getItem("shippingAddress")) {
  try {
    shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  } catch (error) {
    shippingAddress = {};
  }
}
// load payment method from local storage
var paymentMethod = "";
if (localStorage.getItem("paymentMethod")) {
  try {
    paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
  } catch (error) {
    paymentMethod = "";
  }
}


//   this ensure that the cart items are stored in the local storage in retrieved when the app is loaded
const initialState = {
  cart: { cartItems: cartItems, shippingAddress: shippingAddress, paymentMethod: paymentMethod },
  userLogin: { userInfo: userInfo },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
