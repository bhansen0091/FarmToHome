import { Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

// Bootstrap Components
import { Container, Row, Form, Col, Button } from 'react-bootstrap';

// Components
import Layout from '../../components/Layout/Layout';
import InputDefault from '../../components/UI/Inputs/InputDefault';

// Redux
import { register } from '../../redux/actions/adminAuth.actions';
import { useDispatch, useSelector } from 'react-redux';

const RegisterScreen = () => {

    const auth = useSelector(state => state.auth);
    const regAuth = useSelector(state => state.regAuth);
    const dispatch = useDispatch();

    const initialReg = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        contactNumber: "",
        // street1: "",
        // street2: "",
        // city: "",
        // addressState: "",
        // zip: "",
    }
    const [reg, setReg] = useState(initialReg);
    const [regError, setRegError] = useState(initialReg);

    const handleRegInputs = (e) => {
        setReg({
            ...reg,
            [e.target.name]: e.target.value
        })
    }

    const handleRegistration = (e) => {
        e.preventDefault();
        const user = {
            firstName: reg.firstName,
            lastName: reg.lastName,
            email: reg.email,
            password: reg.password,
            confirmPassword: reg.confirmPassword,
            contactNumber: reg.contactNumber,
            // street1: reg.street1,
            // street2: reg.street2,
            // city: reg.city,
            // addressState: reg.addressState,
            // zip: reg.zip
        }
        dispatch(register(user))
    }

    useEffect(() => {
        if (regAuth.error) {
            if (typeof (regAuth.error.error) !== 'string') {
                // console.log(regAuth.error.error);
                // console.log(typeof (regAuth.error.error));
                setRegError({
                    firstName: regAuth.error.error.firstName,
                    lastName: regAuth.error.error.lastName,
                    email: regAuth.error.error.email,
                    password: regAuth.error.error.password,
                    confirmPassword: regAuth.error.error.confirmPassword,
                    contactNumber: regAuth.error.error.contactNumber,
                    // street1: regAuth.error.error.street1,
                    // street2: regAuth.error.error.street2,
                    // city: regAuth.error.error.city,
                    // addressState: regAuth.error.error.addressState,
                    // zip: regAuth.error.error.zip
                })
            } else {
                // console.log(regAuth.error.error);
                // console.log(typeof (regAuth.error.error));
                setRegError({
                    errorMessage: regAuth.error.error
                })
            }

        }
    }, [regAuth])

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    if (regAuth.loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col>
                            <Form onSubmit={handleRegistration}>

                                <Form.Group style={{ display: "flex", justifyContent: "center" }}>
                                    <Form.Text className="text-danger font-weight-bold">
                                        {regError.errorMessage ? regError.errorMessage : ""}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formBasicFirst">
                                        <InputDefault
                                            name="firstName"
                                            label="First Name"
                                            type="text"
                                            placeholder="First Name"
                                            value={reg.firstName}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.firstName ? regError.firstName.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formBasicLast">
                                        <InputDefault
                                            name="lastName"
                                            label="Last Name"
                                            type="text"
                                            placeholder="Last Name"
                                            value={reg.lastName}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.lastName ? regError.lastName.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formBasicEmail">
                                        <InputDefault
                                            name="email"
                                            label="Email Address"
                                            type="email"
                                            placeholder="Email Address"
                                            value={reg.email}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.email ? regError.email.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formBasicContactNum">
                                        <InputDefault
                                            name="contactNumber"
                                            label="Contact Phone Number"
                                            type="text"
                                            placeholder="555-555-5555"
                                            value={reg.contactNumber}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.contactNumber ? regError.contactNumber.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPass">
                                        <InputDefault
                                            name="password"
                                            label="Password"
                                            type="password"
                                            placeholder="Password"
                                            value={reg.password}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.password ? regError.password.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridCPass">
                                        <InputDefault
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={reg.confirmPassword}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.confirmPassword ? regError.confirmPassword.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                </Form.Row>

                                {/* <Form.Group controlId="formGridAddress1">
                                    <InputDefault
                                        name="street1"
                                        label="Address"
                                        type="text"
                                        placeholder="1234 Main St"
                                        value={reg.street1}
                                        onChange={handleRegInputs}
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {regError.street1 ? regError.street1.message : ""}
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formGridAddress2">
                                    <InputDefault
                                        name="street2"
                                        label="Address 2"
                                        type="text"
                                        placeholder="Apartment, studio, or floor"
                                        value={reg.street2}
                                        onChange={handleRegInputs}
                                    />
                                    <Form.Text className="text-danger font-weight-bold">
                                        {regError.street2 ? regError.street2.message : ""}
                                    </Form.Text>
                                </Form.Group>


                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridCity">
                                        <InputDefault
                                            name="city"
                                            label="City"
                                            type="text"
                                            placeholder="City"
                                            value={reg.city}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.city ? regError.city.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridState">
                                        <InputDefault
                                            name="addressState"
                                            label="State"
                                            type="text"
                                            placeholder="State"
                                            value={reg.addressState}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.addressState ? regError.addressState.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridZip">
                                        <InputDefault
                                            name="zip"
                                            label="Zip"
                                            type="text"
                                            placeholder="Zip Code"
                                            value={reg.zip}
                                            onChange={handleRegInputs}
                                        />
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.zip ? regError.zip.message : ""}
                                        </Form.Text>
                                    </Form.Group>
                                </Form.Row> */}

                                <Form.Group style={{ display: "flex", justifyContent: "center" }}>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>

                </Container>
            </Layout>
        </div>
    );
};

export default RegisterScreen;