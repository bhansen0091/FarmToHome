import * as actionTypes from '../constants/userConstants';


const initialState = {
    token: null,
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
                token: action.payload.token,
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