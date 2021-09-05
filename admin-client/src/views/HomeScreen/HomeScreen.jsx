import React from 'react';

// CSS
import './HomeScreen.css';

// Routing
import { NavLink } from 'react-router-dom';

// Bootstrap Components
import { Container, Col, Row } from 'react-bootstrap';

// Components
import Layout from '../../components/Layout/Layout';

const HomeScreen = () => {
    return (
        <div>
            <Layout sidebar>
                Home
            </Layout>
        </div>
    );
};

export default HomeScreen;