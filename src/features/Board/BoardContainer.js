import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { actions } from './ducks';
import Board from './Board';

const mapStateToProps = state => ({
  programs: state.firebase.data.programs,
  rooms: state.firebase.data.rooms,
});

const mapDispatchToProps = {
  updateData: actions.updateData,
};

export const BoardContainer = compose(
  firebaseConnect(props => [
    { path: 'programs' },
    { path: `rooms/${props.boardId}` }
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
)(Board);