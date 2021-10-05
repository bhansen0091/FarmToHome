import { useState } from 'react';

// CSS
import './ProductCard.css';

// Routing
import { Link } from 'react-router-dom';

// Components
import { Button } from '../../components/Button/Button'

// Redux
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import { generatePublicUrl } from '../../urlConfig';


const Product = ({ productId, category, name, productImage, price, measurement, description, inStock }) => {

    const [qty, setQty] = useState(0);
    const dispatch = useDispatch();

    const addToCartHandler = () => {
        if (qty < 1) {
            setQty(1);
        }
        dispatch(addToCart(productId, qty));
    }

    return (
        <div className="product">
            <img src={generatePublicUrl(productImage)} alt={name} />
            <div className="product-info">
                <h1
                    style={{
                        textAlign: 'center',
                        marginBottom: '15px',
                        padding: '15px 2px',
                        borderRadius: '4px'
                    }}
                    className="info-name"
                >{name}
                </h1>
                {/* <p className="info-description">{description}</p> */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '0px 0px 0px 0px'
                    }}
                    className="info-price"
                >
                    <p>
                        ${price.toFixed(2)} / {measurement}
                    </p>
                    <p>
                        {inStock ? " In Stock." : " Out Of Stock."}
                    </p>
                </div>
                <p className="add-to-cart-quantity">
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        min="0"
                        type="number"
                        name="quantity"
                        onChange={(e) => e.target.value < 0 ? setQty(0) : setQty(e.target.value)}
                        value={qty}
                    />
                </p>
                <p className="add-to-cart-button">
                    {
                        inStock
                            ? <Button buttonSize="btn--sm" onClick={addToCartHandler}>Add To Cart</Button>
                            : <Button buttonSize="btn--sm" buttonStyle='btn-disabled'>Add To Cart</Button>
                    }

                </p>
                <Link to={`/product/${productId}`} className="info-button btn--primary btn--sm">View</Link>
            </div>
        </div>
    )
}
export default Product;