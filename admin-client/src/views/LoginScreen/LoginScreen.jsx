import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

// Bootstrap Components
import { Container, Row, Form, Col, Button } from 'react-bootstrap';

// Components
// import InputBasic from '../../components/UI/Inputs/InputBasic';
import InputDefault from '../../components/UI/Inputs/InputDefault';
import Layout from '../../components/Layout/Layout';

// Redux
import { login } from '../../redux/actions/adminAuth.actions'
import { useSelector, useDispatch } from 'react-redux';

const LoginScreen = () => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

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
        dispatch(login(user));
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
        }
    }, [auth])

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    return (
        <div>
            <Layout>
                <Container>
                    <Row style={{ marginTop: '50px' }}>
                        <Col md={{ span: 8, offset: 2 }}>
                            <Form onSubmit={userLogin}>

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

                                <Form.Group as={Col} controlId="formBasicEmail">
                                    <InputDefault
                                        name="email"
                                        label="Email Address"
                                        type="email"
                                        placeholder="Email Address"
                                        value={log.email}
                                        onChange={handleLogInputs}
                                    />
                                    {/* <Form.Text className="text-muted">
                                        {error.email ? error.email.message : ""}
                                    </Form.Text> */}
                                </Form.Group>

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

export default LoginScreen;