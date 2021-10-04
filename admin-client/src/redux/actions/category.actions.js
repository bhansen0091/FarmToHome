import * as actionTypes from '../constants/adminConstants'
import axiosInstance from '../../helpers/axios';
// import axios from "axios"

export const getAllCategories = () => {
    return async dispatch => {

        dispatch({
            type: actionTypes.GET_ALL_CATEGORIES_REQUEST
        });

        const res = await axiosInstance.get(`/categories`);
        // console.log(res.data);
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

export const addCategory = (cate) => {
    return async dispatch => {

        dispatch({
            type: actionTypes.ADD_NEW_CATEGORY_REQUEST
        })

        await axiosInstance.post(`/categories`, cate, { withCredentials: true })
            .then(res => {
                // console.log("res.data in the .then");
                // console.log(res.data);

                dispatch({
                    type: actionTypes.ADD_NEW_CATEGORY_SUCCESS,
                    payload: { category: res.data }
                })
            })
            .catch(err => {
                // console.log("err in the .catch");
                // console.log(err.response);
                dispatch({
                    type: actionTypes.ADD_NEW_CATEGORY_FAIL,
                    payload: err.response
                })
            })
    }
}

export const updateMultipleCategories = (cate) => {
    return async dispatch => {

        dispatch({
            type: actionTypes.UPDATE_CATEGORIES_REQUEST
        })

        const res = await axiosInstance.post(`/categories/update-multiple`, cate);

        if (res.status === 201) {
            dispatch({
                type: actionTypes.UPDATE_CATEGORIES_SUCCESS
            });
            dispatch(getAllCategories());
        } else {

            const { error } = res;

            dispatch({
                type: actionTypes.UPDATE_CATEGORIES_FAIL,
                payload: { error }
            })

            console.log(error);
        }

    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {

        dispatch({
            type: actionTypes.DELETE_CATEGORIES_REQUEST
        });

        const res = await axiosInstance.post(`/categories/delete-multiple`, {
            payload: {
                ids
            }
        });

        if (res.status === 201) {
            dispatch({
                type: actionTypes.DELETE_CATEGORIES_SUCCESS
            });
            dispatch(getAllCategories());
        } else {
            const { error } = res;
            dispatch({
                type: actionTypes.DELETE_CATEGORIES_FAIL,
                payload: { error }
            });
        }

    }
}

