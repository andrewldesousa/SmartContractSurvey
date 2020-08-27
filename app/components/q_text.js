import React from 'react';
import { Card,CardContent,CardHeader,TextField  } from '@material-ui/core';

var cardStyle = {
  'text-align': 'left',
  padding:'1.5rem',
  display: 'flex',
  color: 'inherit',
  display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '180px'
}

export default class TextQA extends React.Component{
  render(){
    return(
      <div align='center'>
        <br/>
        <Card variant="outlined" style={cardStyle}>
            <CardHeader title={this.props.question}/>       
            <CardContent>
              <TextField  label={this.props.hint} variant="outlined" />
            </CardContent>          
        </Card>
      </div>
    );
  }
}