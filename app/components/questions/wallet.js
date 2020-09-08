import React from 'react';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';

var cardStyle = {
    'text-align': 'left',
    padding: '1.5rem',
    display: 'flex',
    color: 'inherit',
    display: 'block',
    width: '70%',
    transitionDuration: 'color 0.15s ease',
    minHeight: '180px'
}

export default class Wallet extends React.Component {
    render() {
        return (
            <div align='center'>
                <br />
                <Card variant="outlined" style={cardStyle}>
                    <CardHeader title='Please enter your Wallet ID.' />
                    <CardContent>
                        <div style={{width:'520px'}}>
                        <TextField
                            label="Wallet ID"
                            helperText="This helps us get you paid"
                            style={{ margin: 8 }}
                            fullWidth
                        />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}