import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';


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

export default class DateQuestion extends React.Component {
  render() {
    return (
      <div align='center'>
        <br />
        <Card variant="outlined" style={cardStyle}>
          <CardHeader title={this.props.question} />
          <CardContent>
            <PickDate/>
          </CardContent>
        </Card>
      </div>
    );
  }
}

function PickDate(props) {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2000-01-01T00:00:00'));
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date picker dialog"
        format="MM/dd/yyyy"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{ariaLabel: 'change date'}}
      />
    </MuiPickersUtilsProvider>
  );
}
