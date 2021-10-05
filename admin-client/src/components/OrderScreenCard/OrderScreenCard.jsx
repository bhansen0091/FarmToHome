import { useState } from 'react';

// CSS
import './OrderScreenCard.css'

// Components

// Redux


const OrderScreenCard = (props) => {

    // const [qty, setQty] = useState(props.qty);

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
        </>
    )
}
export default OrderScreenCard;