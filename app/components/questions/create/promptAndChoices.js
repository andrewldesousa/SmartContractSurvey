import React from 'react';
import {Button, Card, CardContent, CardHeader, withStyles} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  paper: {
    height: '12rem',
    margin: '2rem',
  },
}));


export default function PromptAndChoices(props) {
  const classes = useStyles(useTheme());
  const prompt = props.values['prompt'];
  const answers = props.values['answers'];

  function renderAnswers() {
    let output = [];
    for (let i = 0; i < answers.length; i++) {
      output = output.concat(<Input value={answers[i]}
        onChange={() => props.handleChange(props.index,
            {type: props.type, values: {prompt: prompt, answers: answers.slice(0,i).concat([event.target.value]).concat(answers.slice(i+1, answers.length))}})}/>);
    }
    return output;
  }

  return (
    <Card variant="outlined" className={classes.paper}>
      <CardContent>
        <form>
          <Typography variant="h3">{props.type} Question</Typography>
          <FormControl>
            <InputLabel>Question</InputLabel>
            <Input value={prompt}
              onChange={() => props.handleChange(props.index,
                  {type: props.type, values: {prompt: event.target.value, answers: answers}})}/>
            {renderAnswers()}
            <Button onClick={() => props.handleChange(props.index,
                {type: props.type, values: {prompt: prompt, answers: answers.concat([''])}})}>
                Add Answer</Button>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
};