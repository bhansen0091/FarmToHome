import * as actionTypes from '../constants/adminConstants';
import axios from 'axios';


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
                console.log(res.data);
                if (res.data.message) {
                    const { message } = res.data.message;
                    dispatch({
                        type: actionTypes.ADMIN_REGISTRATION_SUCCESS,
                        payload: {
                            message
                        }
                    })
                } else {
                    dispatch({
                        type: actionTypes.ADMIN_REGISTRATION_FAIL,
                        payload: {
                            error: { error: res.data.error }
                        }
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.ADMIN_REGISTRATION_FAIL,
                    payload: {
                        error: { error: err }
                    }
                })
            })
    }
}