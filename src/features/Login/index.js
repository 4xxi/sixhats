import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { getFirebase } from 'react-redux-firebase'
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';
import styled from 'styled-components';
import GoogleButton from 'react-google-button';
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

class Login extends React.Component {
  loginWithGoogle = () => this.props.firebase.login({ provider: 'google', type: 'popup' });

  render() {
    const { auth } = this.props;
    let content = null;

    if (!isLoaded(auth)) {
      content = <span>Check authorization...</span>;
    } else {
      if (isEmpty(auth)) {
        content = <GoogleButton onClick={this.loginWithGoogle} />;
      } else {
        content = <Entry />;
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
