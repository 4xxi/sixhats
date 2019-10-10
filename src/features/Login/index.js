import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { getFirebase } from 'react-redux-firebase'
import { withFirebase } from 'react-redux-firebase';
import styled from 'styled-components';
import { Entry } from 'features/Entry';

const StyledPaper = styled(Paper)`
  && {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = styled.div`
  text-align: center;
  color: ${red[200]};
`;

class Login extends React.Component {
  state = {
    error: null,
    isLoading: true,
    isAuthorized: false,
  };

  componentDidMount() {
    const { firebase } = this.props;

    firebase.auth().signInAnonymously().catch(error => {
      this.setState({
        error: error.message,
        isLoading: false,
      });
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLoading: false,
          isAuthorized: true,
        });
      }
    });
  }

  render() {
    const { t } = this.props;
    const { error, isLoading, isAuthorized } = this.state;
    let content = null;

    if (isLoading) {
      content = <span>{t('checkAuth')}</span>;
    } else {
      if (isAuthorized) {
        content = <Entry t={t} />;
      } else {
        content = <Error>{error}</Error>;
      }
    }

    return (
      <Wrapper>
        <StyledPaper>
        {content}
        </StyledPaper>
      </Wrapper>
    );
  }
}

export default compose(
  withFirebase,
  connect(({ firebase: { auth, profile } }) => ({ auth, profile }))
)(Login);
