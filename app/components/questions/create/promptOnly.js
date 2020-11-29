import React from 'react';
import {Card, CardContent, CardHeader, withStyles} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme) => ({
  paper: {
    height: '12rem',
    margin: '1rem',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));


export default function PromptOnly(props) {
  const classes = useStyles(useTheme());
  const value = props.prompt;

  function parseTitle(questionType) {
    let output = questionType.slice(0, 1).toUpperCase() + questionType.slice(1, questionType.length);

    for(let i=1; i<output.length; i++) {
      console.log(output[i])
      console.log(output[i] !== output[i].toLowerCase())
      if (output[i] !== output[i].toLowerCase()) {
        alert('asd')
        output[i] = output[i].toLowerCase();
        output = output.splice(i, i, ' ');
        break;
      }
    }

    return output;
  }

  return (
    <Card variant="outlined" className={classes.paper}>
      <CardContent>
        <form>
          <Typography variant="h3">{parseTitle(props.type)} Question</Typography>
          <FormControl>
            <InputLabel>Question</InputLabel>
            <Input value={value}
              onChange={() => props.handleChange(props.index,
                  {type: props.type, values: {prompt: event.target.value}})}/>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
};

PromptOnly.propTypes = {
  handleChange: PropTypes.func,
  prompt: PropTypes.string,
  questionKey: PropTypes.number,
  type: PropTypes.string,
};
