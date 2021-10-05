// React
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// React Router
import { Link } from 'react-router-dom';

// Components
import CartItem from '../../components/CartItem/CartItem';
import { addToCart, removeFromCart, getCartItems } from '../../redux/actions/cartActions';

// CSS
import './CartScreen.css';

const CartScreen = (props) => {

    const auth = useSelector((state) => state.auth);
    const cart = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticate) {
            console.log("Getting Cart Items 'CartScreen");
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);

    const qtyChangeHandler = (id, qty) => {
        dispatch(addToCart(id, qty));
    }

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0);
    };


    // console.log('cartscreen cartitems', cartItems);

    const getCartSubTotal = () => {
        if (cartItems.length > 0) {
            for (const cItem of cartItems) {
                if (cItem.product.name.includes('Half Calf')) {
                    cItem.product.price = 200 * 7
                } else if (cItem.product.name.includes("Whole Calf")) {
                    cItem.product.price = 450 * 6.5
                } else if (cItem.product.name.includes('Pork Mix Box')) {
                    cItem.product.price = 25 * 7.5
                }
            }
        }
        let output = cartItems.reduce((price, item) => item.product.price * item.quantity + price, 0);
        // console.log("output", output);
        return output
    }

    if (props.onlyCartItems) {
        return (
            <>
                <div className="cart-screen-left">
                    <h2>Your Cart</h2>
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
            </>
        );
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
                    {
                        cartItems.length <= 0
                            ? null
                            : <Link
                                className="btn btn--primary btn--med products-button"
                                to="/checkout"
                            >
                                Proceed To Checkout
                            </Link>
                    }
                </div>
            </div>
        </div>
    )
}
export default CartScreen;