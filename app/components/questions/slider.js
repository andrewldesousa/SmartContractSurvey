import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Card, CardContent, CardHeader, Slider} from '@material-ui/core';

const cardStyle = {
  textAlign: 'left',
  padding: '1.5rem',
  display: 'flex',
  color: 'inherit',
  display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '180px',
};

const sliderStyle = {
  width: '60%',
};

function valuetext(value) {
  return `${value}`;
}

export default class SliderQA extends React.Component {
  render() {
    return (
      <div align='center'>
        <br />
        <Card variant="outlined" style={cardStyle}>
          <CardHeader title={this.props.question} />
          <CardContent>
            <div style={sliderStyle}>
              <Typography id="discrete-slider" gutterBottom>
                {this.props.label}
              </Typography>
              <Slider
                value={this.props.value ? this.props.value : this.props.min} // or if strings have to be stored parseInt(this.props.value)
                onChange={(event, newValue) => this.props.handleChange(this.props.SECTION_INDEX,this.props.INDEX, newValue)} // for strings could be used newValue + ''
                defaultValue={this.props.min}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                min={this.props.min}
                max={this.props.max}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
