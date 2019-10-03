const CREATE_BOARD = 'board/CREATE_ROOM';
const PUSH_DATA = 'board/PUSH_DATA';

const createBoard = data => ({
  type: CREATE_BOARD,
  data,
});

const pushData = data => ({
  type: PUSH_DATA,
  data,
});

const initialState = {

};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD:
    case PUSH_DATA:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const actions = {
  createBoard,
  pushData,
};

const types = {
  PUSH_DATA,
  CREATE_BOARD,
};

export { types, actions };