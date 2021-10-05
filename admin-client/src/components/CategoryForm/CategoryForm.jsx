import React from 'react';

// Bootstrap Components
import { Col, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

// Components
import InputDefault from '../../components/UI/Inputs/InputDefault';

const CategoryForm = ({ inputs, handleInputChangeName, handleInputChangeParentId, categorySelectOptions }) => {
    return (
        <Form >
            <Row>
                <Col>
                    <Form.Group controlId="formCategoryName">
                        <InputDefault
                            name="name"
                            label="Category Name"
                            type="text"
                            placeholder="Enter Category Name"
                            value={inputs.name}
                            onChange={handleInputChangeName}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formParentSelect">
                        <Form.Label>Select Parent Category</Form.Label>
                        <Form.Row>
                            <select
                                className="form-control"
                                name="parentId"
                                value={inputs.parentId}
                                onChange={handleInputChangeParentId}
                            >
                                <option> </option>
                                {
                                    categorySelectOptions.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>
                                    )
                                }
                            </select>
                        </Form.Row>
                    </Form.Group>
                </Col>
            </Row>



        </Form>
    );
};

export default CategoryForm;