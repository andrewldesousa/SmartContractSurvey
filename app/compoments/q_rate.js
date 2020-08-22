import React from 'react';
import { Card, CardContent, CardHeader, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const labels = {
  0.5: 'Bad',
  1: 'Bad+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const rateStyle = {
    width: 200,
    display: 'flex',
    alignItems: 'center',
};

var cardStyle = {
  textAlign: 'left',
  padding: '1.5rem',
  display: 'flex',
  color: 'inherit',
  display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '180px'
}

export default class RateQA extends React.Component {

  render() {
    return (
      <div align='center'>
        <br />
        <Card variant="outlined" style={cardStyle}>
          <CardHeader title={this.props.question} />
          <CardContent>
            <Rate/>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const Rate= function HoverRating() {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  

  return (
    <div >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        size="large"
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
    </div>
  );
}