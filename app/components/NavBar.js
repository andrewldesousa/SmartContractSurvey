import React, {useEffect, useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import {isAuthenticated, signout} from '../pages/api/auth';
import {Typography} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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

export default function NavBar(props) {
  const classes = useStyles(useTheme());
  const {user} = isAuthenticated();
  const [anchorEl, setAnchorEl] = useState(null);
  const [authenticated, setAuthenticated] = useState(user ? true : false);
  const showRightSide = props.showRightSide;
  const open = Boolean(anchorEl);

  const handleAncorElClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAncorElClose = () => {
    setAnchorEl(null);
  };

  function clickSignout() {
    signout();
    setAuthenticated(false);
  }

  function renderRightSide() {
    if (!showRightSide) {
      return (
        <div/>
      );
    } else if (!authenticated) {
      return (
        <div>
          <Link href="/login">
            <Button variant="contained" size="large" color="primary">Login</Button>
          </Link>
          <Link href="/register" className={classes.buttonLinks}>
            <Button variant="contained" size="large" color="primary" className={classes.buttonLinks}>Register</Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Button variant="contained" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleAncorElClick}>
            <AccountCircleIcon/>
            <Typography variant="p">{user.name}</Typography>
          </Button>

          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleAncorElClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleAncorElClose}
            >
              <Link href={'/admin/'+ user._id}>
                <MenuItem>My Profile</MenuItem>
              </Link>
              <MenuItem onClick={() => clickSignout()}>Logout</MenuItem>
            </Menu>
          </Popover>
        </div>
      );
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Link href="/">
            <Button size="large" >
              <img src="/tum.png" className={classes.logo} />
            </Button>
          </Link>
          {renderRightSide()}
        </Toolbar>
      </AppBar>
    </div>
  );
};
