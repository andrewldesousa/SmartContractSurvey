import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {isAuthenticated, signout} from '../pages/api/auth';
import { useRouter } from 'next/router';


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

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    setVisible(false);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    // setVisible(true);
  };

  const handleClose = () => {
    setVisible(true);
    setAnchorEl(null);
    signout();
  };

  const {user} = isAuthenticated();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <Button size="large" >
              <img src="/tum.png" className={classes.logo} />
            </Button>
          </Link>
          { visible || !user ?
          <div>
            <Link href="/login">
              <Button variant="contained" size="large" color="primary">Login</Button>
            </Link>
            <Link href="/register" className={classes.buttonLinks}>
              <Button variant="contained" size="large" color="primary" className={classes.buttonLinks}>Register</Button>
            </Link>
          </div> :
          <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
               Hello, &nbsp; {user? user.name:''}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};
