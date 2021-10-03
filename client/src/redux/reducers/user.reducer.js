import * as actionTypes from '../constants/userConstants';


const initialState = {
    // token: null,
    user: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case actionTypes.USER_LOGIN_SUCCESS:
            state = {
                // ...state,
                // token: action.payload.token,
                user: action.payload.user,
                authenticate: true,
                authenticating: false
            }
            break;
        case actionTypes.USER_LOGIN_FAIL:
            state = {
                authenticate: false,
                authenticating: false,
                error: action.payload,
            }
            break;
        case actionTypes.USER_LOGOUT_REQUEST:
            state = {
                state: {
                    ...initialState,
                    loading: true
                }
            }
            break;
        case actionTypes.USER_LOGOUT_SUCCESS:
            state = {
                ...initialState,
                loading: false,
                authenticate: false,
                authenticating: false
            }
            break;
        case actionTypes.USER_LOGOUT_FAIL:
            state = {
                authenticate: false,
                authenticating: false,
                loading: false,
                error: action.payload,
            }
            break;
    }
    return state;
}

const regInitialState = {
    error: null,
    message: '',
    loading: false
}

export const registrationReducer = (state = regInitialState, action) => {
    switch (action.type) {
        case actionTypes.USER_REGISTRATION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case actionTypes.USER_REGISTRATION_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload
            }
            break;
        case actionTypes.USER_REGISTRATION_FAIL:
            // console.log(action.payload);
            state = {
                loading: false,
                error: action.payload,
            }
            break;
    }
    return state;
}

const userDetailsInitialState = {
    address: [],
    orders: [],
    orderDetails: {},
    error: null,
    loading: false,
    orderFetching: false,
    placedOrderId: null,
};

export const userDetailsReducer = (state = userDetailsInitialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case actionTypes.GET_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                loading: false,
            };
            break;
        case actionTypes.GET_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case actionTypes.RESET_ADDRESS_REQUEST:
            state = {
                ...userDetailsInitialState,
                loading: true,
            };
            break;
        case actionTypes.RESET_ADDRESS_SUCCESS:
            state = {
                ...userDetailsInitialState
            };
            break;
        case actionTypes.RESET_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error,
            };
            break;
        case actionTypes.ADD_USER_ADDRESS_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;
        case actionTypes.ADD_USER_ADDRESS_SUCCESS:
            state = {
                ...state,
                address: action.payload.address,
                error: '',
                loading: false,
            };
            break;
        case actionTypes.ADD_USER_ADDRESS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.fieldErrors,
            };
            break;
        case actionTypes.ADD_USER_ORDER_SUCCESS:
            state = {
                ...state,
                placedOrderId: action.payload._id,
            };
            break;
        case actionTypes.GET_USER_ORDER_REQUEST:
            state = {
                ...state,
                orderFetching: true,
            };
            break;
        case actionTypes.GET_USER_ORDER_SUCCESS:
            state = {
                ...state,
                orders: action.payload.orders,
                orderFetching: false,
            };
            break;
        case actionTypes.GET_USER_ORDER_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                orderFetching: false,
            };
            break;
        case actionTypes.GET_USER_ORDER_DETAILS_REQUEST:
            break;
        case actionTypes.GET_USER_ORDER_DETAILS_SUCCESS:
            state = {
                ...state,
                orderDetails: action.payload.order,
            };
            break;
        case actionTypes.GET_USER_ORDER_DETAILS_FAILURE:
            break;
    }

    return state;
};