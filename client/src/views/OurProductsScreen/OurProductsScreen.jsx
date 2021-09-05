import './OurProductsScreen.css';
import { useEffect } from 'react';

// Components
import Product from '../../components/ProductCard/ProductCard';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import ProductSection from '../../components/ProductSection/ProductSection';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts as listProducts } from '../../redux/actions/productActions';
import { getAllCategories as listCategories } from '../../redux/actions/category.actions';

const OurProductsScreen = () => {

    const dispatch = useDispatch();

    const getAllProducts = useSelector((state) => state.getAllProducts);
    const { products, loading, error } = getAllProducts;

    const getAllCategories = useSelector((state) => state.categories);
    const { categoryList } = getAllCategories;
    // console.log(categoryList);

    useEffect(() => {
        dispatch(listProducts())
        dispatch(listCategories())
    }, [])

    return (
        <>
            <CategoryMenu />
            <div className="our-products-screen">
                <ProductSection
                    filterOne={'Milk'}
                    filterTwo={"Cheese"}
                    filterThree={"Eggs"}
                    sectionImg={require('../../img/dairy-eggs-logo.png').default}
                    imageAlt={'dairy-eggs-logo'}
                    products={products}
                    loading={loading}
                    error={error}
                />
                <ProductSection
                    filterOne={'Beef'}
                    sectionImg={require('../../img/beef-logo.png').default}
                    imageAlt={'beef-logo'}
                    products={products}
                    loading={loading}
                    error={error}
                />
                <ProductSection
                    filterOne={'Pork'}
                    sectionImg={require('../../img/pork-logo.png').default}
                    imageAlt={'pork-logo'}
                    products={products}
                    loading={loading}
                    error={error}
                />
                <ProductSection
                    filterOne={'Chicken'}
                    filterTwo={"Turkey"}
                    sectionImg={require('../../img/poultry-logo.png').default}
                    imageAlt={'poultry-logo'}
                    products={products}
                    loading={loading}
                    error={error}
                />
                <ProductSection
                    filterOne={'Lamb'}
                    sectionImg={require('../../img/lamb-logo.png').default}
                    imageAlt={'lamb-logo'}
                    products={products}
                    loading={loading}
                    error={error}
                />
                <ProductSection
                    filterOne={'Goat'}
                    sectionImg={require('../../img/goat-logo.png').default}
                    imageAlt={'goat-logo'}
                    products={products}
                    loading={loading}
                    error={error}
                />
                <ProductSection
                    filterOne={'Raw Honey'}
                    filterTwo={"Creamed Honey"}
                    sectionImg={require('../../img/honey-logo.png').default}
                    imageAlt={'honey-logo'}
                    products={products}
                    loading={loading}
                    error={error}
                />
                <ProductSection
                    filterOne={'Packs'}
                    sectionImg={require('../../img/express-packs-logo.png').default}
                    imageAlt={'express-packs-logo'}
                    products={products}
                    loading={loading}
                    error={error}
                />

            </div>
        </>
    )
}
export default OurProductsScreen;



{/* <div>
                    <img src={require('../../img/beef-logo.png').default} alt="beef-logo" />
                </div>
                <div className="our-products-screen-products">
                    {
                        loading ? (
                            <h2>Loading...</h2>
                        ) : error ? (
                            <h2>{error}</h2>
                        ) :
                            products.products
                                ? products.products.map((product, idx) =>
                                    product.category.name == "Beef"
                                        ? <Product key={idx}
                                            productId={product._id}
                                            category={product.category._id}
                                            name={product.name}
                                            productImage={product.productImage}
                                            price={product.price}
                                            measurement={product.measurement}
                                            description={product.description}
                                            inStock={product.inStock}
                                        />
                                        : null
                                )
                                : null
                    }

                </div> */}






// const testCatList = (categories) => {
    //     let newCatList = [];
    //     let subCats = [];
    //     for (const category of categories) {
    //         newCatList.push(
    //             category._id
    //         )
    //         if (category.children.length > 0) {
    //             subCats.push(
    //                 testCatList(category.children)
    //             )
    //         }
    //     }
    //     for (const arr of subCats) {
    //         for (const catId of arr) {
    //             newCatList.push(
    //                 catId
    //             )
    //         }
    //     }
        // console.log(subCats);
    //     return newCatList;
    // }

    // const catList = testCatList(categoryList);
    // console.log(catList[17]);

    // const workPlease = (catList, products) => {
    //     const output = [];
    //     for (const categoryId of catList) {
    //         products.map((product, idx) => {
    //             if (product.category === categoryId) {
    //                 output.push(
    //                     <>
    //                         <Product key={idx}
    //                             productId={product._id}
    //                             category={product.category}
    //                             name={product.name}
    //                             productImage={product.productImage}
    //                             price={product.price}
    //                             measurement={product.measurement}
    //                             description={product.description}
    //                             inStock={product.inStock}
    //                         />
    //                     </>
    //                 )
    //             }
    //         })
    //     }
    //     return output;
    // }
