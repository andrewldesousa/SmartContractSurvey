import React from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox, Card, CardHeader } from '@material-ui/core';
import { Email, Https } from '@material-ui/icons'
const styles = theme => ({
    margin: {
        margin: theme.spacing(2),
    },
    padding: {
        'text-align': 'left',
        padding: '1.5rem',
        display: 'flex',
        color: 'inherit',
        display: 'block',
        width: '45%',
        transitionDuration: 'color 0.15s ease',
        minHeight: '180px'
    }
});

class LoginTab extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div align='center'>
                <br />
                <Paper className={classes.padding}>
                    <CardHeader color="primary" title='Login' align='center'/>
                    <div className={classes.margin}>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username" label="Username" type="email" fullWidth autoFocus required />
                            </Grid>
                            <Grid item>
                                <Email />
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} alignItems="flex-end">
                            <Grid item md={true} sm={true} xs={true}>
                                <TextField id="username" label="Password" type="password" fullWidth required />
                            </Grid>
                            <Grid item>
                                <Https />
                            </Grid>
                        </Grid>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <FormControlLabel control={
                                    <Checkbox
                                        color="primary"
                                    />
                                } label="Remember me" />
                            </Grid>
                            <Grid item>
                                <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" style={{ marginTop: '10px' }}>
                            <Button variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                        </Grid>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(LoginTab);