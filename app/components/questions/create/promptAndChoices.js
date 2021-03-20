import React from 'react';
import { Button, Card, CardContent, CardHeader, TextField, Box } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';


const useStyles = makeStyles((theme) => ({
  paper: {
    color: '#212121',
    height: '13.5rem',

    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'scroll',
  },

  cancelContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    height: '2rem',
  },
  cardContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
  },
  form: {
    padding: '0.75rem',
    height: '12rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  margin: {
    margin: '1rem'
  },
  Button: {
    width: '30%',
    margin: '1rem',
    alignItems: 'center'
  },
  Input: {
    margin: '0.5px',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
}
}));


export default function PromptAndChoices(props) {
  const classes = useStyles(useTheme());
  const prompt = props.values['prompt'];
  const answers = props.values['answers'];

  function parseTitle(questionType) {
    let output = questionType.slice(0, 1).toUpperCase() + questionType.slice(1, questionType.length);

    for(let i=1; i<output.length; i++) {
      if (output[i] !== output[i].toLowerCase()) {
        output = output.slice(0, i) + ' ' + output[i].toLowerCase() + output.slice(i+1, output.length);
        break;
      }
    }

    return output;
  }


  function renderAnswers() {
    let output = [];
    for (let i = 0; i < answers.length; i++) {
      output = output.concat(<FormControl>
        <div className={classes.Input}><p style={{'margin-right':'0.5em'}}>{i+1}.</p><Input value={answers[i]} required
          variant="outlined" placeholder={'Enter option value'}onChange={() => props.handleChange(props.index,
              {
                type: props.type, values: { 
                  prompt: prompt,
                  answers: answers.slice(0, i).concat([event.target.value]).concat(answers.slice(i+1, answers.length))}
              })}/>
        </div>
      </FormControl> 
     );
    }
    return output;
  }

  return (
    <Card variant="outlined" className={classes.paper}>
      <form className={classes.form}>
        <div className={classes.cancelContainer}>
          <IconButton onClick={() => props.deleteQuestion(props.index)}>
            <CancelIcon />
          </IconButton>
        </div>
        <Typography className={classes.margin} variant="h3">{parseTitle(props.type)} Question</Typography>
        <FormControl className={classes.margin}>
          <TextField fullWidth={true} value={prompt} placeholder='Enter Question' variant='filled'
            onChange={() => props.handleChange(props.index,
                { type: props.type, values: { prompt: event.target.value, answers: answers } })} 
            label='Question' required/>
        
        {renderAnswers()}
        <Button variant='contained' color='primary' className={classes.margin} onClick={() => props.handleChange(
            props.index,
            { type: props.type, values: { prompt: prompt, answers: answers.concat(['']) } })}>
            Add Answer</Button>
            </FormControl>
      </form>
    </Card>
  );
};