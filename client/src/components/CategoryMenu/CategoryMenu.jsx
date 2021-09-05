import { useEffect } from 'react';

// Routing
import { Link } from 'react-router-dom';

// CSS
import './CategoryMenu.css';

// Redux
import { getAllCategories } from '../../redux/actions/category.actions';
import { useDispatch, useSelector } from 'react-redux';

const CategoryMenu = () => {

    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories())
    }, [])

    // Generare a list of the categories and their children to display on page
    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category._id}>
                    {
                        category.parentId
                            ? <Link className="btn btn--primary btn--med" to={`/category/${category.name}`}>{category.name}</Link>
                            : <span>{category.name}</span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }
        // console.log(myCategories);
        return myCategories;
    }

    return (
        <div className="cat-menu-header">
            <ul>
                {
                    categories.categoryList.length > 0
                        ? renderCategories(categories.categoryList)
                        : null
                }
            </ul>
        </div>
    );
};

export default CategoryMenu;