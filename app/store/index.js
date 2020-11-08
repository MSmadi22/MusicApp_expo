import { combineReducers, createStore } from 'redux';
import Reducer from './reducers';

const Reducers = {
  data: Reducer
};

const Store = createStore(combineReducers(Reducers));

export default Store;
