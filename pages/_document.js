import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// eslint-disable-next-line import/no-extraneous-dependencies
import flush from 'styled-jsx/server';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,300,500"
          rel="stylesheet"
          type="text/css"
        />
        <meta
          name="theme-color"
          content={pageContext ? pageContext.theme.palette.primary.main : {}}
        />
        {this.props.styleTags}
      </Head>
      <body>
      <Main />
      <NextScript />
      </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  let pageContext;
  const sheet = new ServerStyleSheet();
  const page = ctx.renderPage(Component => {
    const WrappedComponent = props => {
      // eslint-disable-next-line prefer-destructuring, react/destructuring-assignment
      pageContext = props.pageContext;
      return <Component {...props} />;
    };

    return WrappedComponent;
  });

  return {
    ...page,
    styleTags: sheet.getStyleElement(),
    pageContext,
    styles: (
      <React.Fragment>
        <style
          id="jss-server-side"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: pageContext ? pageContext.sheetsRegistry.toString() : '',
          }}
        />
        {flush() || null}
      </React.Fragment>
    ),
  };
};

export default MyDocument;
