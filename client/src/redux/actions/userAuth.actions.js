import * as actionTypes from '../constants/userConstants';
import * as cartActionTypes from '../constants/cartConstants';
import axiosInstance from '../../helpers/axios';
// import axios from 'axios';


export const register = (user) => {
    return async (dispatch) => {

        dispatch({
            type: actionTypes.USER_REGISTRATION_REQUEST,
            payload: {
                ...user
            }
        });

        await axiosInstance.post(`/users/register`, { ...user }, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                if (res.data.message) {
                    const { message } = res.data;
                    // console.log(message);
                    dispatch({
                        type: actionTypes.USER_REGISTRATION_SUCCESS,
                        payload: {
                            message
                        }
                    })
                } else {
                    // console.log("number 1");
                    dispatch({
                        type: actionTypes.USER_REGISTRATION_FAIL,
                        payload: {
                            error: res.data
                        }
                    })
                }
            })
            .catch(err => {
                // console.log("number 2");
                // if (err) {
                //     console.log(err.response);
                // }
                dispatch({
                    type: actionTypes.USER_REGISTRATION_FAIL,
                    payload: {
                        error: err.response.data.error
                    }
                })
            })
    }
}


export const login = (user) => {
    return async (dispatch) => {

        dispatch({
            type: actionTypes.USER_LOGIN_REQUEST,
            payload: {
                ...user
            }
        });

        await axiosInstance.post(`/users/login`, { ...user }, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                if (res.data.message) {
                    const { user } = res.data;
                    // localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({
                        type: actionTypes.USER_LOGIN_SUCCESS,
                        payload: {
                            user
                        }
                    })
                } else {
                    // console.log('inside the else');
                    // console.log(res.data);
                    dispatch({
                        type: actionTypes.USER_LOGIN_FAIL,
                        payload: res.data
                    })
                }
            })
            .catch(err => {
                // console.log('.catch');
                // console.log(err.response.data);
                dispatch({
                    type: actionTypes.USER_LOGIN_FAIL,
                    payload: err.response.data
                })
            })
    }
}

export const isUserLoggedIn = () => {
    return async (dispatch) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({
                type: actionTypes.USER_LOGIN_SUCCESS,
                payload: {
                    user
                }
            })
        }

        // const token = localStorage.getItem('token');
        // if (token) {
        //     const user = JSON.parse(localStorage.getItem('user'));
        //     dispatch({
        //         type: actionTypes.USER_LOGIN_SUCCESS,
        //         payload: {
        //             token, user
        //         }
        //     })
        // }
        // else {
        //     dispatch({
        //         type: actionTypes.ADMIN_LOGIN_FAIL,
        //         payload: {
        //             error: 'Failed to login.' 
        //         }
        //     })
        // }
    }
}

export const logout = () => {
    return async (dispatch) => {

        dispatch({
            type: actionTypes.USER_LOGOUT_REQUEST
        });

        // const token = localStorage.getItem('token');

        await axiosInstance.get(`/users/logout`, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    // console.log("success");
                    localStorage.clear();
                    dispatch({
                        type: actionTypes.USER_LOGOUT_SUCCESS
                    });
                    dispatch({
                        type: cartActionTypes.CART_RESET_SUCCESS
                    });
                    dispatch({
                        type: actionTypes.RESET_ADDRESS_REQUEST
                    })
                    dispatch({
                        type: actionTypes.RESET_ADDRESS_SUCCESS
                    })
                } else {
                    console.log('logout fail in else');
                    dispatch({
                        type: actionTypes.USER_LOGOUT_FAIL,
                        payload: res.data.error
                    });
                }
            })
            .catch(err => {
                // console.log(err.response.data);
                // console.log('logout fail in catch');
                localStorage.clear();
                dispatch({
                    type: actionTypes.USER_LOGOUT_FAIL,
                    payload: err.response.data
                })
            })
    }
}

