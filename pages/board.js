import React from 'react';
import { Board } from 'features/Board';
import { withTranslation } from '../i18n';

class BoardPage extends React.Component {
  static getInitialProps ({ query: { id } }) {
    return {
      id,
      namespacesRequired: ['common'],
    };
  }

  render() {
    const { id, t } = this.props;

    return <Board boardId={id} t={t} />;
  }
}

export default withTranslation('common')(BoardPage);