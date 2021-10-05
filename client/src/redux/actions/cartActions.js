import * as actionTypes from '../constants/cartConstants';
import store from '../store';
import axiosInstance from '../../helpers/axios';
// import axios from 'axios';

export const getCartItems = () => {
    return async (dispatch) => {
        // console.log('inside here');
        try {
            dispatch({ type: actionTypes.ADD_TO_DB_CART_REQUEST });
            const res = await axiosInstance.get(`/user/cart`, { withCredentials: true });
            // console.log(res.data);
            if (res.status === 200) {
                const cartItems = res.data;
                // console.log(cartItems);
                if (cartItems) {
                    dispatch({
                        type: actionTypes.ADD_TO_DB_CART_SUCCESS,
                        payload: { cartItems },
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const addToCart = (id, qty) => async (dispatch, getState) => {

    dispatch({
        type: actionTypes.ADD_TO_CART_REQUEST
    })

    // console.log('id', id);
    // console.log('qty', qty);

    const { data } = await axiosInstance.get(`/products/${id}`, { withCredentials: true });
    const appStore = store.getState();
    const auth = appStore.auth;
    // const currentCart = JSON.parse(localStorage.getItem('cart'))

    if (qty < 1) { qty = 1; }
    const payload = {
        product: data._id,
        category: data.category,
        name: data.name,
        productImage: data.productImage,
        price: data.price,
        measurement: data.measurement,
        description: data.description,
        inStock: data.inStock,
        qty
    }

    if (auth.authenticate) {
        // try to add to DB
        console.log("auth.authenticate is true, building 'sendIt'... ");
        const sendIt = {
            cartItems: [
                {
                    product: payload.product,
                    quantity: payload.qty
                }
            ]
        }
        const res = await axiosInstance.post(`/user/cart/add`, sendIt, { withCredentials: true })
        if (res.status === 201 || res.status === 200) {
            // console.log('add to db cart success', res);
            dispatch(getCartItems());
        } else {
            console.log('add to db cart failed', res);
        }
    } else {
        // add to local storage
        dispatch({
            type: actionTypes.ADD_TO_CART_SUCCESS,
            payload: {
                cartItems: [{
                    quantity: payload.qty,
                    // _id: payload.product,
                    product: {
                        _id: payload.product,
                        category: payload.category,
                        name: payload.name,
                        productImage: payload.productImage,
                        price: payload.price,
                        measurement: payload.measurement,
                        description: payload.description,
                        inStock: payload.inStock,
                    }
                }]
            }
        })
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }

}

export const updateCart = () => async (dispatch, getState) => {
    const { auth } = store.getState();
    let cartItems = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) :
        null;
    // console.log('some cart items', cartItems);
    if (auth.authenticate) {
        localStorage.removeItem('cart');
        if (cartItems) {

            const payload = {
                cartItems: Object.keys(cartItems).map((key, index) => {
                    return {
                        product: cartItems[key].product._id,
                        quantity: cartItems[key].quantity
                    }
                })
            }
            if (Object.keys(cartItems).length > 0) {
                // console.log('sending payload:', payload);
                const res = await axiosInstance.post(`/user/cart/add`, payload, { withCredentials: true })
                if (res.status === 201) {
                    dispatch(getCartItems());
                }
            }
        };
    } else {
        if (cartItems) {
            dispatch({
                type: actionTypes.ADD_TO_CART_SUCCESS,
                payload: { cartItems }
            })
        }
    }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    // console.log(id);

    const appStore = store.getState();
    const auth = appStore.auth;

    if (auth.authenticate) {
        dispatch({
            type: actionTypes.REMOVE_FROM_DB_CART_REQUEST
        })
        const res = await axiosInstance.get(`/user/remove/item/${id}`, { withCredentials: true })
        if (res.status === 201) {
            // console.log('status is 201');
            dispatch(getCartItems());
        } else {
            console.log('status is not 201');
        }
    } else {
        dispatch({
            type: actionTypes.REMOVE_FROM_CART_REQUEST
        })
        dispatch({
            type: actionTypes.REMOVE_FROM_CART_SUCCESS,
            payload: id
        })
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }



}


// export const addToCart = (id, qty) => async (dispatch, getState) => {

//     const { data } = await axios.get(`/api/products/${id}`);
//     const currentCart = JSON.parse(localStorage.getItem('cart'))

//     if (qty < 1) { qty = 1; }

//     dispatch({
//         type: actionTypes.ADD_TO_CART,
//         payload: {
//             product: data._id,
//             category: data.category,
//             name: data.name,
//             productImage: data.productImage,
//             price: data.price,
//             measurement: data.measurement,
//             description: data.description,
//             inStock: data.inStock,
//             qty
//         }
//     })

//     localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
// }