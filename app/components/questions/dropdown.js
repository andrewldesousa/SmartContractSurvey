import React from 'react';
import {Card, CardContent, CardHeader, InputLabel, NativeSelect, FormControl, TextField} from '@material-ui/core';
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
export default class DropdownQA extends React.Component {
  render() {
    return (
      <div align='center'>
        <br />
        <Card variant="outlined" style={cardStyle}>
        <div style={infoContainer}>
           <QuestionInfo type='dropdown' />
          </div>
          <CardHeader title={this.props.question} />
          <CardContent>
            <Drop_down list={this.props.list} SECTION_INDEX={this.props.SECTION_INDEX} label={this.props.label} value={this.props.value} INDEX={this.props.INDEX} handleChange={this.props.handleChange} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

function Drop_down(props) {
  const [state, setState] = React.useState({
    name: '',
  });
  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const FormStyle = {
    margin: 1,
    padding: 1.5,
    minWidth: 180,
  };
  return (
    <div>
      <TextField
        select
        style={FormStyle}
        label={props.label}
        value={props.value ? props.value : ''}
        onChange={(event) => props.handleChange(props.SECTION_INDEX,props.INDEX, event.target.value)}
        SelectProps={{
          native: true,
        }}
        variant="outlined"
      >
        <option value="" />
        {props.list.map((listitem) => (
          <option key={listitem} value={listitem}>{listitem}</option>
        ))}
      </TextField>
    </div>
  );
}
