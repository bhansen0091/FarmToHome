import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/Button/Button';
import InputDefault from '../../components/UI/Inputs/InputDefault';
import { addAddress, getAddress } from '../../redux/actions/userAuth.actions';

const AddressForm = (props) => {

    const { initialData } = props;

    const initialAddress = {
        name: '',
        mobileNumber: '',
        zipCode: '',
        streetOne: '',
        streetTwo: '',
        city: '',
        state: '',
        alternatePhone: '',
        addressType: '',
    }

    const [address, setAddress] = useState(initialData ? initialData : initialAddress);
    const [addressError, setAddressError] = useState(initialAddress);


    const dispatch = useDispatch();
    const user = useSelector((state) => state.userDetails);
    const [submitFlag, setSubmitFlag] = useState(false);
    const [id, setId] = useState(initialData ? initialData._id : '');

    useEffect(() => {
        if (user.error) {
            // console.log(user.error);
            setAddressError({
                name: user.error.name,
                mobileNumber: user.error.mobileNumber,
                zipCode: user.error.zipCode,
                streetOne: user.error.streetOne,
                streetTwo: user.error.streetTwo,
                city: user.error.city,
                state: user.error.state,
                alternatePhone: user.error.alternatePhone,
                addressType: user.error.addressType,
            })
            // console.log('user.error', user.error);
        }
    }, [user.error])

    const handleInputs = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
        // console.log(address);
    }

    const onAddressSubmit = (e) => {
        e.preventDefault();
        const payload = {
            address: {
                name: address.name,
                mobileNumber: address.mobileNumber,
                zipCode: address.zipCode,
                streetOne: address.streetOne,
                streetTwo: address.streetTwo,
                city: address.city,
                state: address.state,
                alternatePhone: address.alternatePhone,
                addressType: address.addressType,
            },
        };
        // console.log('onAddressSubmit:', payload);
        if (id) {
            payload.address._id = id;
        }
        dispatch(addAddress(payload));
        dispatch(getAddress())
        if (user.error === '') {
            setSubmitFlag(true)
        } else {
            setSubmitFlag(false)
        }
    };

    useEffect(() => {
        // console.log("addressCount", user.address);
        if (submitFlag === true) {
            // console.log("where are we", user);
            let _address = {};
            if (id) {
                _address = {
                    _id: id,
                    name: address.name,
                    mobileNumber: address.mobileNumber,
                    zipCode: address.zipCode,
                    streetOne: address.streetOne,
                    streetTwo: address.streetTwo,
                    city: address.city,
                    state: address.state,
                    alternatePhone: address.alternatePhone,
                    addressType: address.addressType,
                };
            } else {
                _address = user.address.slice(user.address.length - 1)[0];
            }

            props.onSubmitForm(_address);
        }
    }, [user.address]);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={onAddressSubmit}>
                            <Row style={{ marginBottom: '20px' }}>
                                <Form.Group style={{ display: "flex", justifyContent: "center" }}>
                                    {/* <Form.Text className="text-danger font-weight-bold">
                                            {regError.errorMessage ? regError.errorMessage : ""}
                                        </Form.Text> */}
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: '20px' }}>
                                <Col md={6}>
                                    <Form.Group controlId="formBasicFirst">
                                        <InputDefault
                                            name="name"
                                            label="Deliver To:"
                                            type="text"
                                            placeholder="Name"
                                            value={address.name}
                                            onChange={handleInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {
                                                addressError.name
                                                    ? addressError.name.message
                                                    : ""
                                            }
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                                <Form.Group as={Col} controlId="formBasicContactNum">
                                    <InputDefault
                                        name="mobileNumber"
                                        label="Contact Phone Number"
                                        type="text"
                                        placeholder="555-555-5555"
                                        value={address.mobileNumber}
                                        onChange={handleInputs}
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {
                                            addressError.mobileNumber
                                                ? addressError.mobileNumber.message
                                                : ""
                                        }
                                    </Form.Text>
                                </Form.Group>
                            </Row>

                            <Row style={{ marginBottom: '20px' }}>
                                <Form.Group controlId="formGridAddress1">
                                    <InputDefault
                                        name="streetOne"
                                        label="Address"
                                        type="text"
                                        placeholder="1234 Main St"
                                        value={address.streetOne}
                                        onChange={handleInputs}
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {
                                            addressError.streetOne
                                                ? addressError.streetOne.message
                                                : ""
                                        }
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: '20px' }}>
                                <Form.Group controlId="formGridAddress2">
                                    <InputDefault
                                        name="streetTwo"
                                        label="Address 2"
                                        type="text"
                                        placeholder="Apartment, studio, or floor"
                                        value={address.streetTwo}
                                        onChange={handleInputs}
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {
                                            addressError.streetTwo
                                                ? addressError.streetTwo.message
                                                : ""
                                        }
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row style={{ marginBottom: '20px' }}>
                                <Form.Group as={Col} controlId="formGridCity">
                                    <InputDefault
                                        name="city"
                                        label="City"
                                        type="text"
                                        placeholder="City"
                                        value={address.city}
                                        onChange={handleInputs}
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {
                                            addressError.city
                                                ? addressError.city.message
                                                : ""
                                        }
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <InputDefault
                                        name="state"
                                        label="State"
                                        type="text"
                                        placeholder="State"
                                        value={address.state}
                                        onChange={handleInputs}
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {
                                            addressError.state
                                                ? addressError.state.message
                                                : ""
                                        }
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridZip">
                                    <InputDefault
                                        name="zipCode"
                                        label="Zip"
                                        type="text"
                                        placeholder="Zip Code"
                                        value={address.zipCode}
                                        onChange={handleInputs}
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {
                                            addressError.zipCode
                                                ? addressError.zipCode.message
                                                : ""
                                        }
                                    </Form.Text>
                                </Form.Group>
                            </Row>
                            <Row style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', margin: '0 0 10px 0' }}>

                                <Form.Group
                                    className='col-5'
                                    controlId="formGridAddressType"

                                >
                                    <Form.Check
                                        inline
                                        label="Home"
                                        name="addressType"
                                        type="radio"
                                        value='Home'
                                        defaultChecked={address.addressType === 'Home' ? true : false}
                                        onChange={(e) => setAddress({ ...address, addressType: e.target.value })}
                                        readOnly
                                    />
                                    <Form.Check
                                        inline
                                        label="Business"
                                        name="addressType"
                                        type="radio"
                                        value='Business'
                                        defaultChecked={address.addressType === 'Business' ? true : false}
                                        onChange={(e) => setAddress({ ...address, addressType: e.target.value })}
                                        // onChange={handleInputs}
                                        readOnly
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {
                                            addressError.addressType
                                                ? addressError.addressType.message
                                                : ""
                                        }
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className='col-6' style={{ display: "flex", justifyContent: "end" }}>
                                    <Button
                                        onClick={onAddressSubmit}
                                        className="btn btn--primary btn--sm sign-up-btn" type="submit"
                                    >
                                        Save Address
                                    </Button>
                                </Form.Group>
                            </Row>

                        </Form>
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default AddressForm;