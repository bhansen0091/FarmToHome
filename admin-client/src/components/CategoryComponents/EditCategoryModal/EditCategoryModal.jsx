
// Components
import CategoryForm from '../../CategoryForm/CategoryForm';

// Bootstrap Components
import { Modal, Form, Button, Row } from 'react-bootstrap';


const EditCategoryModal = (props) => {

    const {
        show,
        size,
        onHide,
        expandedArray,
        checkedArray,
        categorySelectOptions,
        handleEditCategoryInputs,
        handleClose,
        handleUpdate
    } = props;

    return (
        <Modal
            show={show}
            size={size}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Display expanded section if any are expanded */}
                {
                    expandedArray.length > 0
                        ? <Row>
                            <h5 style={{ paddingLeft: '20px' }}>Expanded</h5>
                        </Row>
                        : <p className='text-center'>Nothing Selected</p>
                }
                {
                    expandedArray.length > 0 &&
                    expandedArray.map((expandedItem, idx) =>
                        <CategoryForm
                            key={idx}
                            inputs={expandedItem}
                            handleInputChangeName={(e) => handleEditCategoryInputs('name', e.target.value, idx, 'expanded')}
                            handleInputChangeParentId={(e) => handleEditCategoryInputs('parentId', e.target.value, idx, 'expanded')}
                            categorySelectOptions={categorySelectOptions}
                        />
                    )
                }
                {/* Display checked section if any are checked */}
                {
                    checkedArray.length > 0
                        ? <Row>
                            <h5 style={{ paddingLeft: '20px' }}>Checked</h5>
                        </Row>
                        : null
                }
                {
                    checkedArray.length > 0 &&
                    checkedArray.map((checkedItem, idx) =>
                        <CategoryForm
                            key={idx}
                            inputs={checkedItem}
                            handleInputChangeName={(e) => handleEditCategoryInputs('name', e.target.value, idx, 'checked')}
                            handleInputChangeParentId={(e) => handleEditCategoryInputs('parentId', e.target.value, idx, 'checked')}
                            categorySelectOptions={categorySelectOptions}
                        />
                    )
                }
                <Form.Group className="d-flex justify-content-end border-top border-bottom py-2">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="ml-1" onClick={handleUpdate} variant="primary" type="submit">
                        Save
                    </Button>
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
}

export default EditCategoryModal;