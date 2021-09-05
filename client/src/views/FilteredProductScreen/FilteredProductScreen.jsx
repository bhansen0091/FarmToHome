import { useEffect } from 'react';

// Components
import Product from '../../components/ProductCard/ProductCard';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCat } from '../../redux/actions/productActions';


const FilteredProductScreen = (props) => {

    const dispatch = useDispatch();

    const getFilteredProducts = useSelector(state => state.filteredProducts);
    const { products, loading, error } = getFilteredProducts;

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsByCat(match.params.name));
    }, [props.match.params])

    return (
        <>
            <CategoryMenu />
            <div className="our-products-screen">
                <div className="our-products-screen-products show">

                    {
                        loading ? (
                            <h2>Loading...</h2>
                        ) : error ? (
                            <h2>{error}</h2>
                        ) :
                            products.products
                                ? products.products.map((product, idx) =>
                                    <Product key={idx}
                                        productId={product._id}
                                        category={product.category}
                                        name={product.name}
                                        productImage={product.productImage}
                                        price={product.price}
                                        measurement={product.measurement}
                                        description={product.description}
                                        inStock={product.inStock}
                                    />)
                                : <p>something else</p>
                    }

                </div>
            </div>
        </>
    );
};

export default FilteredProductScreen;