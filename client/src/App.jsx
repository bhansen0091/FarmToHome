import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

// Screens
import OurProductsScreen from './views/OurProductsScreen/OurProductsScreen';
import RegisterScreen from './views/RegisterScreen/RegisterScreen';
import ProductScreen from './views/ProductScreen/ProductScreen';
import LoginScreen from './views/LoginScreen/LoginScreen';
import HomeScreen from './views/HomeScreen/HomeScreen';
import CartScreen from './views/CartScreen/CartScreen';
import OrderForm from './views/OrderForm/OrderForm';

// Components
import Navbar from './components/Navbar/NavBar';
import FilteredProductScreen from './views/FilteredProductScreen/FilteredProductScreen';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './redux/actions/userAuth.actions';


const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/our-products" component={OurProductsScreen} />
            <Route exact path="/order-form" component={OrderForm} />
            <Route exact path="/cart" component={CartScreen} />
            <Route path="/category/:name" component={FilteredProductScreen} />
            <Route path="/product/:id" component={ProductScreen} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
