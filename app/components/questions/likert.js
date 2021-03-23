import React from 'react';
import {Card, CardContent, CardHeader, FormControl, FormControlLabel, RadioGroup, Radio} from '@material-ui/core';

const labels = {
  0: 'No Response',
  1: 'Strongly disagree',
  2: 'Disagree',
  3: 'Neutral',
  4: 'Agree',
  5: 'Strongly Disagree',
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
};

export default class Likert extends React.Component {
  render() {
    return (
      <div align='center'>
        <br />
        <Card variant="outlined" style={cardStyle}>
          <CardHeader title={this.props.question} />
          <CardContent>
            <Rate value={this.props.value} SECTION_INDEX={this.props.SECTION_INDEX} INDEX={this.props.INDEX} handleChange={this.props.handleChange}/>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const Rate = function HoverRating(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
 console.log(props.SECTION_INDEX)
  return (
    <FormControl component="fieldset">
      <RadioGroup row value={props.value} onChange={(event) => props.handleChange(props.SECTION_INDEX, props.INDEX, event.target.value)}>
        <FormControlLabel
          value="1"
          control={<Radio color="primary" />}
          label="Strongly Disagree"
          labelPlacement="bottom"
          style={{float: 'right', padding: '0.75rem'}}
        />
        <FormControlLabel
          value="2"
          control={<Radio color="primary" />}
          label="Disagree"
          labelPlacement="bottom"
          style={{float: 'right', padding: '0.75rem'}}
        />
        <FormControlLabel
          value="3"
          control={<Radio color="primary" />}
          label="Neutral"
          labelPlacement="bottom"
          style={{
            float: 'right',
            padding: '0.75rem',
            marginLeft: '2.75em'}}
        />
        <FormControlLabel
          value="4"
          control={<Radio color="primary" />}
          label="Agree"
          labelPlacement="bottom"
          style={{float: 'right', padding: '0.75rem', marginLeft: '3.2em'}}
        />
        <FormControlLabel
          value="5"
          control={<Radio color="primary" />}
          label="Strongly Agree"
          labelPlacement="bottom"
          style={{float: 'right', padding: '0.75rem', marginLeft: '3.2em'}}
        />
      </RadioGroup>
    </FormControl>
  );
};
