import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import NavBar from '../components/NavBar';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
  },
});

export default function SimpleCard() {
  const classes = useStyles(useTheme());
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <>
      <NavBar showRightSide={true}/>
      <div className={classes.container}>
        <Typography variant="h2">
          <center>Contact Us</center>
        </Typography>
        <br></br>
        
        <div>
          <br></br>
          <Typography variant="h3">
            <center>Name: Daniel Obermeier</center>
          </Typography>
          <br></br>
          <Typography variant="h3">
            <center>Mobile Number: +49(0)8928925745</center>
          </Typography>
          <br></br>
          <Typography variant="h3">
            <center>Email: daniel.obermeier@tum.de</center>
          </Typography>
        </div>


      </div>
    </>
  );
}
