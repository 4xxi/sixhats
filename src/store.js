import { createStore } from 'redux';
import reducer from './reducer';

const initialState = {};

export default () => {
  return createStore(
    reducer,
    initialState,
  );
};