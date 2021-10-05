import './OurProductsScreen.css';
import { useEffect } from 'react';

// Components
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

    // const getAllCategories = useSelector((state) => state.categories);
    // const { categoryList } = getAllCategories;
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
