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

// export const getAllProducts = () => {
//     return async dispatch => {
//         dispatch({
//             type: actionTypes.GET_ALL_PRODUCTS_REQUEST
//         });

//         const res = await axiosInstance.get(`/products`);
//         const { products } = res.data;
//         console.log(res.data);
//         if (res.status === 200) {
//             dispatch({
//                 type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
//                 payload: { products: products }
//             })
//         }
//     }
// }