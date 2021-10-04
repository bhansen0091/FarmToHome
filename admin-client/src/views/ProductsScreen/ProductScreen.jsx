import { useEffect, useState } from 'react';
import './ProductScreen.css';

// Bootstrap Components
import { Container, Col, Row, Table } from 'react-bootstrap';
import { Modal, Form, Button } from 'react-bootstrap';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/actions/product.actions';
// import { getAllCategories } from '../../redux/actions/category.actions';
import { getInitialData } from '../../redux/actions/initialData.actions';

// Components
import InputDefault from '../../components/UI/Inputs/InputDefault';
import Layout from '../../components/Layout/Layout';
// import ProductModal from '../../components/ProductModal/ProductModal';


const ProductScreen = (props) => {

    const categoryState = useSelector(state => state.categoryState);
    const productState = useSelector(state => state.productState);
    const dispatch = useDispatch();

    const [product, setProduct] = useState({
        _id: '',
        category: '',
        name: '',
        description: '',
        price: '',
        measurement: '',
        productImage: '',
        inStock: false
    })

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Add Product Modal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setProduct({
            _id: '',
            category: '',
            name: '',
            description: '',
            price: '',
            measurement: '',
            productImage: null,
            inStock: false
        })
        setShow(false)
    };
    const handleShow = () => setShow(true);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  Form Stuff ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    // Check the input type and assign the values as needed
    const handleProductInputs = (e) => {
        // If the type is a checkbox, set it to the opposite of the initial product state (false)
        if (e.target.type === "checkbox") {
            setProduct({
                ...product,
                [e.target.name]: !product[e.target.name]
            })
            // If the type is a file set productImage to the file being uploaded
        } else if (e.target.type === "file") {
            setProduct({
                ...product,
                productImage: e.target.files[0]
            })
            // Handle all other input fields
        } else {
            setProduct({
                ...product,
                [e.target.name]: e.target.value
            })
        }
    }

    // Generate the list for the input type select options 
    const createCategorySelectOptions = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategorySelectOptions(category.children, options);
            }
        }
        return options;
    }

    // Handle form submission and reset product state back to initial values
    const handleSave = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("category", product.category);
        form.append("name", product.name);
        form.append("description", product.description);
        form.append("price", product.price);
        form.append("measurement", product.measurement);
        form.append("productImage", product.productImage);
        form.append("inStock", product.inStock);
        console.log(form);
        dispatch(addProduct(form));
        setShow(false);
        setProduct({
            _id: '',
            category: '',
            name: '',
            description: '',
            price: '',
            measurement: '',
            productImage: '',
            inStock: false
        })
        dispatch(getInitialData())
    }

    const renderAddProductModal = () => {
        return (

            // <ProductModal
            //     product={product}
            //     show={show}
            //     handleClose={handleClose}
            //     handleSave={handleSave}
            //     handleProductInputs={handleProductInputs}
            //     createCategorySelectOptions={createCategorySelectOptions}
            // />

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
        )
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ End Add Product Modal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Show on page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // Display product list
    const renderProducts = () => {
        return <Table striped responsive="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Category</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>In Stock</th>
                </tr>
            </thead>
            <tbody style={{ fontSize: "12px" }}>
                {
                    productState.products.length > 0
                        ? productState.products.map((p, idx) => {
                            return (
                                <tr onClick={() => handleShowProductModal(p)} key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{p.category.name}</td>
                                    <td>{p.name}</td>
                                    <td>${p.price.toFixed(2)} / {p.measurement}</td>
                                    <td>{p.inStock ? "In Stock" : "Out of Stock"}</td>
                                </tr>)
                        })
                        : null
                }
            </tbody>
        </Table>
    }
    useEffect(() => {
        // dispatch(getAllProducts())
        dispatch(getInitialData())
    }, [show])
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ End Show on page ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Product Details Modal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const [productModal, setProductModal] = useState(false);
    const [productDetails, setProductDetails] = useState({});

    const handleShowProductModal = (product) => {
        setProductModal(true);
        setProductDetails(product);

    };

    const handleCloseShowProductModal = () => {
        setProductModal(false);
    }

    const renderProductDetailsModal = () => {

        if (!productDetails) {
            return null;
        }

        const { REACT_APP_HOST } = process.env

        return (
            <Modal
                show={productModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleCloseShowProductModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{productDetails.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="border-bottom">
                        <Col>
                            <label className="key">Category</label>
                            <p className="value">{productDetails.category ? productDetails.category.name : null}</p>
                        </Col>
                    </Row>
                    <Row className="border-bottom pt-3">
                        <Col>
                            <label className="key">Price</label>
                            <p className="value">${productDetails.price ? productDetails.price.toFixed(2) : productDetails.price} / {productDetails.measurement}</p>
                        </Col>
                        <Col>
                            <label className="key">Availability</label>
                            <p className="value">{productDetails.inStock ? "In Stock" : "Out of Stock"}</p>
                        </Col>
                    </Row>
                    <Row className="border-bottom pt-3">
                        <Col>
                            <label className="key">Description</label>
                            <p className="value">{productDetails.description}</p>
                        </Col>
                    </Row>
                    <Row className="border-bottom pt-3">
                        <Col>
                            <label className="key">Product Image</label>
                            <div className="productImageContainer">
                                <img src={`${REACT_APP_HOST}${productDetails.productImage}`} alt={productDetails.name} />
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        )
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ End Product Details Modal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


    return (
        <Layout sidebar>
            <Container fluid>
                <Row sticky="top" className="my-2">
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                            <h3>Products</h3>
                            <Button variant="primary" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderProducts()}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                            <Button style={{}} variant="primary" onClick={handleShow}>
                                Add
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Add Product Modal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  */}
            {renderAddProductModal()}
            {renderProductDetailsModal()}

        </Layout >
    );
};

export default ProductScreen;