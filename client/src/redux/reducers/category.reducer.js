import * as actionTypes from '../constants/category.constants';

const initialState = {
    categoryList: [],
    loading: false,
    error: null
};

// const buildNewCategoryList = (parentId, categoryList, category) => {
//     const newCategoryList = [];

//     if (parentId === undefined) {
//         return [
//             ...categoryList,
//             {
//                 _id: category._id,
//                 name: category.name,
//                 children: []
//             }
//         ]
//     }

//     for (const cat of categoryList) {

//         if (cat._id == parentId) {
//             newCategoryList.push({
//                 ...cat,
//                 children: cat.children ? buildNewCategoryList(parentId, [
//                     ...cat.children,
//                     {
//                         _id: category._id,
//                         name: category.name,
//                         parentId: category.parentId,
//                         children: category.children
//                     }], category) : []
//             })
//         } else {
//             newCategoryList.push({
//                 ...cat,
//                 children: cat.children ? buildNewCategoryList(cat.parentId, cat.children, category) : []
//             })
//         }
//     }
//     return newCategoryList;
// }

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case actionTypes.GET_ALL_CATEGORIES_SUCCESS:
            // console.log(action.payload);
            state = {
                ...state,
                categoryList: action.payload.categoryList,
                loading: false
            }
            break;
    }
    return state
}
