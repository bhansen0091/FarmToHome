import * as actionTypes from '../constants/adminConstants'
import axios from "axios"

export const addProduct = (form) => {
    return async dispatch => {
        dispatch({
            type: actionTypes.ADD_NEW_PRODUCT_REQUEST
        });

        await axios.post(`http://localhost:8000/api/products`, form, { withCredentials: true })
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

export const getAllProducts = () => {
    return async dispatch => {
        dispatch({
            type: actionTypes.GET_ALL_PRODUCTS_REQUEST
        });

        const res = await axios.get(`http://localhost:8000/api/products`);
        const { products } = res.data;
        console.log(res.data);
        if (res.status === 200) {
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products: products }
            })
        }
    }
}