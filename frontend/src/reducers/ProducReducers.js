import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_OR_UPDATE_REQUEST,
  PRODUCT_CREATE_OR_UPDATE_SUCCESS,
  PRODUCT_CREATE_OR_UPDATE_FAIL,
  PRODUCT_CREATE_OR_UPDATE_RESET,
  PRODUCT_DETAILS_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_RESET
} from "../constants/productConstants";

// this is the reducer that will update the state
export const ProductListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      // ply load will cintain products list,number pages and current page
      return { loading: false, products: action.playload.products, pages: action.playload.pages, page: action.playload.page };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.playload };

    default:
      return state;
  }
};

export const ProductDetailsReducers = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.playload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.playload };
    case PRODUCT_DETAILS_RESET:
      return { product: { reviews: [] } };

    default:
      return state;
  }
};

// delete product reducer
export const ProductDeleteReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.playload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// create or update product reducer
export const ProductCreateOrUpdateReducers = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_OR_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_OR_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.playload };
    case PRODUCT_CREATE_OR_UPDATE_FAIL:
      return { loading: false, error: action.playload };
    case PRODUCT_CREATE_OR_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

// create review reducer
export const ProductCreateReviewReducers = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.playload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// top products reducer
export const ProductTopRatedReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.playload };
    case PRODUCT_TOP_FAIL:
      return { loading: false, error: action.playload };
    case PRODUCT_TOP_RESET:
      default:
      return state;
  }
};