import * as actionTypes from '../constants/adminConstants';
import axios from 'axios';
import axiosInstance from '../../helpers/axios';


export const register = (user) => {
    return async (dispatch) => {

        dispatch({
            type: actionTypes.ADMIN_REGISTRATION_REQUEST,
            payload: {
                ...user
            }
        });

        await axios.post(`http://localhost:8000/api/admin/register`, { ...user }, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                if (res.data.message) {
                    const { message } = res.data;
                    // console.log(message);
                    dispatch({
                        type: actionTypes.ADMIN_REGISTRATION_SUCCESS,
                        payload: {
                            message
                        }
                    })
                } else {
                    // console.log("number 1");
                    dispatch({
                        type: actionTypes.ADMIN_REGISTRATION_FAIL,
                        payload: {
                            error: res.data
                        }
                    })
                }
            })
            .catch(err => {
                // console.log("number 2");
                // if (err) {
                //     console.log(err.response.data.error);
                // }
                dispatch({
                    type: actionTypes.ADMIN_REGISTRATION_FAIL,
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
            type: actionTypes.ADMIN_LOGIN_REQUEST,
            payload: {
                ...user
            }
        });

        await axios.post(`http://localhost:8000/api/admin/login`, { ...user }, { withCredentials: true })
            .then(res => {
                // console.log(res.data);
                if (res.data.message) {
                    const { token, user } = res.data;
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({
                        type: actionTypes.ADMIN_LOGIN_SUCCESS,
                        payload: {
                            token, user
                        }
                    })
                } else {
                    // console.log(res.data);
                    dispatch({
                        type: actionTypes.ADMIN_LOGIN_FAIL,
                        payload: res.data
                    })
                }
            })
            .catch(err => {
                // console.log(err.response.data);
                dispatch({
                    type: actionTypes.ADMIN_LOGIN_FAIL,
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
                type: actionTypes.ADMIN_LOGIN_SUCCESS,
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
            type: actionTypes.ADMIN_LOGOUT_REQUEST
        });

        const token = localStorage.getItem('token');

        await axios.post(`http://localhost:8000/api/admin/logout`, token, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    // console.log("success");
                    localStorage.clear();
                    dispatch({
                        type: actionTypes.ADMIN_LOGOUT_SUCCESS
                    });
                } else {
                    dispatch({
                        type: actionTypes.ADMIN_LOGOUT_FAIL,
                        payload: res.data.error
                    });
                }
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch({
                    type: actionTypes.ADMIN_LOGOUT_FAIL,
                    payload: err.response.data
                })
            })
    }
}

