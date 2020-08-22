import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, CardHeader, Slider } from '@material-ui/core';

var cardStyle = {
    "textAlign": 'left',
    padding: '1.5rem',
    display: 'flex',
    color: 'inherit',
    display: 'block',
    width: '70%',
    transitionDuration: 'color 0.15s ease',
    minHeight: '180px'
  }

var sliderStyle = {
    width:'60%'
}

function valuetext(value) {
    return `${value}`;
}

export default class DiscreteSlider extends React.Component{
    render(){
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
                            defaultValue={this.props.min}
                            getAriaValueText={valuetext}
//                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
//                            step={this.props.step}
//                            marks
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
