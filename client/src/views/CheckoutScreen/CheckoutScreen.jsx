// React
import { useEffect, useState } from 'react';

// Redux
import { addOrder, getAddress } from '../../redux/actions/userAuth.actions';
import { getCartItems } from '../../redux/actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';

// React-Bootstrap
import { Table } from 'react-bootstrap';

// Components
import RegistrationModal from '../../components/Registration/RegistrationModal';
import LoginModal from '../../components/Login/LoginModal';
import { Button } from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import AddressForm from './AddressForm';

// Screens
import CartScreen from '../CartScreen/CartScreen';

// CSS
import './CheckoutScreen.css';


const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div
                onClick={props.onClick}
                className={`checkoutHeader ${props.active && "active"}`}
            >
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
};

const Address = ({
    adr,
    selectAddress,
    enableAddressEditForm,
    confirmDeliveryAddress,
    onAddressSubmit,
}) => {
    return (
        <div className="flexRow addressContainer">
            <div>
                <input name="address" onClick={() => selectAddress(adr)} type="radio" />
            </div>
            <div className="flexRow sb addressinfo">
                {!adr.edit ? (
                    <div style={{ width: "100%" }}>
                        <div className="addressDetail">
                            <div>
                                <span className="addressName">{adr.name}</span>
                                <span className="addressType">{adr.addressType}</span>
                                <span className="addressMobileNumber">{adr.mobileNumber}</span>
                            </div>
                            {adr.selected && (
                                <Button
                                    className='btn btn--primary'
                                    buttonSize='btn--sm'
                                    name="EDIT"
                                    onClick={() => enableAddressEditForm(adr)}
                                >
                                    EDIT
                                </Button>
                            )}
                        </div>
                        <div className="fullAddress">
                            {adr.streetTwo ? adr.streetOne + ' - ' + adr.streetTwo + ',' : adr.streetOne + ','}
                            <br />
                            {`${adr.city}, ${adr.state} ${adr.zipCode}`}
                        </div>
                        {adr.selected && (
                            <div
                                style={{ display: 'flex', justifyContent: 'center' }}
                            >
                                <Button
                                    className='btn btn--primary'
                                    buttonSize='btn--sm'
                                    onClick={() => confirmDeliveryAddress(adr)}
                                >Confirm Delivery Address</Button>
                            </div>
                        )}
                    </div>
                ) : (
                    <AddressForm
                        withoutLayout={true}
                        onSubmitForm={onAddressSubmit}
                        initialData={adr}
                        onCancel={() => { }}
                    />
                )}
            </div>
        </div>
    );
};

