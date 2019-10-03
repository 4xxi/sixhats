import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { actions } from 'features/Board/ducks';
import Entry from './Entry';

const mapStateToProps = state => ({
  programs: state.firebase.data.programs,
  rooms: state.firebase.data.rooms,
});

const mapDispatchToProps = {
  createBoard: actions.createBoard,
};

export const EntryContainer = compose(
  firebaseConnect(() => [
    { path: 'programs' },
    { path: 'rooms' },
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(Entry);