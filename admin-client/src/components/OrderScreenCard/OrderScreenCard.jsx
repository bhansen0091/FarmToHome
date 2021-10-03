import { useState, useEffect } from 'react';

// CSS
import './OrderScreenCard.css'

// Components
import { Button } from '../Button/Button'

// Redux
import { useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/actions/cartActions';


const OrderScreenCard = (props) => {

    // const [qty, setQty] = useState(props.qty);
    const dispatch = useDispatch();

    const initialProduct = {
        _id: props.product._id,
        name: props.name,
        price: props.price,
        // description: props.description,
        inStock: props.inStock,
        measurement: props.measurement,
        quantity: props.qty
    }

    const [product, setProduct] = useState(initialProduct)

    return (
        <>
            <td style={{
                width: '30%',
                verticalAlign: 'middle'
            }}>
                {product.name}
            </td>
            <td style={{
                width: '10%',
                textAlign: 'center',
                verticalAlign: 'middle'
            }}>
                ${product.price.toFixed(2)} / {product.measurement}
            </td>
            <td style={{
                width: '10%',
                textAlign: 'center',
                verticalAlign: 'middle'
            }}>
                {product.quantity}
            </td>
            <td style={{
                width: '10%',
                textAlign: 'center',
                verticalAlign: 'middle'
            }}>
                {product.inStock ? " In Stock." : " Out Of Stock."}
            </td>
            {/* <td style={{
                width: '25%',
                verticalAlign: 'middle'
            }}>
                {product.description}
            </td> */}
            {/* <td style={{ verticalAlign: 'middle' }}>
                <p style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    margin: '0'
                }}>
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
            </td> */}
        </>
    )
}
export default OrderScreenCard;