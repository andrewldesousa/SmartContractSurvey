import React from 'react';
import { Card, CardContent, CardHeader, withStyles} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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

var cardStyle = {
    "textAlign": 'left',
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
                        <Choose />
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
  


const Choose = function Yes_No() {
    const handleChange = (event) => {
        setState({ ...state, checked: event.target.checked });
      };
      const [state, setState] = React.useState({
        checked: false
      });
    return (
        <div display='inline-block'>
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>NO</Grid>
                    <Grid item>
                        <Switch color='primary' checked={state.checked} onChange={handleChange} />
                    </Grid>
                    <Grid item>YES</Grid>
                </Grid>
            </Typography>
        </div>
    );
}

/*const styles = StyleSheet.create({
    container: {
        width: 80,
        height: 30,
        backgroundColor: 'grey',
        flexDirection: 'row',
        overflow: 'visible',
        borderRadius: 15,
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowOffset: {
            width: -2,
            height: 2,
        },
    },
    circle: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: 'white',
        marginTop: -2,
        shadowColor: 'black',
        shadowOpacity: 1.0,
        shadowOffset: {
            width: 2,
            height: 2,
        },
    },
    activeContainer: {
        backgroundColor: 'blue',
        flexDirection: 'row-reverse',
    },
    label: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        paddingHorizontal: 6,
        fontWeight: 'bold',
    },
});
*/
/*
export default class YesNo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
        this.toggle = this.toggle.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        // update local state.value if props.value changes....
        if (nextProps.value !== this.state.value) {
            this.setState({ value: nextProps.value });
        }
    }
    toggle() {
        // define how we will use LayoutAnimation to give smooth transition between state change
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        const newValue = !this.state.value;
        this.setState({
            value: newValue,
        });

        // fire function if exists
        if (typeof this.props.onValueChange === 'function') {
            this.props.onValueChange(newValue);
        }
    }
    render() {
        const { value } = this.state;

        return (
            <div align='center'>
                <br />
                <Card variant="outlined" style={cardStyle}>
                    <CardHeader title={this.props.question} />
                    <CardContent>
                        <TouchableOpacity onPress={this.toggle}>
                            <View style={[
                                styles.container,
                                value && styles.activeContainer]}
                            >
                                <View style={styles.circle} />
                                <Text style={styles.label}>
                                    {value ? 'YES' : 'NO'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </CardContent>
                </Card>
            </div>

        );
    }
}

LabeledSwitch.propTypes = {
    onValueChange: React.PropTypes.func,
    value: React.PropTypes.bool,
  };

  LabeledSwitch.defaultProps = {
  };
*/
/*
value={true}
                onValueChange={(val) => console.log(val)}
                disabled={false}
                activeText={'On'}
                inActiveText={'Off'}
                backgroundActive={'green'}
                backgroundInactive={'gray'}
                circleActiveColor={'#30a566'}
                circleInActiveColor={'#000000'} */