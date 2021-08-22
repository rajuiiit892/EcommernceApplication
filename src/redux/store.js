import productReducer from './reducers/index';
import { createStore } from 'redux';

const store=createStore(productReducer);
export default store; 
