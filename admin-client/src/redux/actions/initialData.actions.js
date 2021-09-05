import * as actionTypes from '../constants/adminConstants'
import axios from "axios"


export const getInitialData = () => {
    return async dispatch => {
        dispatch({
            type: actionTypes.GET_INITIAL_DATA_REQUEST
        });

        const res = await axios.get(`http://localhost:8000/api/initial-data`);
        if (res.status === 200) {
            const { categories: categoryList, products } = res.data;
            dispatch({
                type: actionTypes.GET_ALL_CATEGORIES_SUCCESS,
                payload: {categoryList: categoryList}
            })
            dispatch({
                type: actionTypes.GET_ALL_PRODUCTS_SUCCESS,
                payload: {products: products}
            })
        }
    }
}