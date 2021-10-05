import React, { useEffect } from 'react';
import './App.css';

// Routing
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './HOC/PrivateRoute';

// Components
import CurrentOrdersScreen from './views/CurrentOrdersScreen/CurrentOrdersScreen';
import CompleteOrdersScreen from './views/CompleteOrders/CompleteOrders';
import RegisterScreen from './views/RegisterScreen/RegisterScreen';
import CategoryScreen from './views/CategoryScreen/CategoryScreen';
import ProductScreen from './views/ProductsScreen/ProductScreen';
import LoginScreen from './views/LoginScreen/LoginScreen';
import HomeScreen from './views/HomeScreen/HomeScreen';


// Redux
import { isUserLoggedIn } from './redux/actions/adminAuth.actions'
import { useSelector, useDispatch } from 'react-redux';
import { getInitialData } from './redux/actions/initialData.actions';

function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    dispatch(getInitialData());
  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={HomeScreen} />
        <PrivateRoute path="/products" component={ProductScreen} />
        <PrivateRoute path="/current-orders" component={CurrentOrdersScreen} />
        <PrivateRoute path="/complete-orders" component={CompleteOrdersScreen} />
        <PrivateRoute path="/categories" component={CategoryScreen} />
        
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/login" component={LoginScreen} />
      </Switch>
    </div>
  );
}

export default App;
