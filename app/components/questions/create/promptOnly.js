import React from 'react';
import {Card, CardContent, CardHeader, withStyles, Button, TextField} from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import {Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import { QuestionInfo} from '../../info';


const useStyles = makeStyles((theme) => ({
  paper: {
    height: '13.5rem',
    margin: '1rem',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  cancelContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    height: '2rem',
  },
  infoContainer: {
    width: '100px',
    height: '100px',
    position: 'absolute',
    top : '0' ,
    margin : '10px',

  },
  cardContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 0,
  },
  form: {
    padding:'0.5rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  margin: {
    margin: '1rem',
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
          <div className={classes.infoContainer}>
           <QuestionInfo type={props.type} />
          </div>
          <Typography className={classes.margin } variant="h3">{parseTitle(props.type)} Question</Typography>
          <FormControl className={classes.margin}>
            <TextField value={value} label='Question' placeholder='Enter the quesiton' required variant='filled'
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
