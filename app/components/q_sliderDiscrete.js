import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, CardHeader, Slider, FormLabel } from '@material-ui/core';


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
    width: '60%'
}



export default class DiscreteSlider extends React.Component {

    render() {
        return (
            <div align='center'>
                <br />
                <Card variant="outlined" style={cardStyle}>
                    <CardHeader title={this.props.question} />
                    <CardContent>
                        <FormLabel>{this.props.label}</FormLabel>
                        <GenSlider list={this.props.list} />
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

    const valueLabelFormat = (value) => {
        return `${props.list[value]}`;
    }

    return (
        <span display='inline-block'>
            <div style={sliderStyle}>
                <Slider
                    getAriaValueText={valueLabelFormat}
                    valueLabelFormat={valueLabelFormat}
                    onChange={handleChange}
                    step={1}
                    marks
                    min={0}
                    max={props.list.length - 1}
                    valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
                />
            </div>
            <hr />
            <big>{props.list[value]}</big>
        </span>
    )
}