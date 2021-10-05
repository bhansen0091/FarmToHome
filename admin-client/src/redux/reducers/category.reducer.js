import * as actionTypes from '../constants/adminConstants';

const initialState = {
    categoryList: [],
    loading: false,
    error: null
};

const buildNewCategoryList = (parentId, categoryList, category) => {
    const newCategoryList = [];

    if (parentId === undefined) {
        return [
            ...categoryList,
            {
                _id: category._id,
                name: category.name,
                children: []
            }
        ]
    }

    for (const cat of categoryList) {

        if (cat._id === parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                parentId: category.parentId,
                children: []
            }
            newCategoryList.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        } else {
            newCategoryList.push({
                ...cat,
                children: cat.children ? buildNewCategoryList(parentId, cat.children, category) : []
            })
        }
    }
    // console.log(newCategoryList);
    return newCategoryList;
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case actionTypes.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categoryList: action.payload.categoryList,
                loading: false
            }
            break;
        case actionTypes.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case actionTypes.ADD_NEW_CATEGORY_SUCCESS:

            const category = action.payload.category;
            const updatedCats = buildNewCategoryList(category.parentId, state.categoryList, category);
            console.log(updatedCats);

            state = {
                ...state,
                categoryList: updatedCats,
                loading: false
            }
            break;
        case actionTypes.ADD_NEW_CATEGORY_FAIL:
            state = {
                ...state,
                error: action.payload
            }
            break;
        case actionTypes.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case actionTypes.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case actionTypes.UPDATE_CATEGORIES_FAIL:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case actionTypes.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case actionTypes.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case actionTypes.DELETE_CATEGORIES_FAIL:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }

    }
    return state
}
