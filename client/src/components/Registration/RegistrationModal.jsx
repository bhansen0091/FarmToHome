
import React, { useEffect, useState } from 'react';

// Bootstrap Components
import { Container, Col, Row, Form, Button, Modal } from 'react-bootstrap';

// Components
// import Layout from '../../components/Layout/Layout';
import InputDefault from '../../components/UI/Inputs/InputDefault';

// Redux
import { register } from '../../redux/actions/userAuth.actions';
import { useDispatch, useSelector } from 'react-redux';

const RegistrationModal = (props) => {

    const {
        show,
        size,
        onHide,
        handleClose
    } = props;

    // const auth = useSelector(state => state.auth);
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
        setReg(initialReg);
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

    if (regAuth.loading) {
        return <p>Loading...</p>
    }

    return (
        <Modal
            show={show}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Modal.Header >
                <Modal.Title>New User</Modal.Title>
                <Button className="btn btn--primary btn--med sign-up-btn" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row >
                        <Col>
                            <Form onSubmit={handleRegistration}>
                                <Row style={{ marginBottom: '20px' }}>
                                    <Form.Group style={{ display: "flex", justifyContent: "center" }}>
                                        <Form.Text className="text-danger font-weight-bold">
                                            {regError.errorMessage ? regError.errorMessage : ""}
                                        </Form.Text>
                                    </Form.Group>
                                </Row>
                                <Row style={{ marginBottom: '20px' }}>
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicFirst">
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
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formBasicLast">
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
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '20px' }}>
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
                                </Row>

                                <Row style={{ marginBottom: '20px' }}>
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
                                </Row>

                                <Form.Group style={{ display: "flex", justifyContent: "center" }}>
                                    <Button onClick={handleClose} className="btn btn--primary btn--med sign-up-btn" type="submit">
                                        Submit
                                    </Button>

                                </Form.Group>

                            </Form>
                        </Col>
                    </Row>

                </Container>
            </Modal.Body>
        </Modal>
    );
};

export default RegistrationModal;