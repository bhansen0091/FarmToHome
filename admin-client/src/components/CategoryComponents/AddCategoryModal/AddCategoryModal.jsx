
// Components
import CategoryForm from '../../CategoryForm/CategoryForm';

// Bootstrap Components
import { Modal, Form, Button } from 'react-bootstrap';

const AddCategoryModal = (props) => {

    const {
        show,
        size,
        onHide,
        handleInputs,
        category,
        categorySelectOptions,
        handleClose,
        handleCreate
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
                <Modal.Title>Create New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <CategoryForm
                    inputs={category}
                    handleInputChangeName={handleInputs}
                    handleInputChangeParentId={handleInputs}
                    categorySelectOptions={categorySelectOptions}
                />
                <Form.Group className="d-flex justify-content-end border-top border-bottom py-2">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="ml-1" onClick={handleCreate} variant="primary" type="submit">
                        Save
                    </Button>
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
}

export default AddCategoryModal;