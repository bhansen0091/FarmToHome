import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

