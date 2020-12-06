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
  const separator = '|#~§^separator!+-=#|';
  const emptyWord = '-+~##~§^empty!+-=#/#';

  function readPropertyValue(propsList, propsValue, index) {
    if (propsValue) {
      const values = propsValue.split(separator, propsList.length);
      return values[index] !== emptyWord;
    } else {
      return false;
    }
  }

  function setPropertyValue(propsList, propsValue, index, newValue) {
    let result = '';

    if (!propsValue) {
      for (let i = 0; i < propsList.length; i++) {
        if (i === index) {
          result = result + (newValue ? newValue : '') + separator;
        } else {
          result = result + emptyWord + separator;
        }
      }
    } else {
      const values = propsValue.split(separator, propsList.length);

      for (let i = 0; i < propsList.length; i++) {
        if (i === index) {
          result = result + (newValue ? newValue : '') + separator;
        } else {
          result = result + values[i] + separator;
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
              control={<Checkbox color="primary" checked={readPropertyValue(props.list, props.value, index)}
                onChange={(event) =>
                  props.handleChange(props.INDEX, setPropertyValue(props.list, listitem, index, event.target.checked))}
                name={listitem}/>}
              label={listitem} labelPlacement='end'/>
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}
