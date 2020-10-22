import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function LinearDeterminate(props) {


  

  return (
    <div >
      <LinearProgress variant="determinate" value={props.progress} />
    </div>
  );
}
