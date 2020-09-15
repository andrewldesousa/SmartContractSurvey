import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  flex: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  messageCard: {
    padding: '2rem',
    width: '60%',
    marginTop: '10rem',
  },
}));

export default function Submission() {
  const classes = useStyles(useTheme());

  return (
    <div className={classes.flex}>
      <Card className={classes.messageCard}>
        <Typography variant="h2" align="center">
          Your submission has been successfully saved.
        </Typography>
      </Card>
    </div>
  );
};
