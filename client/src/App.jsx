import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './custom.scss';
import './App.css';

// Screens
import OurProductsScreen from './views/OurProductsScreen/OurProductsScreen';
import CheckoutScreen from './views/CheckoutScreen/CheckoutScreen';
import ProductScreen from './views/ProductScreen/ProductScreen';
import OrdersScreen from './views/OrdersScreen/OrdersScreen';
import HomeScreen from './views/HomeScreen/HomeScreen';
import CartScreen from './views/CartScreen/CartScreen';
import OrderForm from './views/OrderForm/OrderForm';

// Components
import Navbar from './components/Navbar/NavBar';
import FilteredProductScreen from './views/FilteredProductScreen/FilteredProductScreen';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './redux/actions/userAuth.actions';
import { getCartItems } from './redux/actions/cartActions';


const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (!auth.authenticate) {
      console.log('is user logged in? App');
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    if (auth.authenticate) {
      console.log("Getting Cart Items App");
      dispatch(getCartItems());
    }
  }, [auth.authenticate, cart.updateingCart])

  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/our-products" component={OurProductsScreen} />
            <Route path="/order-form" component={OrderForm} />
            <Route path="/cart" component={CartScreen} />
            <Route path="/checkout" component={CheckoutScreen} />
            <Route path="/account/orders" component={OrdersScreen}/>
            <Route path="/category/:name" component={FilteredProductScreen} />
            <Route path="/product/:id" component={ProductScreen} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
