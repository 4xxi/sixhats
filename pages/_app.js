import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import createStore from 'src/store';
import { firebaseConfig } from 'common/constants';
import { GlobalStyle } from 'common/styles/global';
import theme from 'common/styles/theme';

const rrfConfig = {
  userProfile: 'users',
  profileParamsToPopulate: [
    { child: 'role', root: 'roles' },
  ],
  profileFactory: user => ({
    email: user.email || user.providerData[0].email,
    role: 'user',
    providerData: user.providerData
  })
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <title>Six Hats</title>
        </Head>
        <Provider store={store}>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </ReactReduxFirebaseProvider>
        </Provider>
        <GlobalStyle />
      </>
  );
  }
}

export default MyApp;
