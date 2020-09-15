import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    marginTop: 200,
  },
});

export default function Submission() {
  const classes = useStyles();

  return (
    <Typography variant="h2" align="center" className={classes.title}>
      Your submission has been successfully saved.
    </Typography>
  );
};
