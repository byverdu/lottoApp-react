import React from 'react';
import ReactDOM from 'react-dom';
import Home from './containers/home';
import Lotto from './containers/lottos/';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/index';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const loggerMiddleware = createLogger();
const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/lottos/:name" component={Lotto} />
      </div>
    </Router>
  </Provider>, 
  document.getElementById( 'root' )
);

registerServiceWorker();
