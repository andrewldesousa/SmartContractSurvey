import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import useWindowSize from 'react-use/lib/useWindowSize'

import Confetti from 'react-confetti'

const useStyles = makeStyles((theme) => ({
  flex: {
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
    zIndex: '100'
  },
}));

export default function Submission() {
  const classes = useStyles(useTheme());
  const { width, height } = useWindowSize()

  return (
      <div className={classes.flex}>
      <Confetti
          width={"1500%"}
          height={"1000%"}
          numberOfPieces={1000}
          recycle
          gravity={0.1}
      />
      <Card className={classes.messageCard}>
        <Typography variant="h2" align="center">
          Your submission has been successfully saved.
        </Typography>
      </Card>
    </div>
  );
};
