import '../styles/globals.css';

import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from '@material-ui/core/styles';


const currentTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: purple[500],
    },
  },
});

import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';


const currentTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: purple[500],
    },
  },
});

function MyApp({ Component, pageProps }) {
  let theme = createMuiTheme(currentTheme);
  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