const CheckoutScreen = (props) => {

    const dispatch = useDispatch();

    // User Information States
    const user = useSelector((state) => state.userDetails);
    const auth = useSelector((state) => state.auth);
    const [address, setAddress] = useState([]);
    const [newAddress, setNewAddress] = useState(false);

    // Cart Information States
    const cart = useSelector((state) => state.cart);
    const [cartItems, setCartItems] = useState(cart.cartItems);

    // Modal State Controllers
    // Login Modal
    const [loginModal, setLoginModal] = useState(false);
    const showLoginModal = () => setLoginModal(true);
    const hideLoginModal = () => setLoginModal(false);

    // Registration Modal
    const [regModal, setRegModal] = useState(false);
    const showRegModal = () => setRegModal(true);
    const hideRegModal = () => setRegModal(false);

    // Order Step States
    // Delivery Address Step
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [confirmAddressOption, setConfirmAddressOption] = useState(false);

    // Order Summary Step
    const [orderSummaryOption, setOrderSummaryOption] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);

    // Finalize Order Option
    const [finalizeOrderOption, setFinalizeOrderOption] = useState(false);

    // Place Order
    const [confirmOrder, setConfirmOrder] = useState(false);

    // Address Functions
    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddressOption(true);
        setOrderSummaryOption(true);
    };

    const selectAddress = (addr) => {
        //console.log(addr);
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id
                ? { ...adr, selected: true }
                : { ...adr, selected: false }
        );
        // console.log('updatedAddress', updatedAddress);
        setAddress(updatedAddress);
        setNewAddress(false);
    };

    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddressOption(true);
        setOrderSummaryOption(true);
    };

    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        );
        setAddress(updatedAddress);
    };

    useEffect(() => {
        if (auth.authenticate) {
            const address = user.address.map((adr) => ({
                ...adr,
                selected: false,
                edit: false,
            }));
            setAddress(address);
            setNewAddress(false);
            // user.address.length === 0 && setNewAddress(true);
        }
    }, [user.address, auth.authenticate]);

    // Order Confirmation Functions
    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummaryOption(false);
        setFinalizeOrderOption(true);
    };

    // Place Order
    const onConfirmOrder = () => {
        const totalAmount = getCartSubTotal();

        const items = cart.cartItems.map((item) => ({
            productId: item.product._id,
            payablePrice: item.product.price,
            purchasedQty: item.quantity
        }))

        const payload = {
            addressId: selectedAddress._id,
            totalAmount,
            items,
            paymentStatus: "pending"
        };

        // console.log(payload);
        dispatch(addOrder(payload));
        setConfirmOrder(true);
    };

    useEffect(() => {
        if (confirmOrder && user.placedOrderId) {
            props.history.push(`/order_details/${user.placedOrderId}`);
        }
    }, [user.placedOrderId]);

    // Logged-in User Cart
    useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems());
        if (!auth.authenticate) {
            setAddress([]);
            setConfirmAddressOption(false);
            setSelectedAddress(null);
            setOrderSummaryOption(false);
            setOrderConfirmation(false);
            setFinalizeOrderOption(false);
            setConfirmOrder(false);
        }
    }, [auth.authenticate]);

    useEffect(() => {
        // console.log('checkout setCartItems', cartItems);
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.quantity) + qty, 0);
    };

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
        };
        let output = cartItems.reduce((price, item) => item.product.price * item.quantity + price, 0);
        // console.log('checkoutScreen output', output);
        return output
    }

    return (
        <>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <div className="checkoutContainer">
                    {/* check if user logged in or not */}
                    <CheckoutStep
                        stepNumber={"1"}
                        title={"LOGIN / REGISTER"}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ? (
                                <div className="loggedInId">
                                    <span style={{ fontWeight: 500 }}>Account Holder: {auth.user.firstName} {auth.user.lastName}</span>
                                    <span style={{ margin: "0 5px" }}>| Email: {auth.user.email}</span>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-evenly',
                                        padding: '10px'
                                    }}
                                >
                                    <button
                                        style={{ marginRight: '10px' }}
                                        className="btn btn--primary btn--med sign-up-btn"
                                        onClick={showLoginModal}>
                                        Login
                                    </button>
                                    <button
                                        className="btn btn--primary btn--med sign-up-btn"
                                        onClick={showRegModal}>
                                        Register
                                    </button>
                                    {/* <InputDefault label="Email" /> */}
                                    <LoginModal
                                        show={loginModal}
                                        size={'lg'}
                                        onHide={hideLoginModal}
                                        handleClose={hideLoginModal}
                                    />
                                    <RegistrationModal
                                        show={regModal}
                                        size={'lg'}
                                        onHide={hideRegModal}
                                        handleClose={hideRegModal}
                                    />
                                </div>
                            )
                        }
                    />
                    <CheckoutStep
                        stepNumber={"2"}
                        title={"DELIVERY ADDRESS"}
                        active={!confirmAddressOption && auth.authenticate}
                        body={
                            <>
                                {confirmAddressOption ? (
                                    <div className="stepCompleted">
                                        <div>
                                            {`
                                            ${selectedAddress.name} - 
                                            ${selectedAddress.addressType} Address - 
                                            ${selectedAddress.streetTwo
                                                    ? selectedAddress.streetOne + ' - ' + selectedAddress.streetTwo + ','
                                                    : selectedAddress.streetOne + ','
                                                } 
                                            ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.zipCode}
                                        `}
                                        </div>
                                        <div>
                                            <Button
                                                buttonSize='btn--sm'
                                                onClick={() => setConfirmAddressOption(false)}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    address.map((adr, idx) => (
                                        <Address
                                            key={idx}
                                            selectAddress={selectAddress}
                                            enableAddressEditForm={enableAddressEditForm}
                                            confirmDeliveryAddress={confirmDeliveryAddress}
                                            onAddressSubmit={onAddressSubmit}
                                            adr={adr}
                                        />
                                    ))
                                )}
                            </>
                        }
                    />

                    {/* AddressForm */}
                    {confirmAddressOption ? null : newAddress ? (
                        <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
                    ) : auth.authenticate ? (
                        <CheckoutStep
                            stepNumber={"+"}
                            title={"ADD NEW ADDRESS"}
                            active={false}
                            onClick={() => setNewAddress(true)}
                        />
                    ) : null}

                    <CheckoutStep
                        stepNumber={"3"}
                        title={"ORDER SUMMARY"}
                        active={orderSummaryOption}
                        body={
                            orderSummaryOption ? (
                                <CartScreen onlyCartItems={true} />
                            ) : orderConfirmation ? (
                                <div className="stepCompleted">
                                    <div style={{}}>
                                        {/* {Object.keys(cart.cartItems).length} items */}
                                        <p>
                                            {
                                                getCartCount() !== 0
                                                    ? getCartCount() > 1
                                                        ? 'Estimated total for your ' + getCartCount() + ' items.'
                                                        : 'Estimated total for your item.'
                                                    : "Your cart is empty."
                                            }
                                        </p>
                                        <strong style={{ fontSize: '16px' }}>
                                            {
                                                getCartCount() > 0
                                                    ? '$' + getCartSubTotal().toFixed(2)
                                                    : ''
                                            }
                                        </strong>
                                    </div>

                                    <div style={{ width: '65%' }}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th >Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cart.cartItems
                                                        ? cartItems.map((item, idx) => {
                                                            return (
                                                                <tr key={idx}>
                                                                    <td>{item.product.name}</td>
                                                                    <td >{item.quantity} {item.product.measurement}</td>
                                                                </tr>
                                                            )
                                                        })
                                                        : null
                                                }
                                            </tbody>

                                        </Table>
                                    </div>



                                </div>
                            ) : null
                        }
                    />

                    {orderSummaryOption && (
                        <Card style={{ margin: "10px 0", }}>
                            <div
                                className="flexRow sb"
                                style={{
                                    display: 'flex',
                                    padding: "20px",
                                    alignItems: "center",
                                    justifyContent: 'space-between'
                                }}
                            >
                                <p style={{ fontSize: "12px", marginBottom: '0px' }}>
                                    Order confirmation email will be sent to{" "}
                                    <strong>{auth.user.email}</strong>
                                </p>

                                <Button
                                    className="btn btn--primary btn--med sign-up-btn"
                                    onClick={userOrderConfirmation}>
                                    Continue
                                </Button>

                            </div>
                        </Card>
                    )}

                    <CheckoutStep
                        stepNumber={"4"}
                        title={"FINALIZE ORDER"}
                        active={finalizeOrderOption}
                        body={
                            finalizeOrderOption && (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        margin: '10px 0px 10px 0px'
                                    }}
                                >
                                    <Button
                                        className="btn btn--primary btn--med sign-up-btn"
                                        onClick={onConfirmOrder}>
                                        Confirm Order
                                    </Button>
                                </div>
                            )
                        }
                    />
                </div>

                <div className="checkout-screen-right">
                    <div className="checkout-screen-info">
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
                                    ? '$' + getCartSubTotal().toFixed(2)
                                    : ''
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    );

};

export default CheckoutScreen;