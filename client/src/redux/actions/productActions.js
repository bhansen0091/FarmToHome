import * as actionTypes from '../constants/productConstants';
import axiosInstance from '../../helpers/axios';
// import axios from 'axios';


export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

        const res = await axiosInstance.get(`/categories/products`);

        if (res.status === 200) {
            dispatch({
                type: actionTypes.GET_PRODUCTS_SUCCESS,
                payload: res.data
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    };
};

export const getProductsByCat = (name) => {
    return async (dispatch) => {
        
        dispatch({
            type: actionTypes.GET_FILTERED_PRODUCTS_REQUEST
        })

        const res = await axiosInstance.get(`/category/products/${name}`);
        if (res.status === 200) {
            dispatch({
                type: actionTypes.GET_FILTERED_PRODUCTS_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({
                type: actionTypes.GET_FILTERED_PRODUCTS_FAIL,
                payload: {error: res.data.error}
            })
        }
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

        const { data } = await axiosInstance.get(`/products/${id}`);

        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        });
    }
};

export const removeProductDetails = () => (dispatch) => {
    dispatch({
        type: actionTypes.GET_PRODUCT_DETAILS_RESET
    });
};