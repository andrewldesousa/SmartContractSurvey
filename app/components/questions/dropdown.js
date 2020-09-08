import React from 'react'
import { Card, CardContent, CardHeader, InputLabel, NativeSelect, FormControl, TextField } from '@material-ui/core';

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

export default class DropdownQA extends React.Component {
    render() {
        return (
            <div align='center'>
                <br />
                <Card variant="outlined" style={cardStyle}>
                    <CardHeader title={this.props.question} />
                    <CardContent>
                        <Drop_down list={this.props.list} label={this.props.label} />
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
    }
    return (
        <div>
            <TextField
                select
                style={FormStyle}
                label={props.label}
                value={state.age}
                onChange={handleChange}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
            >
                <option value="" />
                {props.list.map(listitem => (
                    <option value={listitem}>{listitem}</option>
                ))}
            </TextField>
        </div>
    )
}