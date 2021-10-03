import * as actionTypes from '../constants/adminConstants'
import axios from "../../helpers/axios";

export const getCustomerOrders = () => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.GET_CUSTOMER_ORDERS_REQUEST });
        try {
            const res = await axios.get("/orders/all", { withCredentials: true });
            if (res.status === 200) {
                const { orders } = res.data;
                // console.log('getOrders', res.data);
                dispatch({
                    type: actionTypes.GET_CUSTOMER_ORDERS_SUCCESS,
                    payload: { orders },
                });
            } else {
                const { error } = res.data;
                dispatch({
                    type: actionTypes.GET_CUSTOMER_ORDERS_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateOrder = (payload) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPDATE_CUSTOMER_ORDER_REQUEST });
        try {
            const res = await axios.put("/orders/update", payload, { withCredentials: true });
            if (res.status === 201) {
                dispatch({ type: actionTypes.UPDATE_CUSTOMER_ORDER_SUCCESS });
                dispatch(getCustomerOrders());
            } else {
                const { error } = res.data;
                dispatch({
                    type: actionTypes.UPDATE_CUSTOMER_ORDER_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};