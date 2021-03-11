import React from 'react';
import Link from 'next/link';

import {Typography} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InfoIcon from '@material-ui/icons/Info';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';

import NavBar from '../components/NavBar';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8rem',
  },
  paperSectionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  paper: {
    width: '20rem',
    height: '20rem',
    margin: '4rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  paperBody: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  }
}));


export default function Start() {
  const classes = useStyles(useTheme());

  return (
    <>
      <NavBar showRightSide={true}/>
      <main className={classes.container}>
        <Typography variant="h1">Create forms with ease</Typography>
        <div className={classes.paperSectionContainer}>
          <Paper elevation={0} variant="outlined" className={classes.paper}>
            <Typography variant="h3">Information</Typography>
            <InfoIcon style={{fontSize: 170}}></InfoIcon>
            <div>
              <Typography className={classes.paperBody}>
                If you would like more information regarding our application, visit our information page.
              </Typography>
              <div className={classes.buttonContainer}>
                <Link href="/info">
                  <Button variant="contained" size="large" color="primary">Information</Button>
                </Link>
              </div>
            </div>
          </Paper>
          <Paper elevation={0} variant="outlined" className={classes.paper}>
            <Typography variant="h3">Contact</Typography>
            <ContactSupportIcon style={{fontSize: 170}}></ContactSupportIcon>
            <div>
              <Typography className={classes.paperBody}>
                For user specific questions, guidance, or any help, you can visit find our contact information on the contact page.
              </Typography>
              <div className={classes.buttonContainer}>
                <Link href="/contact">
                  <Button variant="contained" size="large" color="primary">Contact</Button>
                </Link>
              </div>
            </div>
          </Paper>
        </div>
      </main>
    </>
  );
}
