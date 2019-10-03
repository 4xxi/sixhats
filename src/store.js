import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import { rootSaga } from './sagas';

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export default () => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
  );

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();

  return store;
};