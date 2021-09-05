import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


// Reducers
import { authReducer, registrationReducer } from './reducers/adminReducer';
import {categoryReducer} from './reducers/category.reducer';
import {productReducer} from './reducers/product.reducer';
import {orderReducer} from './reducers/order.reducer';

const middleware = [thunk];

const reducer = combineReducers({
    auth: authReducer,
    regAuth: registrationReducer,
    categoryState: categoryReducer,
    productState: productReducer,
    // order: orderReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;