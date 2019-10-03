import { all, fork } from 'redux-saga/effects';
import { boardSagas } from 'features/Board';

export function* rootSaga() {
  yield all([boardSagas].map(saga => fork(saga)));
}