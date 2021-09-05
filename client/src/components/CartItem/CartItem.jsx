import './CartItem.css';
import { Link } from 'react-router-dom';

const CartItem = ({ item, qtyChangeHandler, removeFromCartHandler }) => {

    // console.log(item);

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={item.product.productImage} alt={item.product.name} />
            </div>
            <Link to={`/product/${item.product._id}`} className="btn btn--primary btn--med cart-item-name">
                {item.product.name}
            </Link>
            <p className="cart-item-price">
                ${item.product.price.toFixed(2)} / 
                {
                    item.product.name.includes('Calf') || item.product.name.includes('Box')
                        ? " pack"
                        : item.product.measurement
                }
            </p>
            <p className="right-quantity">
                <label htmlFor="quantity">Quantity</label>
                <input
                    min="1"
                    type="number"
                    name="quantity"
                    onChange={(e) => e.target.value <= 0 ? item.quantity = 1 : qtyChangeHandler(item.product._id, e.target.value) }
                    value={item.quantity}
                />
            </p>

            <button
                className="cart-item-delete-btn btn btn--primary btn--med"
                onClick={() => removeFromCartHandler(item.product.product)}
            >
                <i className="fas fa-trash"></i>
            </button>
        </div>
    );
};


export default CartItem;