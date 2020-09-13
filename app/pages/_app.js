import React from 'react';
import NextApp from 'next/app';
import blue from '@material-ui/core/colors/blue';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import '../styles/globals.css';


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),


    h1: {
      fontSize: '6.5rem',
      fontWeight: 350,
    },
    h2: {
      fontSize: '3rem',
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 250,
    },
    subtitle1: {
      fontSize: '1.4rem',
    },
    body1: {
      fontSize: '1rem',
    },
  },

  palette: {
    primary: {
      main: blue[700],
    },
    white: '#ffffff',
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
