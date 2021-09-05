import { useEffect, useState } from 'react';

// Components
import EasyOrderSection from '../../components/EasyOrderSection/EasyOrderSection';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts as listProducts } from '../../redux/actions/productActions';


const OrderForm = () => {

    const dispatch = useDispatch();

    const getAllProducts = useSelector((state) => state.getAllProducts);
    const { products, loading, error } = getAllProducts;

    useEffect(() => {
        dispatch(listProducts())
    }, [])

    const renderProducts = () => {
        return (
            <table style={{ width: '80%' }} className='table table-hover table-bordered'>
                {/* <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Stock Status</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead> */}
                <tbody>
                    <EasyOrderSection
                        filterOne={'Milk'}
                        filterTwo={"Cheese"}
                        filterThree={"Eggs"}
                        sectionImg={require('../../img/dairy-eggs-logo.png').default}
                        imageAlt={'dairy-eggs-logo'}
                        products={products}
                        loading={loading}
                        error={error}
                    />
                    <EasyOrderSection
                        filterOne={'Beef'}
                        sectionImg={require('../../img/beef-logo.png').default}
                        imageAlt={'beef-logo'}
                        products={products}
                        loading={loading}
                        error={error}
                    />
                    <EasyOrderSection
                        filterOne={'Pork'}
                        sectionImg={require('../../img/pork-logo.png').default}
                        imageAlt={'pork-logo'}
                        products={products}
                        loading={loading}
                        error={error}
                    />
                    <EasyOrderSection
                        filterOne={'Chicken'}
                        filterTwo={"Turkey"}
                        sectionImg={require('../../img/poultry-logo.png').default}
                        imageAlt={'poultry-logo'}
                        products={products}
                        loading={loading}
                        error={error}
                    />
                    <EasyOrderSection
                        filterOne={'Lamb'}
                        sectionImg={require('../../img/lamb-logo.png').default}
                        imageAlt={'lamb-logo'}
                        products={products}
                        loading={loading}
                        error={error}
                    />
                    <EasyOrderSection
                        filterOne={'Goat'}
                        sectionImg={require('../../img/goat-logo.png').default}
                        imageAlt={'goat-logo'}
                        products={products}
                        loading={loading}
                        error={error}
                    />
                    <EasyOrderSection
                        filterOne={'Raw Honey'}
                        filterTwo={"Creamed Honey"}
                        sectionImg={require('../../img/honey-logo.png').default}
                        imageAlt={'honey-logo'}
                        products={products}
                        loading={loading}
                        error={error}
                    />
                    <EasyOrderSection
                        filterOne={'Packs'}
                        sectionImg={require('../../img/express-packs-logo.png').default}
                        imageAlt={'express-packs-logo'}
                        products={products}
                        loading={loading}
                        error={error}
                    />
                </tbody>
            </table>
        )
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {renderProducts()}
        </div>
    );
};

export default OrderForm;