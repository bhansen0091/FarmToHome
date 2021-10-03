import React from 'react';

// Routing
import { NavLink } from 'react-router-dom';

// CSS
import './Layout.css';

// Bootstrap Components
import { Container, Row, Col } from 'react-bootstrap';

// Components
import NavBar from '../Navbar/NavBar';

const Layout = (props) => {
    return (
        <>
            <NavBar />
            {
                props.sidebar
                    ? <Container fluid>
                        <Row>
                            <Col md={2} className="sidebar pt-2">

                                <ul className="sidebar-nav-list">
                                    <li className="sidebar-links"><NavLink exact to={`/`}>Home</NavLink></li>
                                    <li className="sidebar-links"><NavLink to={`/categories`}>Categories</NavLink></li>
                                    <li className="sidebar-links"><NavLink to={`/products`}>Products</NavLink></li>
                                    <li className="sidebar-links"><NavLink to={`/current-orders`}>Current Orders</NavLink></li>
                                    <li className="sidebar-links"><NavLink to={`/complete-orders`}>Complete Orders</NavLink></li>
                                </ul>
                            </Col>
                            <Col md={10} className="main-container pt-2">
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                    : props.children
            }
        </>
    );
};

export default Layout;