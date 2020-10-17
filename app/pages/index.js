import React from 'react';
import Link from 'next/link';
import {Typography} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ButtonAppBar from '../components/homeHeader';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8rem',
  },
  paperContainer: {
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
  },
}));


export default function Start() {
  const classes = useStyles(useTheme());

  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <main className={classes.container}>
        <Typography variant="h1">Create forms with ease</Typography>
        <div className={classes.paperContainer}>
          <Paper elevation={0} variant="outlined" className={classes.paper}>
            <Typography variant="h3">Information</Typography>
          </Paper>
          <Paper elevation={0} variant="outlined" className={classes.paper}>
            <Typography variant="h3">Contact</Typography>
          </Paper>
        </div>
      </main>
    </>
  );
}
