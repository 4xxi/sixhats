import React from 'react';
import Login from 'features/Login';
import { withTranslation } from '../i18n';

const LoginPage = props => <Login {...props} />;

LoginPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(LoginPage);