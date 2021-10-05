// React
import { useEffect } from 'react';

// Redux
import { getOrders } from '../../redux/actions/userAuth.actions'
import { addToCart } from '../../redux/actions/cartActions';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';

// Components
import OrderScreenCard from '../../components/OrderScreenCard/OrderScreenCard';

// CSS

const OrdersScreen = (props) => {

    const dispatch = useDispatch();

    // User Information States
    // const auth = useSelector((state) => state.auth)
    const user = useSelector((state) => state.userDetails)

    const makeDate = (order) => {
        // console.log(typeof order.createdAt);
        var date = new Date(order.createdAt);
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        // console.log(`${month}/${day}/${year}`);
        return `${month}/${day}/${year}`
    }

    const addOrderToCartHandler = (order) => {
        // console.log('order', order);
        order.items.map((item) => {
            dispatch(addToCart(item.productId._id, item.purchasedQty));
        })
    }

    // User Orders
    useEffect(() => {
        dispatch(getOrders());
    }, [])

    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            margin: '10px',
            padding: '3px'
        }}>
            {
                user.orders
                    ? user.orders.map((order, idx) => {
                        return (
                            <Table
                                key={idx}
                                bordered
                                style={{
                                    width: '80%',
                                    alignSelf: 'center'
                                }}
                            >
                                <thead>
                                    <tr>
                                        <th colSpan='2'>
                                            Order # : {order._id}
                                        </th>
                                        <th colSpan='2' style={{ textAlign: 'end' }}>
                                            This order was placed on: {makeDate(order)}
                                        </th>
                                        <th style={{ textAlign: 'end' }}>
                                            Status: Pending
                                        </th>
                                    </tr>
                                    <tr>
                                        <th >Product</th>
                                        <th style={{textAlign: 'center'}}>Price</th>
                                        <th >Description</th>
                                        <th style={{textAlign: 'center'}}>Stock</th>
                                        <th style={{textAlign: 'center'}}>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        order.items.map((item, idx) => {
                                            return (
                                                <tr key={idx}>
                                                    <OrderScreenCard
                                                        product={item.productId}
                                                        name={item.productId.name}
                                                        price={item.payablePrice}
                                                        measurement={item.productId.measurement}
                                                        description={item.productId.description}
                                                        inStock={item.productId.inStock}
                                                        qty={item.purchasedQty}
                                                    />
                                                    {/* <td>{item.productId.name}</td>
                                                    <td>{item.purchasedQty} {item.productId.measurement}</td> */}
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr style={{ textAlign: 'end' }}>
                                        <td colSpan='4' style={{
                                            verticalAlign: 'middle'
                                        }}>
                                            Purchased for ${order.totalAmount.toFixed(2)}.
                                        </td>
                                        <td >
                                            <button
                                                className='btn btn--sm'
                                                style={{ backgroundColor: 'orangered' }}
                                                onClick={() => addOrderToCartHandler(order)}
                                            >
                                                Buy Again
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        )
                    })
                    : null
            }

        </div>

        // <>
        // <Table>
        //     <thead>
        // <tr>
        //     <th>Product</th>
        //     <th >Quantity</th>
        // </tr>
        //     </thead>
        //     <tbody>
        //         {
        //             user.orders
        //                 ?
        //                 user.orders.map((order, idx) => {
        //                     return order.items.map((item, idx) => (
        // <tr key={idx}>
        //     <td>{item.productId.name}</td>
        //     <td>{item.purchasedQty} {item.productId.measurement}</td>
        // </tr>
        //                     ))
        //                 })

        //                 : null
        //         }
        //     </tbody>
        // </Table>
        // </>

    );
};

export default OrdersScreen;