// React
import { useEffect, useState } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import Layout from '../../components/Layout/Layout';
import OrderScreenCard from '../../components/OrderScreenCard/OrderScreenCard';

// React-Bootstrap
import { Table } from 'react-bootstrap';

// CSS
import './CurrentOrderScreen.css'
import { Button } from '../../components/Button/Button';
import { getCustomerOrders, updateOrder } from '../../redux/actions/order.actions';



const CurrentOrdersScreen = (props) => {

    const orders = useSelector((state) => state.orders.orders);
    const dispatch = useDispatch();

    const [selectedOrder, setSelectedOrder] = useState({})
    const [type, setType] = useState('');
    const [reloadIt, setReloadIt] = useState(false);

    const handleShow = (order) => {
        const thisOrder = order
        if (selectedOrder._id === order._id) {
            setSelectedOrder({})
        } else {
            setSelectedOrder(thisOrder);
        }
        setType(getNextOrderStatus(order));
        // setShow(!show);
    }

    const handleUpdateOrder = (orderId, type) => {
        // console.log('orderId', orderId);
        // console.log('type', type);
        const payload = {
            orderId,
            type
        }
        dispatch(updateOrder(payload))
        setReloadIt(!reloadIt);
    }

    useEffect(() => {
        dispatch(getCustomerOrders());
    }, [reloadIt])

    const makeDate = (date) => {
        // console.log(typeof orderDate.createdAt);
        var newDate = new Date(date);
        var month = newDate.getMonth() + 1;
        var day = newDate.getDate();
        var year = newDate.getFullYear();
        // console.log(`${month}/${day}/${year}`);
        return `${month}/${day}/${year}`
    }

    const getCurrentOrderStatus = (order) => {
        var currentStatus;
        var orderStatus = order.orderStatus;
        for (var i = 0; i <= orderStatus.length - 1; i++) {
            // console.log(orderStatus[i]);
            if (!orderStatus[orderStatus.length - 1].isCompleted) {
                if (orderStatus[i].isCompleted === false) {
                    currentStatus = orderStatus[i - 1].type;
                    break;
                }
            } else {
                currentStatus = "delivered"
            }
        }
        return currentStatus;
    }

    const getNextOrderStatus = (order) => {
        var nextStatus;
        var orderStatus = order.orderStatus;
        for (var i = 0; i <= orderStatus.length - 1; i++) {
            // console.log(orderStatus[i]);
            if (!order.orderStatus[orderStatus.length - 1].isCompleted) {
                if (orderStatus[i].isCompleted === true) {
                    nextStatus = orderStatus[i + 1].type;
                }
            }

        }
        return nextStatus;
    }

    // const sortAscending = () => {
    //     [...orders].sort((a, b) => a - b);
    // }

    return (
        <Layout sidebar>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                flexDirection: 'column',
                margin: '10px',
                padding: '3px'
            }}>
                {
                    orders
                        ? orders.map((order, idx) => {
                            return (
                                getCurrentOrderStatus(order) !== 'delivered'
                                    ? <Table
                                        key={idx}
                                        bordered
                                        style={{
                                            width: '95%',
                                            alignSelf: 'center'
                                        }}
                                    >
                                        <thead onClick={() => handleShow(order)}>
                                            <tr>
                                                <th colSpan=''
                                                    style={{
                                                        width: '30%',
                                                        verticalAlign: 'middle'
                                                    }}>
                                                    Order # : {order._id}
                                                </th>
                                                <th colSpan='' style={{ textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>
                                                    Order Date: {makeDate(order.createdAt)}
                                                </th>
                                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>
                                                    Current Status: {getCurrentOrderStatus(order)}

                                                </th>
                                                {
                                                    order.orderStatus.map((status, idx) => {
                                                        return (status.type === "delivered" && status.date
                                                            ? <th key={idx} style={{ textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>
                                                                Delivered On: {makeDate(status.date)}
                                                            </th>
                                                            : status.type === "delivered"
                                                                ? <th key={idx} style={{ textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>
                                                                    Not Delivered
                                                                </th>
                                                                : null
                                                        )
                                                    })
                                                }

                                            </tr>
                                        </thead>
                                        <tbody className={selectedOrder._id === order._id ? 'tableBody show' : 'tableBody'}>
                                            <tr>
                                                <th >Product</th>
                                                <th style={{ textAlign: 'center' }}>Purchased Price</th>
                                                {/* <th >Description</th> */}
                                                <th style={{ textAlign: 'center' }}>Quantity</th>
                                                <th style={{ textAlign: 'center' }}>Stock</th>
                                            </tr>
                                            {
                                                order.items.map((item, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <OrderScreenCard
                                                                product={item.productId}
                                                                name={item.productId.name}
                                                                price={item.payablePrice}
                                                                measurement={item.productId.measurement}
                                                                // description={item.productId.description}
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

                                                {
                                                    getCurrentOrderStatus(order) !== 'delivered'
                                                        ?
                                                        <>
                                                            <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '10%' }}>
                                                                Order Status:
                                                                <select
                                                                    onChange={(e) => setType(e.target.value)}
                                                                    style={{ marginLeft: '10px', padding: '4px' }} name="orderStatus">
                                                                    {
                                                                        order.orderStatus.map((status, idx) => {
                                                                            return (
                                                                                !status.isCompleted
                                                                                    ? <option
                                                                                        key={idx}
                                                                                        value={status.type}
                                                                                    >
                                                                                        {status.type}
                                                                                    </option>
                                                                                    : null
                                                                            )
                                                                        })
                                                                    }
                                                                </select>
                                                            </th>
                                                            <td colSpan='3'>
                                                                <Button
                                                                    className='btn btn--primary btn--sm'
                                                                    // style={{ backgroundColor: 'orangered' }}
                                                                    onClick={() => handleUpdateOrder(order._id, type)}
                                                                >
                                                                    Update Order
                                                                </Button>
                                                            </td>
                                                        </>
                                                        : null
                                                }



                                            </tr>
                                        </tbody>
                                    </Table>
                                    : null
                            )
                        })
                        : null
                }

            </div>
            {/* {
                orders.map((order, idx) => {
                    console.log(order);
                    return (
                        <p key={idx}> Order#: {order._id}</p>
                    )
                })
            } */}
        </Layout >
    );
};

export default CurrentOrdersScreen;