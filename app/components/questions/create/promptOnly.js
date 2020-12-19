import React from 'react';
import {Card, CardContent, CardHeader, withStyles, Button} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '12rem',
    margin: '1rem',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));


export default function PromptOnly(props) {
  const classes = useStyles(useTheme());
  const value = props.prompt;

  function parseTitle(questionType) {
    /* let output = questionType.slice(0, 1).toUpperCase() + questionType.slice(1, questionType.length);

    for(let i=1; i<output.length; i++) {
      console.log(output[i])
      console.log(output[i] !== output[i].toLowerCase())
      if (output[i] !== output[i].toLowerCase()) {
        output[i] = output[i].toLowerCase();
        output = output.splice(i, i, ' ');
        break;
      }
    }*/

    const output = questionType.charAt(0).toUpperCase() + questionType.substring(1).toLowerCase();

    return output;
  }

  return (
    <Card variant="outlined" className={classes.paper}>
      <CardContent className={classes.cardContent}>
        <form className={classes.form}>
          <div className={classes.cancelContainer}>
            <IconButton onClick={() => props.deleteQuestion(props.index)}>
              <CancelIcon />
            </IconButton>
          </div>

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
