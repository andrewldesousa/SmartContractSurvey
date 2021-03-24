import React from 'react';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron} from 'react-bootstrap';

var cardStyle = {
    align: 'left',
    padding: '1.0rem',
    display: 'flex',
    color: 'inherit',
    display: 'block',
    width: '100%',
    transitionDuration: 'color 0.15s ease',
    minHeight: '180px'
}

export default class Wallet extends React.Component {
    render() {
        return (
            <div align='center'>
                <Jumbotron variant="outlined" style={cardStyle}>
                    <CardHeader title='Please enter your Wallet ID.' />
                    <CardContent>
                        <div style={{width:'520px'}}>
                        <TextField
                            value={this.props.value}
                            onChange={() => this.props.handleChange(this.props.INDEX, event.target.value )}
                            label="Wallet ID"
                            helperText="This helps us get you paid"
                            style={{ margin: 8 }}
                            fullWidth
                            required
                        />
                        </div>
                    </CardContent>
                </Jumbotron>
            </div>
        );
    }
}