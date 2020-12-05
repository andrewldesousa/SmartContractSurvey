import React from 'react';
import {Card, CardContent, CardHeader, withStyles} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';


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
  //display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '180px',
};


export default class YesNoQuestion extends React.Component {
  static get propTypes() {
    return {
      question: PropTypes.string,
    };
  }

  render() {
    return (
      <div align="center">
        <br />
        <Card variant="outlined" style={cardStyle}>
          <CardHeader title={this.props.question} />
          <CardContent>
            <Choose value={this.props.value} INDEX={this.props.INDEX} handleChange={this.props.handleChange}/>
            {/* <div display='inline-block'>
              <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                  <Grid item>NO</Grid>
                  <Grid item>
                    <Switch color='primary' checked={this.props.value ? this.props.value : false}
                            onChange={(event, newValue) => this.props.handleChange(this.props.INDEX, newValue )}
                    />
                  </Grid>
                  <Grid item>YES</Grid>
                </Grid>
              </Typography>
            </div>*/}
          </CardContent>
        </Card>
      </div>
    );
  }
}

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 24,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);


const Choose = function YesNo(props) {
  const handleChange = (event) => {
    setState({...state, checked: event.target.checked});
  };
  const [state, setState] = React.useState({
    checked: false,
  });
  return (
    <div display='inline-block'>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>NO</Grid>
          <Grid item>
            <Switch color='primary' checked={props.value ? props.value : false}
                    onChange={(event, newValue) => props.handleChange(props.INDEX, newValue )}
            />
          </Grid>
          <Grid item>YES</Grid>
        </Grid>
      </Typography>
    </div>
  );
};
