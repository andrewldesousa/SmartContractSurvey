import React from 'react';
import {Card, CardContent, CardHeader, Box} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { QuestionInfo} from '../info';
const labels = {
  0: 'No Response',
  0.5: 'Unacceptable',
  1: 'Bad',
  1.5: 'Poor',
  2: 'Satisfactory',
  2.5: 'Average',
  3: 'Above Average',
  3.5: 'Nice',
  4: 'Good',
  4.5: 'Great',
  5: 'Excellent',
};

const rateStyle = {
  width: 200,
  display: 'flex',
  alignItems: 'center',
};

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

export default class RateQA extends React.Component {
  render() {
    return (
      <div align='center'>
        <br />
        <Card variant="outlined" style={cardStyle}>
        <div style={infoContainer}>
           <QuestionInfo type='rate' />
          </div>
          <CardHeader title={this.props.question} />
          <CardContent>
            <Rate key={this.props.key} value={this.props.value} SECTION_INDEX={this.props.SECTION_INDEX} INDEX={this.props.INDEX} handleChange={this.props.handleChange}/>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const Rate= function HoverRating(props) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(0);

  return (
    <span display='inline-block'>
      <Rating
        name={props.key}
        value={props.value ? props.value : 0}
        precision={0.5}
        size="large"
        onChange={(event, newValue) => {
          setValue(newValue);
          props.handleChange(props.SECTION_INDEX,props.INDEX, newValue)
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      <hr/>
      {value !== null && <Box ml={2} style={{float: 'left'}}>{labels[hover !== -1 ? hover : value]}</Box>}
    </span>
  );
};
