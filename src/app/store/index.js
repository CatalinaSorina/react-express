import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { defaultState } from '../../server/defaultState';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas.mock';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(function reducer(
  state = defaultState,
  action
) {
  return state;
},
applyMiddleware(sagaMiddleware, createLogger()));
sagaMiddleware.run(sagas);
