import React from 'react';
import NextApp from 'next/app';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';
import '../styles/globals.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: purple[500],
    },
  },
});

export default class App extends NextApp {
  render() {
    const {Component, pageProps} = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}
