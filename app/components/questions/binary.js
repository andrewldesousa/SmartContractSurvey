import React from 'react';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

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
            <Choose />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const Choose = function YesNo() {
  const handleChange = (event) => {
    setState({...state, checked: event.target.checked});
  };
  const [state, setState] = React.useState({
    checked: false,
  });

  const [disabled, setDisabled] = React.useState(false);

  const disableSwitch = () => {
    setDisabled(!disabled);
  };

  return (
    <div display='inline-block'>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>NO</Grid>
          <Grid item>
            <Switch color='primary' disabled={disabled} checked={state.checked} onChange={handleChange} />
          </Grid>
          <Grid item>YES</Grid>
        </Grid>
      </Typography>
    </div>
  );
};
