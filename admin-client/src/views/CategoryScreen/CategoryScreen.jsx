import CheckboxTree from 'react-checkbox-tree';
import { useState } from 'react';

// CSS
import './CategoryScreen.css';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

// Bootstrap Components
import { Container, Col, Row } from 'react-bootstrap';

// Redux
import {
    addCategory,
    updateMultipleCategories,
    deleteCategories as deleteCategoriesAction
} from '../../redux/actions/category.actions';
import { useDispatch, useSelector } from 'react-redux';

// Components
import Layout from '../../components/Layout/Layout';
import EditCategoryModal from '../../components/CategoryComponents/EditCategoryModal/EditCategoryModal';
import AddCategoryModal from '../../components/CategoryComponents/AddCategoryModal/AddCategoryModal';
import DeleteCategoryModal from '../../components/CategoryComponents/DeleteCategoryModal/DeleteCategoryModal';
// import InputDefault from '../../components/UI/Inputs/InputDefault';
// import CategoryForm from '../../components/CategoryForm/CategoryForm';

const CategoryScreen = () => {

    const categoryState = useSelector(state => state.categoryState);
    const dispatch = useDispatch();

    const [category, setCategory] = useState({
        _id: '',
        name: '',
        parentId: ''
    })

    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Modals ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Modal States ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    // Create Category Modal 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Edit Category Modal
    const [showUpdateModal, setUpdateUpdateModal] = useState(false);
    const handleShowUpdateModal = () => {
        updateCheckedAndExpandedArray();
        setUpdateUpdateModal(true);
    }
    const handleCloseUpdateModal = () => setUpdateUpdateModal(false);

    // Delete Category Warning Modal
    const [deleteWarningModal, setDeleteWarningModal] = useState(false);
    const handleShowDeleteWarning = () => {
        updateCheckedAndExpandedArray();
        setDeleteWarningModal(true);
    }
    const handleCloseDeleteWarning = () => setDeleteWarningModal(false);

    // Checked & Expanded Arrays used for edit and delete
    const updateCheckedAndExpandedArray = () => {
        const categories = generateCategoryList(categoryState.categoryList);
        const checkedArr = [];
        const expandedArr = [];

        checked.length > 0 && checked.forEach((categoryId, idx) => {
            const category = categories.find((category, _idx) => categoryId === category.value);
            category && checkedArr.push(category);
        });
        expanded.length > 0 && expanded.forEach((categoryId, idx) => {
            const category = categories.find((category, _idx) => categoryId === category.value);
            category && expandedArr.push(category);
        });

        setCheckedArray(checkedArr);
        setExpandedArray(expandedArr);
    }

    // Generate the list for the select input options 
    const createCategorySelectOptions = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name })
            if (category.children.length > 0) {
                createCategorySelectOptions(category.children, options);
            }
        }
        return options;
    }

    // Handle category creation and reset category state back to initial state
    const handleCreate = (e) => {
        e.preventDefault();
        const cate = {
            name: category.name,
            parentId: category.parentId
        }

        if (cate.name === null || cate.name === '') {
            alert('Category Name is required.')
        } else {
            dispatch(addCategory(cate));
            setCategory({
                _id: '',
                name: '',
                parentId: ''
            })
            setShow(false);
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Edit Category Modal ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    // Generate an inline list of all categories
    const generateCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name, parentId: category.parentId })
            if (category.children.length > 0) {
                generateCategoryList(category.children, options);
            }
        }
        return options;
    }

    // Handle Inputs

    const handleCategoryInputs = (e) => {
        e.preventDefault();
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const handleEditCategoryInputs = (key, value, index, type) => {
        if (type === 'checked') {
            const updatedCheckedArray = checkedArray.map((item, idx) => index === idx ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type === 'expanded') {
            const updatedExpandedArray = expandedArray.map((item, idx) => index === idx ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const cate = {
            _id: [],
            name: [],
            parentId: []
        }
        expandedArray.forEach((item, index) => {
            cate._id.push(item.value);
            cate.name.push(item.name);
            cate.parentId.push(item.parentId ? item.parentId : "");
        });
        checkedArray.forEach((item, index) => {
            cate._id.push(item.value);
            cate.name.push(item.name);
            cate.parentId.push(item.parentId ? item.parentId : "");
        });
        dispatch(updateMultipleCategories(cate));
        handleCloseUpdateModal();
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Delete Categories ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    const deleteCategories = () => {
        const checkedIdArray = checkedArray.map((item, idx) => ({ _id: item.value }));
        // const expandedIdArray = expandedArray.map((item, idx) => ({ _id: item.value }));
        // const idArray = expandedIdArray.concat(checkedIdArray);

        if (checkedIdArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdArray))
                // .then(res => {
                //     if (res) {
                //         dispatch(getAllCategories());
                //     }
                // })
        }

        setDeleteWarningModal(false);
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Render On Screen ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    // Generate a list of the categories and their children to display on page
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return myCategories;
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Component Return ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
    return (
        <Layout sidebar>
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Categories</h3>
                            <div className='actionBtnContainer'>
                                <button className='btn btn-dark' onClick={handleShow}>
                                    <span className='fas fa-plus'></span>
                                    <span>Add New Category</span>
                                </button>
                                <button className='btn btn-dark' onClick={handleShowUpdateModal}>
                                    <i className="fas fa-edit" />
                                    <span>Edit</span>
                                </button>
                                <button className='btn btn-danger' onClick={handleShowDeleteWarning}>
                                    <i className="fas fa-trash-alt" />
                                    <span>Delete</span>
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(categoryState.categoryList)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <span className='fas fa-check-square' />,
                                uncheck: <span className='far fa-square' />,
                                halfCheck: <span className='far fa-check-square' />,
                                expandClose: <span className='fas fa-angle-double-right' />,
                                expandOpen: <span className='fas fa-chevron-down' />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    {/* <Col>
                        <div className="d-flex justify-content-between">
                            <Button variant="primary" className="m-2" onClick={handleShowUpdateModal}>
                                Edit
                            </Button>
                            <Button className="m-2" variant="danger" onClick={handleShowDeleteWarning}>
                                Delete
                            </Button>
                        </div>
                    </Col> */}
                </Row>
            </Container>

            {/* Render Modals */}

            <AddCategoryModal
                show={show}
                size={'lg'}
                onHide={handleClose}
                handleInputs={handleCategoryInputs}
                category={category}
                categorySelectOptions={createCategorySelectOptions(categoryState.categoryList)}
                handleClose={handleClose}
                handleCreate={handleCreate}
            />

            <EditCategoryModal
                show={showUpdateModal}
                size={'lg'}
                onHide={handleCloseUpdateModal}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                categorySelectOptions={createCategorySelectOptions(categoryState.categoryList)}
                handleEditCategoryInputs={handleEditCategoryInputs}
                handleClose={handleCloseUpdateModal}
                handleUpdate={handleUpdate}
            />

            <DeleteCategoryModal
                show={deleteWarningModal}
                onHide={handleCloseDeleteWarning}
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                deleteCategories={deleteCategories}
                handleClose={handleCloseDeleteWarning}
            />

            {/* End Render Modals */}

        </Layout >
    );
};

export default CategoryScreen;
