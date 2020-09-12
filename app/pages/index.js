import React from 'react';
import Link from 'next/link';
import {Typography} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8rem',
  },
  pageHeader: {
    lineHeight: 1.5,
    fontSize: '4rem',
  },
  landingPageButton: {
    width: '24rem',
    height: '4rem',
    marginTop: '2rem',
    marginBottom: '3rem',
  },

  instructionSectionHeader: {
    textAlign: 'center',
    marginBottom: 50,
  },
  instructionItem: {
    maxWidth: 400,
    marginTop: '.8rem',
    textAlign: 'center',
  },
  instructionHeader: {
    textAlign: 'center',
    marginBottom: '1.4rem',
    marginTop: '1.4rem',
  },
  instructionIcon: {
    height: 100,
  },
}));


export default function Home() {
  const classes = useStyles(useTheme());

  return (
    <main className={classes.container}>
      <Typography variant="h1">
        Welcome to the Survey!
      </Typography>
      <Typography variant="subtitle1">
        This is survey is about X and Y. Fill it out to have a chance to win prize Z!
      </Typography>
      <Link href="/survey">
        <Button variant="contained" color="primary" className={classes.landingPageButton}>Start the survey</Button>
      </Link>

      <Typography variant="h2" className={classes.instructionSectionHeader}>How it works</Typography>
      <Grid container justify="center" spacing={3} className={classes.instructionSection}>
        <Grid key={0} item className={classes.instructionItem}>
          <img src="/user.svg" alt="ROI" className={classes.instructionIcon} />
          <Typography variant="h3" className={classes.instructionHeader}>Enter Your Wallet ID</Typography>
          <Typography variant="body1">The first thing you should do before you start the survey is enter your wallet id.
            This enters you in the raffle to win money rewards!</Typography>
        </Grid>
        <Grid key={1} item className={classes.instructionItem}>
          <img src="/clipboard.svg" alt="ROI" className={classes.instructionIcon} />
          <Typography variant="h3" className={classes.instructionHeader}>Complete the Survey</Typography>
          <Typography variant="body1">Make sure you answer each question before submitting.</Typography>
        </Grid>
        <Grid key={2} item className={classes.instructionItem}>
          <img src="/money.svg" alt="ROI" className={classes.instructionIcon} />
          <Typography variant="h3" className={classes.instructionHeader}>Win Money</Typography>
          <Typography variant="body1">We will get back to the winners of the prize after several weeks.
           Good luck!</Typography>
        </Grid>
      </Grid>
    </main>
  );
}
