
// Components
import CategoryForm from '../../CategoryForm/CategoryForm';

// Bootstrap Components
import { Modal, Form, Button } from 'react-bootstrap';

const DeleteCategoryModal = (props) => {

    const {
        show,
        onHide,
        expandedArray,
        checkedArray,
        deleteCategories,
        handleClose
    } = props;

    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion(s)</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                {/* <h5>Expanded</h5>
                {
                    expandedArray.map((item, idx) => <p key={idx}>{item.name}</p>)
                } */}
                {/* <h5>Checked</h5> */}
                {
                    checkedArray <= 0 
                    ? <p className='text-center'>Nothing Selected</p>
                    : checkedArray.map((item, idx) => <p key={idx}>{item.name}</p>)
                    
                }

                <Form.Group className="d-flex justify-content-center border-top border-bottom py-2">
                    <Button variant="danger" onClick={deleteCategories} type="submit">
                        Confirm Deletion
                    </Button>
                    <Button className="ml-1" onClick={handleClose} variant="warning" >
                        Cancel
                    </Button>
                </Form.Group>
            </Modal.Body>
        </Modal>
    );
}

export default DeleteCategoryModal;