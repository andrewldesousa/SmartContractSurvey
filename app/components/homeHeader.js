import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "next/link";
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    width: '80px',
  },
  buttonLinks: {
    marginLeft: '1rem',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles(useTheme());

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <img src="/tum.png" className={classes.logo} />

          <div>
            <Link href="/login">
              <Button variant="contained" size="large" color="primary">Login</Button>
            </Link>
            <Link href="/register" className={classes.buttonLinks}>
              <Button variant="contained" size="large" color="primary" className={classes.buttonLinks}>Register</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
