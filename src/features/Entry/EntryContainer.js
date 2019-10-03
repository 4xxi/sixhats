import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { actions } from 'features/Board/ducks';
import Entry from './Entry';

const mapStateToProps = state => ({
  programs: state.firebase.data.programs,
  rooms: state.firebase.data.rooms,
  auth: state.firebase.auth,
  st: state.firebase
});

const mapDispatchToProps = {
  createBoard: actions.createBoard,
  createProgram: actions.createProgram,
};

export const EntryContainer = compose(
  firebaseConnect(() => [
    { path: 'programs' },
    { path: 'rooms' },
    { path: 'users/programs' },
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(Entry);