import * as actionTypes from '../constants/adminConstants';

const initState = {
    orders: [],
};

export const orderReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CUSTOMER_ORDERS_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
            };
            break;
    }

    return state;
};