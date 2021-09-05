import * as actionTypes from '../constants/cartConstants';

export const cartReduce = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                };
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product !== action.payload)
            }
        default:
            return state;
    }
}

const initialState = {
    cartItems: [],
    updatingCart: false,
    error: null
}

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART_REQUEST:
            state = {
                ...state,
                updatingCart: true
            }
            break;
        case actionTypes.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updatingCart: false
            }
            break;
        case actionTypes.ADD_TO_CART_FAIL:
            state = {
                ...state,
                updatingCart: false,
                error: action.payload.error
            }
            break;
        case actionTypes.CART_RESET_SUCCESS:
            state = {
                ...initialState
            }
    }
    return state;
}

// export const cartReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_TO_CART_REQUEST:
//             state = {
//                 ...state,
//                 updatingCart: true
//             }
//             break;
//         case actionTypes.ADD_TO_CART_SUCCESS:
//             const item = action.payload;

//             const existItem = state.cartItems.find((x) => x.product === item.product);

//             if (existItem) {
//                 state = {
//                     ...state,
//                     cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
//                     updatingCart: false
//                 };
//                 break;
//             } else {
//                 state = {
//                     ...state,
//                     cartItems: [...state.cartItems, item],
//                     updatingCart: false
//                 };
//                 break;
//             }
//         case actionTypes.ADD_TO_CART_FAIL:
//             state = {
//                 ...state,
//                 updatingCart: false,
//                 error: action.payload.error
//             }
//         case actionTypes.REMOVE_FROM_CART:
//             return {
//                 ...state,
//                 cartItems: state.cartItems.filter((x) => x.product !== action.payload)
//             }
//     }
//     return state;
// }

// export const cartRed = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.ADD_TO_CART_REQUEST:
//             const item = action.payload;

//             const existItem = state.cartItems.find((x) => x.product === item.product);

//             if (existItem) {
//                 state = {
//                     ...state,
//                     cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x),
//                     updatingCart: true
//                 };
//             } else {
//                 state = {
//                     ...state,
//                     cartItems: [...state.cartItems, item],
//                     updatingCart: true
//                 };
//             }
//             break;
//         case actionTypes.ADD_TO_CART_SUCCESS:
//             state = {
//                 ...state,
//                 cartItems: action.payload.cartItems,
//                 updatingCart: false
//             }
//             break;
//         case actionTypes.ADD_TO_CART_FAIL:
//             state = {
//                 ...state,
//                 updatingCart: false,
//                 error: action.payload.error
//             }
//     }
//     return state;
// }