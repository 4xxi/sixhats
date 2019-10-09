const CREATE_BOARD = 'board/CREATE_ROOM';
const CREATE_PROGRAM = 'board/CREATE_PROGRAM';
const UPDATE_DATA = 'board/UPDATE_DATA';

const createBoard = data => ({
  type: CREATE_BOARD,
  data,
});

const createProgram = data => ({
  type: CREATE_PROGRAM,
  data,
});

const updateData = data => ({
  type: UPDATE_DATA,
  data,
});

const initialState = {

};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD:
    case CREATE_PROGRAM:
    case UPDATE_DATA:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const actions = {
  createBoard,
  createProgram,
  updateData,
};

const types = {
  UPDATE_DATA,
  CREATE_BOARD,
  CREATE_PROGRAM,
};

export { types, actions };