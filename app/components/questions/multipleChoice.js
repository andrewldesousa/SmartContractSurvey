import React from 'react';
import {Card, CardContent, CardHeader, Checkbox, RadioGroup, FormControl, FormControlLabel, FormLabel} from '@material-ui/core';


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
                <br />
                <Card variant="outlined" style={cardStyle}>
                    <CardHeader title={this.props.question} />
                    <CardContent>

                        <QList list={this.props.qList} label={this.props.label} />
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
                <RadioGroup >
                    <FormLabel component='legend'>{props.label}</FormLabel>
                    {props.list.map(listitem => (
                        <FormControlLabel value={listitem} control={<Checkbox color="primary" />} label={listitem} labelPlacement='end' />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    )
}