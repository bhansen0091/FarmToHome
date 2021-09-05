import React from 'react';

// Components
import OrderFormProduct from '../ProductOrderFormCard/OrderFormProduct';

const EasyOrderSection = ({ products, loading, error, sectionImg, imageAlt, filterOne, filterTwo, filterThree }) => {
    return (
        <>
            <tr>
                <td colSpan="5" style={{ maxHeight: '50px', background: '#3E6F38' }}>
                    <img style={{ maxHeight: '50px' }} src={sectionImg} alt={imageAlt} />
                </td>
            </tr>
            {
                products.products
                    ? products.products.map((product, idx) =>
                        product.category.name === filterOne
                            || product.category.name === filterTwo
                            || product.category.name === filterThree
                            ? <tr className="align-middle" key={idx}>
                                <OrderFormProduct
                                    product={product}
                                />
                            </tr>
                            : null
                    )
                    : <tr><td>Failed</td></tr>
            }
        </>
    );
};

export default EasyOrderSection;