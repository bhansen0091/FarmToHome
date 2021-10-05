import { useState } from 'react';

// CSS
import './ProductSection.css';

// Components
import Product from '../ProductCard/ProductCard';

const ProductSection = ({ products, loading, error, sectionImg, imageAlt, filterOne, filterTwo, filterThree }) => {

    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    return (
        <div className="product-section">
            <div className="sectionImg">
                <img onClick={handleShow} src={sectionImg} alt={imageAlt} />
            </div>
            <div className={show ? "our-products-screen-products show" : "our-products-screen-products"}>
                {
                    loading ? (
                        <h2>Loading...</h2>
                    ) : error ? (
                        <h2>{error}</h2>
                    ) :
                        products.products
                            ? products.products.map((product, idx) =>
                                product.category.name === filterOne
                                    || product.category.name === filterTwo
                                    || product.category.name === filterThree
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

            </div>
        </div>
    );
};

export default ProductSection;