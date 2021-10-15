import * as actionTypes from '../constants/adminConstants'
import axiosInstance from '../../helpers/axios';
// import axios from "axios"

export const addProduct = (form) => {
    return async dispatch => {
        dispatch({
            type: actionTypes.ADD_NEW_PRODUCT_REQUEST
        });

        await axiosInstance.post(`/products`, form, { withCredentials: true })
            .then(res => {
                dispatch({
                    type: actionTypes.ADD_NEW_PRODUCT_SUCCESS,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.ADD_NEW_PRODUCT_FAIL,
                    payload: err.response.data
                })
            })

    }
}

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST });

        const res = await axiosInstance.get(`/categories/products`);

        if (res.status === 200) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    };
};

export const updateProductInfo = (payload) => {
    return async (dispatch) => {
        try {

            console.log(payload);

            // for (var [key, value] of form.entries()) {
            //     console.log(key, value);
            // }

            // console.log('form in actions', form);
            await axiosInstance.put(`products/${payload._id}`, payload, { withCredentials: true })
        } catch (error) {

        }
    }
};

export const deleteProductById = (payload) => {
    return async (dispatch) => {
        try {

            // console.log('payload in actions', payload);

            const res = await axiosInstance.delete(`product/deleteProductById`, {
                data: { payload }, withCredentials: true,
            });

            dispatch({ type: actionTypes.DELETE_PRODUCT_BY_ID_REQUEST });

            if (res.status === 202) {
                dispatch({ type: actionTypes.DELETE_PRODUCT_BY_ID_SUCCESS });
                dispatch(getAllProducts());
            } else {
                const { error } = res.data;
                dispatch({
                    type: actionTypes.DELETE_PRODUCT_BY_ID_FAILURE,
                    payload: {
                        error,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
}
