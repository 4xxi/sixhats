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

function* updateDataSaga({ data }) {
  try {
    yield getFirebase().set(data.path,  data.data);
  } catch (error) {
    console.log(error);
  }
}

function* createProgramSaga({ data }) {console.log(data);
  try {
    yield getFirebase().push(`/users/${data.uid}/programs`,  data.data);
  } catch (error) {
    console.log(error);
  }
}

function* watchBoardSaga() {
  yield takeLatest(types.CREATE_BOARD, createBoardSaga);
  yield takeLatest(types.UPDATE_DATA, updateDataSaga);
  yield takeLatest(types.CREATE_PROGRAM, createProgramSaga);
}

export default watchBoardSaga;