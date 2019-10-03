import Router from 'next/router';
import { call, takeLatest } from 'redux-saga/effects';
import { getFirebase } from 'react-redux-firebase';
import { types } from './ducks';

function* createBoardSaga({ data }) {
  try {
    const newBoard = yield getFirebase().push('/rooms', data);

    const redirectUrl = `/board/${newBoard.getKey()}`;
    yield call(Router.push, redirectUrl);
  } catch (error) {
    console.log(error);
  }
}

function* pushDataToPathSaga({ data }) {
  try {
    yield getFirebase().set(data.path,  data.data);
  } catch (error) {
    console.log(error);
  }
}

function* watchBoardSaga() {
  yield takeLatest(types.CREATE_BOARD, createBoardSaga);
  yield takeLatest(types.PUSH_DATA, pushDataToPathSaga);
}

export default watchBoardSaga;