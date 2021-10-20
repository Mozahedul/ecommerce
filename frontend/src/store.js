import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productListReducers,
  productDetailsReducers,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {
  updateUserProfileReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from './reducers/userReducers';
import { orderCreateReducer } from './reducers/orderReducers';

const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateUserProfile: updateUserProfileReducer,
  orderCreate: orderCreateReducer,
});

const middleware = [thunk];

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
