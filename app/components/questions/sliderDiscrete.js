import React from 'react';
import {Card, CardContent, CardHeader, Slider, FormLabel} from '@material-ui/core';
import { QuestionInfo} from '../info';

const cardStyle = {
  textAlign: 'left',
  padding: '1.5rem',
  display: 'flex',
  color: 'inherit',
  display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '180px',
  position: 'relative',
};

const sliderStyle = {
  width: '60%',
};
const infoContainer = {
  width: '100px',
  height: '100px',
  position: 'absolute',
  top : '0' ,
  marginLeft : '-15px',
  marginTop : '10px',

};
export default class DiscreteSlider extends React.Component {
  render() {
    return (
      <div align='center'>
        <br />
        <Card variant="outlined" style={cardStyle}>
        <div style={infoContainer}>
           <QuestionInfo type='sliderDiscrete' />
          </div>
          <CardHeader title={this.props.question} />
          <CardContent>
            <FormLabel>{this.props.label}</FormLabel>
            <GenSlider list={this.props.list} SECTION_INDEX={this.props.SECTION_INDEX} value={this.props.value} INDEX={this.props.INDEX} handleChange={this.props.handleChange} />
          </CardContent>
        </Card>
      </div>
    );
  }
}


const GenSlider = function MakeSlider(props) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <span display='inline-block'>
      <div style={sliderStyle}>
        <Slider
          value={props.value ? props.value : 0} // or if strings have to be stored parseInt(this.props.value)
          onChange={(event, newValue) => props.handleChange(props.SECTION_INDEX,props.INDEX, newValue)} // for strings could be used newValue + ''
          valueLabelFormat={props.list[value]}
          step={1}
          marks
          min={0}
          max={props.list && props.length > 0 ? props.list.length - 1 : 20} // test with other values until a nonempty option list, otherwise 0
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
      </div>
      <hr />
      <big>{props.list[value]}</big>
    </span>
  );
};
