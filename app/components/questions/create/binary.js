import React, {useState} from 'react';
import {Card, CardContent, CardHeader, withStyles} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';


const cardStyle = {
  textAlign: 'left',
  padding: '1.5rem',
  display: 'flex',
  color: 'inherit',
  display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '180px',
  marginTop: '2rem',
  marginBottom: '2rem',
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8rem',
  },
}));


export default function binary(props) {
  return (
    <Card variant="outlined" style={cardStyle}>
      <form>
        <h2>Binary question</h2>
        <FormControl>
          <InputLabel htmlFor="input-with-icon-adornment">Question</InputLabel>
          <Input onChange={() => props.handleChange(props.questionKey)} value={props.question}/>
        </FormControl>
      </form>
    </Card>
  );
};
