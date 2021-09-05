import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// Reducers
import { cartReducer } from './reducers/cartReducer';
import { categoryReducer } from './reducers/category.reducer'
import { authReducer, registrationReducer } from './reducers/user.reducer';
import { getProductDetailsReducer, getProductsReducer, filteredProductsReducer } from './reducers/productReducers';

const reducer = combineReducers({
    auth: authReducer,
    regAuth: registrationReducer,
    cart: cartReducer,
    categories: categoryReducer,
    filteredProducts: filteredProductsReducer,
    getAllProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer
})

const middleware = [thunk];

const cartFromLocalStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

const INITIAL_STATE = {
    cart: {
        cartItems: cartFromLocalStorage
    }
}

const store = createStore(
    reducer,
    INITIAL_STATE,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
