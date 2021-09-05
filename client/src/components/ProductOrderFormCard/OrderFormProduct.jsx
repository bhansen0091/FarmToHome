import { useState, useEffect } from 'react';

// CSS
import './OrderFormProduct.css'

// Components
import { Button } from '../Button/Button'

// Redux
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';


const OrderFormProduct = ({ product }) => {

    const [qty, setQty] = useState(0);
    const dispatch = useDispatch();

    const addToCartHandler = (product) => {
        if (qty < 1) {
            setQty(1);
        }
        dispatch(addToCart(product._id, qty));
    }

    return (
        <>
            <td style={{ width: '25%' }}>{product.name}</td>
            <td style={{ width: '10%' }}>${product.price.toFixed(2)} / {product.measurement}</td>
            <td style={{ width: '25%' }}>{product.description}</td>
            <td style={{ width: '10%', textAlign: 'center' }}>{product.inStock ? " In Stock." : " Out Of Stock."}</td>
            <td>
                <p style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', margin: '0' }} >
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                        className="add-to-cart-input"
                        min="0"
                        type="number"
                        name="quantity"
                        onChange={(e) => e.target.value < 1 ? setQty(1) : setQty(e.target.value)}
                        value={qty}
                    />
                    {
                        product.inStock
                            ? <Button
                                buttonSize='btn--sm'
                                onClick={() => addToCartHandler(product)}
                            >Add
                            </Button>
                            : <Button
                                buttonSize='btn--sm'
                                buttonStyle='btn-disabled'
                            >Add
                            </Button>
                    }
                </p>
            </td>
        </>
    )
}
export default OrderFormProduct;