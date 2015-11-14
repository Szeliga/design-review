import Style from './styles/main'; // eslint-disable-line no-unused-vars
import React from 'react';
import {render} from 'react-dom';
import Store from './store';
import { Provider } from 'react-redux';


import App from 'components/App';
render(
  <Provider store={Store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
