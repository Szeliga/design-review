import MaterializeCSS from 'materialize-css/bin/materialize'; // eslint-disable-line no-unused-vars
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import Store from 'app/store';
import Style from 'styles/main'; // eslint-disable-line no-unused-vars
import App from 'components/App';

render(
  <Provider store={Store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
