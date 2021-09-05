import * as actionTypes from '../constants/userConstants';
import axios from 'axios';


export const register = (user) => {
    return async (dispatch) => {

        dispatch({
            type: actionTypes.USER_REGISTRATION_REQUEST,
            payload: {
                ...user
            }
        });

        await axios.post(`http://localhost:8000/api/users/register`, { ...user }, { withCredentials: true })
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

        await axios.post(`http://localhost:8000/api/users/login`, { ...user }, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                if (res.data.message) {
                    const { token, user } = res.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({
                        type: actionTypes.USER_LOGIN_SUCCESS,
                        payload: {
                            token, user
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
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: actionTypes.USER_LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        }
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

        const token = localStorage.getItem('token');

        await axios.post(`http://localhost:8000/api/users/logout`, token, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    // console.log("success");
                    localStorage.clear();
                    dispatch({
                        type: actionTypes.USER_LOGOUT_SUCCESS
                    });
                } else {
                    dispatch({
                        type: actionTypes.USER_LOGOUT_FAIL,
                        payload: res.data.error
                    });
                }
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch({
                    type: actionTypes.USER_LOGOUT_FAIL,
                    payload: err.response.data
                })
            })
    }
}