export const getAddress = () => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.get(`/address/get`, { withCredentials: true });
            dispatch({ type: actionTypes.GET_USER_ADDRESS_REQUEST });
            if (res.status === 200) {
                const {
                    userAddress: { address },
                } = res.data;
                dispatch({
                    type: actionTypes.GET_USER_ADDRESS_SUCCESS,
                    payload: { address },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: actionTypes.GET_USER_ADDRESS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addAddress = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.ADD_USER_ADDRESS_REQUEST });
            const res = await axiosInstance.post(`/address/create`, { payload }, { withCredentials: true });
            if (res.status === 201) {
                // console.log(res);
                const {
                    address: { address },
                } = res.data;
                dispatch({
                    type: actionTypes.ADD_USER_ADDRESS_SUCCESS,
                    payload: { address },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: actionTypes.ADD_USER_ADDRESS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            // console.log('1', error.response);
            // console.log('2', error.response.data.error.errors);
            // console.log('3', Object.entries(error.response.data.error.errors));
            // console.log(error.response.data.error.errors.address.errors);

            if (error.response.data.error.errors.address) {
                const fieldErrors = error.response.data.error.errors.address.errors;
                dispatch({
                    type: actionTypes.ADD_USER_ADDRESS_FAILURE,
                    payload: { fieldErrors },
                });
                // console.log('fieldErrors in if', fieldErrors);
            } else {
                var fieldErrors = {};
                const errorArray = Object.entries(error.response.data.error.errors);

                for (const array of errorArray) {

                    const keyName = array[0].substring('address.0.'.length)
                    array.splice(0, 1, keyName);

                    const errorVal = array[1];

                    if (keyName === 'name') {
                        fieldErrors.name = errorVal;
                    } else if (keyName === 'mobileNumber') {
                        fieldErrors.mobileNumber = errorVal;
                    } else if (keyName === 'zipCode') {
                        fieldErrors.zipCode = errorVal;
                    } else if (keyName === 'streetOne') {
                        fieldErrors.streetOne = errorVal;
                    } else if (keyName === 'city') {
                        fieldErrors.city = errorVal;
                    } else if (keyName === 'state') {
                        fieldErrors.state = errorVal;
                    } else if (keyName === 'addressType') {
                        fieldErrors.addressType = errorVal;
                    }
                }
                // console.log('fieldErrors in else', fieldErrors);

                dispatch({
                    type: actionTypes.ADD_USER_ADDRESS_FAILURE,
                    payload: { fieldErrors },
                });
            }
        }
    };
};

export const addOrder = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.post(`/orders/add`, payload, { withCredentials: true });
            // console.log('res in addOrder from actions', res);
            dispatch({ type: actionTypes.ADD_USER_ORDER_REQUEST });
            if (res.status === 201) {
                const data = res.data;
                // console.log('data', data);
                dispatch({
                    type: cartActionTypes.CART_RESET_SUCCESS,
                });
                dispatch({
                    type: actionTypes.ADD_USER_ORDER_SUCCESS,
                    payload: data
                });

            } else {
                const { error } = res.data;
                dispatch({
                    type: actionTypes.ADD_USER_ORDER_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error.response);
        }
    };
}

export const getOrders = () => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.get(`/orders/getOrders`, { withCredentials: true });
            dispatch({ type: actionTypes.GET_USER_ORDER_REQUEST });
            if (res.status === 200) {
                // console.log(res.data);
                const { orders } = res.data;
                // console.log('orders in getOrders', orders);
                dispatch({
                    type: actionTypes.GET_USER_ORDER_SUCCESS,
                    payload: { orders },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: actionTypes.GET_USER_ORDER_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const getOrder = () => {
    return async (dispatch) => {
        try {
            const res = await axiosInstance.get(`/orders/getOrder`, { withCredentials: true });
            dispatch({ type: actionTypes.GET_USER_ORDER_DETAILS_REQUEST });
            if (res.status === 200) {
                console.log(res);
                const { order } = res.data;
                dispatch({
                    type: actionTypes.GET_USER_ORDER_DETAILS_SUCCESS,
                    payload: { order },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: actionTypes.GET_USER_ORDER_DETAILS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};
// export const getOrder = (payload) => {
//     return async (dispatch) => {
//         try {
//             const res = await axios.get(`/api/orders/getOrder`, payload);
//             dispatch({ type: actionTypes.GET_USER_ORDER_DETAILS_REQUEST });
//             if (res.status === 200) {
//                 console.log(res);
//                 const { order } = res.data;
//                 dispatch({
//                     type: actionTypes.GET_USER_ORDER_DETAILS_SUCCESS,
//                     payload: { order },
//                 });
//             } else {
//                 const { error } = res.data;
//                 dispatch({
//                     type: actionTypes.GET_USER_ORDER_DETAILS_FAILURE,
//                     payload: { error },
//                 });
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };
// };
