import React from 'react';

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    /* eslint-disable no-nested-ternary, default Error component suggested by Nextjs */
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { statusCode } = this.props;

    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    );
  }
}

export default Error;
