import * as actionTypes from '../constants/adminConstants';

const initialState = {
    products: [],
    loading: false,
    errors: null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case actionTypes.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
    }
    return state;
}