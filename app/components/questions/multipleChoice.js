import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';

const cardStyle = {
  textAlign: 'left',
  padding: '1.5rem',
  display: 'flex',
  color: 'inherit',
  display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '220px',
};

export default class SingleQA extends React.Component {
  render() {
    return (
      <div align='center'>
        <br/>
        <Card variant="outlined" style={cardStyle}>
          <CardHeader title={this.props.question}/>
          <CardContent>
            <QList list={this.props.qList} label={this.props.label} value={this.props.value}
              INDEX={this.props.INDEX} handleChange={this.props.handleChange}/>
          </CardContent>
        </Card>
      </div>
    );
  }
}


function QList(props) {

  function readPropertyValue(propsValue, index) {
    if (propsValue) {
      return propsValue.charAt(index) === '1';
    } else {
      return false;
    }
  }

  function setPropertyValue(propsList, propsValue, index, newValue) {
    let result = '';

    if (!propsValue) {
      for (let i = 0; i < propsList.length; i++) {
        if (i === index) {
          result = result + (newValue ? '1' : '0');
        } else {
          result = result + '0';
        }
      }
    } else {
      for (let i = 0; i < propsList.length; i++) {
        if (i === index) {
          result = result + (newValue ? '1' : '0');
        } else {
          result = result + propsValue.charAt(i);
        }
      }
    }

    return result;
  }


  return (
    <div>
      <FormControl component="fieldset">
        <FormGroup>
          <FormLabel component='legend'>{props.label}</FormLabel>
          {props.list.map((listitem, index) => (
            <FormControlLabel value={listitem}
              control={<Checkbox color="primary" checked={readPropertyValue(props.value, index)}
                onChange={(event) =>
                  props.handleChange(props.INDEX, setPropertyValue(props.list, props.value, index, event.target.checked))}
                name={listitem}/>}
              label={listitem} labelPlacement='end'/>
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
