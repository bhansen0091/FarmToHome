import React, { useEffect, useState } from 'react';
import './App.css';

// Routing
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './HOC/PrivateRoute';

// Components
import RegisterScreen from './views/RegisterScreen/RegisterScreen';
import CategoryScreen from './views/CategoryScreen/CategoryScreen';
import ProductScreen from './views/ProductsScreen/ProductScreen';
import LoginScreen from './views/LoginScreen/LoginScreen';
import HomeScreen from './views/HomeScreen/HomeScreen';


// Redux
import { getAllCategories } from './redux/actions/category.actions';
import { isUserLoggedIn } from './redux/actions/adminAuth.actions'
import { useSelector, useDispatch } from 'react-redux';
import OrdersScreen from './views/OrdersScreen/OrdersScreen';
import { getInitialData } from './redux/actions/initialData.actions';

function App() {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    // dispatch(getAllCategories());
    dispatch(getInitialData());
  }, [])

  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact path="/" component={HomeScreen} />
        <PrivateRoute path="/products" component={ProductScreen} />
        <PrivateRoute path="/orders" component={OrdersScreen} />
        <PrivateRoute path="/categories" component={CategoryScreen} />
        
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/login" component={LoginScreen} />
      </Switch>
    </div>
  );
}

export default App;
