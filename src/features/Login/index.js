import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Paper, Button } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { getFirebase } from 'react-redux-firebase'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
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
  };

  signIn = () => {
    const { firebase } = this.props;

    firebase.auth().signInAnonymously().catch(error => {
      this.setState({
        error: error.message
      });
    });

    firebase.auth().onAuthStateChanged(user => {
    });
  };

  render() {
    const { auth } = this.props;
    const { error } = this.state;
    let content = null;

    if (!isLoaded(auth)) {
      content = <span>Check authorization...</span>;
    } else {
      if (isEmpty(auth)) {
        content = <Button onClick={this.signIn}>Sign In</Button>;
      } else {
        content = <Entry />;
      }
    }

    if (error) {
      content = <Error>{error}</Error>;
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
