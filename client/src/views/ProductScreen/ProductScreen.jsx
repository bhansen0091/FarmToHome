import './ProductScreen.css';
import { useState, useEffect } from 'react';

// Components
import { Button } from '../../components/Button/Button'

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../redux/actions/productActions';
import { addToCart } from '../../redux/actions/cartActions';

const ProductScreen = ({ match, history }) => {

    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.getProductDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        if (product && match.params.id !== product._id) {
            dispatch(getProductDetails(match.params.id))
        }
    }, [dispatch, product, match]);

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty));
        history.push('/cart');
        // history.goBack();
    }

    return (
        <div className="product-screen">
            {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> :
                <>
                    <div className="product-screen-left">
                        <div className="left-image">
                            <img src={product.productImage} alt="product name" />
                        </div>
                        <div className="left-info">
                            <p className="left-name">{product.name}</p>
                            <p className="left-price">${product.price} / {product.measurement}</p>
                            <p className="left-description">{product.description}</p>
                        </div>
                    </div>
                    <div className="product-screen-right">
                        <div className="right-info">
                            <p className="right-price">
                                Price: <span className="right-price-span">${product.price} / {product.measurement}</span>
                            </p>
                            <p className="right-status">
                                Status: <span className="right-status-span">{product.inStock ? "In Stock." : "Out Of Stock."}</span>
                            </p>
                            <p className="right-quantity">
                                <label htmlFor="quantity">Quantity</label>
                                <input 
                                    min="0"
                                    type="number" 
                                    name="quantity" 
                                    onChange={(e) => e.target.value < 1 ? setQty(1) : setQty(e.target.value)}
                                    value={qty}
                                />
                            </p>
                            <p className="right-button">
                                <Button onClick={addToCartHandler}>Add To Cart</Button>
                                {/* <button type="button">Add To Cart</button> */}
                            </p>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}
export default ProductScreen;