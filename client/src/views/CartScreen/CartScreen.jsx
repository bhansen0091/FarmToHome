import './CartScreen.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import CartItem from '../../components/CartItem/CartItem';
import { Button } from '../../components/Button/Button';
import { addToCart, removeFromCart, getCartItems } from '../../redux/actions/cartActions';





const CartScreen = () => {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const cart = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    // useEffect(() => {
    //     if (auth.authenticate) {
    //         dispatch(getCartItems());
    //     }
    // }, [auth.authenticate]);

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };



    const getCartSubTotal = () => {
        if (cartItems.length > 0) {
            // console.log(cartItems);
            for (const cItem of cartItems) {
                if (cItem.name.includes('Half Calf')) {
                    cItem.price = 200 * 7
                } else if (cItem.name.includes("Whole Calf")) {
                    cItem.price = 450 * 6.5
                } else if (cItem.name.includes('Pork Mix Box')) {
                    cItem.price = 25 * 7.5
                }
            }
        }
        let output = cartItems.reduce((price, item) => item.price * item.qty + price, 0);
        return output
    }

    return (
        <div className="cart-screen">
            <div className="cart-screen-left">
                <h2>Shopping Cart</h2>
                {
                    cartItems.length === 0
                        ? (
                            <div>
                                <p>Your cart is empty</p>
                                <p>
                                    <Link
                                        className="btn btn--primary btn--med products-button"
                                        to="/our-products"
                                    >
                                        Browse our products!
                                    </Link>
                                </p>
                                <h3 style={{ textAlign: 'center' }}>Or</h3>
                                <p>
                                    <Link
                                        className="btn btn--primary btn--med products-button"
                                        to="/order-form"
                                    >
                                        Check out our Easy Order Form!
                                    </Link>
                                </p>
                            </div>
                        ) : (
                            <>
                                {
                                    cartItems.map((item, idx) => (
                                        <CartItem
                                            key={idx}
                                            item={item}
                                            qtyChangeHandler={qtyChangeHandler}
                                            removeFromCartHandler={removeFromCartHandler}
                                        />
                                    ))
                                }
                                <p>
                                    <Link
                                        className="btn btn--primary btn--med products-button"
                                        to="/our-products"
                                    >
                                        Continue Shopping
                                    </Link>
                                </p>
                            </>
                        )
                }
            </div>
            <div className="cart-screen-right">
                <div className="cart-screen-info">
                    <p>
                        {
                            getCartCount() !== 0
                                ? getCartCount() > 1
                                    ? 'Estimated total for your ' + getCartCount() + ' items.'
                                    : 'Estimated total for your item.'
                                : "Your cart is empty."
                        }
                    </p>
                    <p>
                        {
                            getCartCount() > 0
                                ? getCartSubTotal().toFixed(2)
                                : ''
                        }
                    </p>
                </div>
                <div className="cart-screen-check-out">
                    <Button>Proceed To Checkout</Button>
                </div>
            </div>
        </div>
    )
}
export default CartScreen;