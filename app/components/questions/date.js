import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import moment from 'moment';


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
            <PickDate value={this.props.value} INDEX={this.props.INDEX} handleChange={this.props.handleChange}/>
            {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Date picker dialog"
                format="dd/MM/yyyy"
                value={this.props.value ? moment(this.props.value).format('DD/MM/YYYY') : new Date('2000-01-01T00:00:00')}// selectedDate
                onChange={(date, dateString) => this.props.handleChange(this.props.INDEX, dateString) }
                KeyboardButtonProps={{ariaLabel: 'change date'}}
              />
            </MuiPickersUtilsProvider>*/}
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


  function parsePropsValue(value) {
    return value ? moment(value).format('MM/DD/YYYY') : new Date('2000-01-01T00:00:00');
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Date picker dialog"
        format="MM/dd/yyyy"
        value={parsePropsValue(props.value)} // selectedDate
        // onChange={handleDateChange}
        onChange={(event, newValue) => props.handleChange(props.INDEX, newValue)}
        KeyboardButtonProps={{ariaLabel: 'change date'}}
      />
    </MuiPickersUtilsProvider>
  );
}
