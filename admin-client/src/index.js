import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import './index.css';

// Routing
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      {/* <React.StrictMode> */}
        <App />
      {/* </React.StrictMode> */}
    </Router>
  </Provider>,
  document.getElementById('root')
);

