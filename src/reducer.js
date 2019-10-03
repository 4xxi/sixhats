import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { boardReducer } from 'features/Board';

export default combineReducers({
  firebase: firebaseReducer,
  board: boardReducer,
});
