import React from 'react';
import {Card, CardContent, CardHeader, TextField} from '@material-ui/core';
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
const infoContainer = {
    width: '100px',
    height: '100px',
    position: 'absolute',
    top : '0' ,
    marginLeft : '-15px',
    marginTop : '10px',
  
  };

export default function NumericQA(props) {
    console.log(props.INDEX);
    return (
        <div align='center'>
            <br/>
            <Card variant="outlined" style={cardStyle}>
            <div style={infoContainer}>
           <QuestionInfo type='numeric' />
          </div>
                <CardHeader title={props.question}/>
                <CardContent>
                    <TextField label={props.hint} variant="outlined" value={props.value}
                               onChange={() => props.handleChange(props.SECTION_INDEX,props.INDEX, event.target.value )}
                    type="number"/>
                </CardContent>
            </Card>
        </div>
    );
}

