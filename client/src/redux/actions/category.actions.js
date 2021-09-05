import * as actionTypes from '../constants/category.constants';
import axios from 'axios';

export const getAllCategories = () => {
    return async dispatch => {
        dispatch({
            type: actionTypes.GET_ALL_CATEGORIES_REQUEST
        });

        const res = await axios.get(`/api/categories`);

        if (res.status === 200) {
            const { categoryList } = res.data
            dispatch({
                type: actionTypes.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categoryList: categoryList }
            })
        } else {
            dispatch({
                type: actionTypes.GET_ALL_CATEGORIES_FAIL,
                payload: { error: res.data.error }
            })
        }
    }
}