import React from 'react';
import {Card, CardContent, CardHeader, Radio, RadioGroup, FormControl, FormControlLabel} from '@material-ui/core';
import { QuestionInfo} from '../info';
const cardStyle = {
  textAlign: 'left',
  padding: '1.5rem',
  display: 'flex',
  color: 'inherit',
  display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '220px',
  position: 'relative',
};

const infoContainer = {
  width: '100px',
  height: '100px',
  position: 'absolute',
  top : '0' ,
  marginLeft : '-15px',
  marginTop : '10px',

};

export default class SingleQA extends React.Component {
  render() {
    return (
      <div align='center'>
        <br />
        <Card variant="outlined" style={cardStyle}>
        <div style={infoContainer}>
           <QuestionInfo type='singleChoice' />
          </div>
          <CardHeader title={this.props.question} />
          <CardContent>
            <QList list={this.props.qList} SECTION_INDEX={this.props.SECTION_INDEX} value={this.props.value} INDEX={this.props.INDEX} handleChange={this.props.handleChange} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

function QList(props) {
  return (
    <div>
      <FormControl component="fieldset">
        <RadioGroup value={props.value} onChange={(event) => props.handleChange(props.SECTION_INDEX,props.INDEX, event.target.value)}>
          {props.list.map(listitem => (
            <FormControlLabel value={listitem} control={<Radio color="primary" />} label={listitem}/>
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};
