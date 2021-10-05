import React, { useState, useEffect } from 'react';

// Bootstrap Components
import { Container, Row, Form, Col, Button, Modal } from 'react-bootstrap';

// Components
import InputDefault from '../../components/UI/Inputs/InputDefault';

// Redux
import { login } from '../../redux/actions/userAuth.actions'
import { useSelector, useDispatch } from 'react-redux';

const LoginModal = (props) => {

    const {
        show,
        size,
        onHide,
        handleClose
    } = props;

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const initialLog = {
        email: '',
        password: ''
    }
    const [log, setLog] = useState(initialLog);
    const [logError, setLogError] = useState('');

    const handleLogInputs = (e) => {
        setLog({
            ...log,
            [e.target.name]: e.target.value
        })
    }

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email: log.email,
            password: log.password
        }
        dispatch(login(user))
        setLog(initialLog);

    }

    useEffect(() => {
        if (auth.error) {
            if (auth.error.message) {
                // console.log("auth.error.message");
                // console.log(auth.error);
                // console.log(auth.error.message);
                setLogError({
                    message: auth.error.message
                })
            } else {
                // console.log("auth.error.error");
                // console.log(auth.error);
                // console.log(auth.error.error);
                setLogError({
                    error: auth.error.error
                })
            }
        } else {
            setLogError("")
        }
    }, [auth.error])

    return (
        <Modal
            show={show}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Modal.Header >
                <Modal.Title>Login</Modal.Title>
                <Button className="btn btn--primary btn--med sign-up-btn" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col>
                            <Form >

                                <Form.Group style={{ display: "flex", justifyContent: "center" }}>
                                    <Form.Text className="text-danger font-weight-bold">
                                        {
                                            logError
                                                ? logError.error
                                                    ? logError.error
                                                    : logError.message
                                                : ""
                                        }
                                    </Form.Text>
                                </Form.Group>
                                <Row>
                                    <Form.Group as={Col} controlId="formBasicEmail">
                                        <InputDefault
                                            name="email"
                                            label="Email Address"
                                            type="email"
                                            placeholder="Email Address"
                                            value={log.email}
                                            onChange={handleLogInputs}
                                        />
                                        {/* 
                                        <Form.Text className="text-muted">
                                            {error.email ? error.email.message : ""}
                                        </Form.Text> 
                                    */}
                                    </Form.Group>
                                </Row>
                                <Row style={{marginTop: '10px'}}>
                                    <Form.Group as={Col} controlId="formGridPass">
                                        <InputDefault
                                            name="password"
                                            label="Password"
                                            type="password"
                                            placeholder="Password"
                                            value={log.password}
                                            onChange={handleLogInputs}
                                        />
                                    </Form.Group>
                                </Row>

                                <Form.Group style={{ display: "flex", justifyContent: "center" }}>
                                    <Button style={{ marginTop: '10px' }} onClick={userLogin} className="btn btn--primary btn--med sign-up-btn" type="submit">
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

export default LoginModal;