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
    margin: '2rem',
  },
}));


export default function PromptOnly(props) {
  const classes = useStyles(useTheme());
  const value = props.prompt;

  return (
    <Card variant="outlined" className={classes.paper}>
      <CardContent>
        <form>
          <Typography variant="h3">{props.type} Question</Typography>
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
