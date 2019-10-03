import React from 'react';
import { Board } from 'features/Board';

class BoardPage extends React.Component {
  static getInitialProps ({ query: { id } }) {
    return { id };
  }

  render() {
    const { id } = this.props;

    return <Board boardId={id} />;
  }
}

export default BoardPage;