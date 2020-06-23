import {createStore,combineReducers, applyMiddleware,compose} from 'redux';
import {productListReducer,productDetailsReducer, createProductReducer, deleteProductReducer} from './reducers/product-reducer';
import {cartReducer} from './reducers/cart-reducer';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { signInReducer,signUpReducer } from './reducers/user-reducer';

// get access to cookie
const cartItems=Cookie.getJSON("cartItems") || [];

const userInfo=Cookie.getJSON('userInfo') || null;

const initialState={ cart : {cartItems}, signIn : { userInfo }};

const reducer=combineReducers({
      productsList:productListReducer,
      productDetails:productDetailsReducer,
      createProduct:createProductReducer,
      deleteProduct:deleteProductReducer,
      cart:cartReducer,
      signIn:signInReducer,
      signUp:signUpReducer
})

// it uses to trace redux on the browser
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// thunk middleware in redux makes us able to apply async operations in action 
const store=createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)))

export {store}