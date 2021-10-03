import React from 'react';


import { useEffect, useState } from 'react';
// import './ProductScreen.css';

// Bootstrap Components
import { Container, Col, Row, Table } from 'react-bootstrap';
import { Modal, Form, Button } from 'react-bootstrap';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/actions/product.actions';
// import { getAllCategories } from '../../redux/actions/category.actions';

// Components
import InputDefault from '../../components/UI/Inputs/InputDefault';




const ProductModal = (props) => {
    const { product, show, handleClose, handleSave, handleProductInputs, createCategorySelectOptions } = props

    const categoryState = useSelector(state => state.categoryState);
    const productState = useSelector(state => state.productState);

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSave}>
                    <Form.Group controlId="formProductName">
                        <InputDefault
                            name="name"
                            label="Product Name"
                            type="text"
                            placeholder="Enter Product Name"
                            value={product.name}
                            onChange={handleProductInputs}
                        />
                    </Form.Group>
                    <Form.Group controlId="formParentSelect">
                        <Form.Label>Select Category</Form.Label>
                        <Form.Row>
                            <select
                                className="form-control"
                                name="category"
                                value={product.category}
                                onChange={handleProductInputs}
                            >
                                <option> </option>
                                {
                                    createCategorySelectOptions(categoryState.categoryList).map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group controlId="formProductDesc">
                        <InputDefault
                            name="description"
                            label="Product Description"
                            type="text"
                            placeholder="Enter Product Description"
                            value={product.description}
                            onChange={handleProductInputs}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <InputDefault
                            name="price"
                            label="Product Price"
                            type="number"
                            placeholder="$"
                            value={product.price}
                            onChange={handleProductInputs}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductMeasurement">
                        <InputDefault
                            name="measurement"
                            label="Product Measurement"
                            type="text"
                            placeholder="Enter Product Measurement"
                            value={product.measurement}
                            onChange={handleProductInputs}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductImage">
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control
                            type="file"
                            name="productImage"
                            onChange={handleProductInputs}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductInStock">
                        <Form.Check
                            name="inStock"
                            label="Product In Stock"
                            type="checkbox"
                            value={product.inStock}
                            onChange={handleProductInputs}
                            readOnly
                        />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-center border-top border-bottom py-2">
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="ml-1" variant="primary" type="submit">
                            Save
                        </Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ProductModal;