import { createStore } from 'redux';
import todoApp from 'app/reducers';
const store = createStore(todoApp);

export default store;
