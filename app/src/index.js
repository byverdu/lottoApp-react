import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { changeColorReducer } from './redux/index';

const state = {
  color: 'yellow'
}
const store = createStore( changeColorReducer );


console.log(store)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById( 'root' )
);

registerServiceWorker();
