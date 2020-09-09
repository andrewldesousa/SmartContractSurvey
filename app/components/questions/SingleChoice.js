import React from 'react'
import { Card, CardContent, CardHeader, Radio, RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';

var cardStyle = {
    textAlign: 'left',
    padding: '1.5rem',
    display: 'flex',
    color: 'inherit',
    display: 'block',
    width: '70%',
    transitionDuration: 'color 0.15s ease',
    minHeight: '220px'
}



export default class SingleQA extends React.Component {

    render() {
        return (
            <div align='center'>
                <br />
                <Card variant="outlined" style={cardStyle}>
                    <CardHeader title={this.props.question} />
                    <CardContent>
                        <QList list={this.props.qList} />
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
                    {props.list.map(listitem => (
                        <FormControlLabel value={listitem} control={<Radio color="primary" />} label={listitem} />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    )
}