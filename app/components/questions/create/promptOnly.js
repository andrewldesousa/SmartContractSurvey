import React, {useState} from 'react';
import {Card, CardContent, CardHeader, withStyles} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import QUESTION_TYPES from '../QuestionTypes';
import {Typography} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '15rem',
    height: '15rem',
    margin: '2rem',
  },
}));


export default function PromptOnly(props) {
  const classes = useStyles(useTheme());
  const value = props.prompt;

  return (
    <Card variant="outlined" className={classes.paper}>
      <form>
        <Typography variant="h3">{props.type} Question</Typography>
        <FormControl>
          <InputLabel>Question</InputLabel>
          <Input type={props.type} value={value}
            onChange={() => props.handleChange(props.questionKey, {type: props.type, prompt: event.target.value})}/>
        </FormControl>
      </form>
    </Card>
  );
};

PromptOnly.propTypes = {
  handleChange: PropTypes.func,
  prompt: PropTypes.string,
  questionKey: PropTypes.number,
  type: PropTypes.string,
};
