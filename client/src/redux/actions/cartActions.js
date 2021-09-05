import * as actionTypes from '../constants/cartConstants';
import store from '../store';
import axios from 'axios';

export const getCartItems = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.ADD_TO_CART_REQUEST });
            const res = await axios.get(`/api/user/cart`);
            if (res.status === 200) {
                // console.log(res.data);
                const cartItems = res.data;
                // console.log(cartItems);
                if (cartItems) {
                    dispatch({
                        type: actionTypes.ADD_TO_CART_SUCCESS,
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

    const { data } = await axios.get(`/api/products/${id}`);
    const appStore = store.getState();
    const auth = appStore.auth;
    const currentCart = JSON.parse(localStorage.getItem('cart'))

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
        const sendIt = {
            cartItems: [
                {
                    product: payload.product,
                    quantity: payload.qty
                }
            ]
        }
        const res = await axios.post(`/api/user/cart/add`, sendIt, { withCredentials: true })
        if (res.status === 201) {
            console.log('status is 201');
            dispatch(getCartItems());
        } else {
            console.log('status is not 201');
        }


    } else {
        // add to local storage
        dispatch({
            type: actionTypes.ADD_TO_CART_SUCCESS,
            payload: payload
        })
        localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    }

}

// export const addToCart = (id, qty) => async (dispatch, getState) => {

//     dispatch({
//         type: actionTypes.ADD_TO_CART_REQUEST
//     })

//     const { data } = await axios.get(`/api/products/${id}`);
//     const appStore = store.getState();
//     const auth = appStore.auth;
//     const currentCart = JSON.parse(localStorage.getItem('cart'))

//     if (qty < 1) { qty = 1; }
//     const payload = {
//         product: data._id,
//         category: data.category,
//         name: data.name,
//         productImage: data.productImage,
//         price: data.price,
//         measurement: data.measurement,
//         description: data.description,
//         inStock: data.inStock,
//         qty
//     }

//     if (auth.authenticate) {
//         // try to add to DB
//         dispatch({
//             type: actionTypes.ADD_TO_DB_CART_REQUEST
//         })
//         const data = {
//             cartItems: [
//                 {
//                     product: payload.product,
//                     quantity: payload.qty
//                 }
//             ]
//         }
//         const res = await axios.post('/api/user/cart/add', data, { withCredentials: true })
//         if (res.status === 201) {
//             dispatch(getCartItems());
//         }
//     } else {
//         // add to local storage
//         dispatch({
//             type: actionTypes.ADD_TO_CART_SUCCESS,
//             payload: payload
//         })
//         localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
//     }

// }

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

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: id
    })

    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
}
