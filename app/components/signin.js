import React, { useState } from 'react';
import Layout from './layout';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { Card, CardContent, CardHeader, cardFooter } from '@material-ui/core';
import { signin, authenticate } from '../pages/api/auth';
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { Helmet } from 'react-helmet';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap'
    },
    textField: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    cardHeader: {
        width: "auto",
        textAlign: "center",
        padding: "5px",
    },
    cardFooter: {
        textAlign: "center",
        padding: "1.25rem",
        border: "0",
        borderRadius: "6px",
        justifyContent: "center !important"
    },
    alert: {
        marginTop: '10px',
        padding: '10px',
        backgroundColor: '#f44336',
        color: 'white'
    },
    closebtn: {
        'margin-left': '15px',
        color: 'white',
        'font-weight': 'bold',
        float: 'right',
        'font-size': '22px',
        'line-height': '20px',
        cursor: 'pointer',
        transition: ' 0.3s'
    }
}));

var cardStyle = {
    "textAlign": 'left',
    padding: '1.5rem',
    display: 'flex',
    color: 'inherit',
    display: 'block',
    width: '26%',
    minHeight: '44%',
    transitionDuration: 'color 0.15s ease',
    position: 'fixed',
    marginLeft: '37%',
    marginTop: '12%'
}

var margin1={
    paddingTop:'0.75rem'
}

const Signin = () => {
    const classes = useStyles();
    const router = useRouter()
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
        redirectToReferrer: false
    });

    const { email, password, success, error, redirectToReferrer } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, success: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                    localStorage['name'] = data['user']['name'];
                    localStorage['email'] = data['user']['email'];
                    localStorage['user_id'] = data['user']['_id'];
                    console.log('asf', data);
                });
            }
        });
    };

    const signInForm = () => (
        <div align='center'>
            <Card variant="outlined" style={cardStyle}>
                <CardHeader className={classes.cardHeader} title='Login' />
                <CardContent>
                    <form>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
                            <Input
                                onChange={handleChange('email')}
                                value={email}
                                id="input-with-icon-adornment"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <div align='center'style={margin1}>
                            <Button onClick={clickSubmit} type="submit" variant="contained" color="primary">Sign-in</Button>
                        </div>
                    </form>
                </CardContent>
                <cardFooter>{showError()}</cardFooter>
            </Card>
        </div>
    );

    const showError = () => (
        <div style={{ display: error ? '' : 'none' }}>
            <Alert variant="filled" severity="warning">{error}</Alert>
        </div>
    );

    const showLoading = () =>
        success && (
            //Replace with loading logic 
            <div>
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            router.push('/')
        }
    };
    return (
        <div>
            <Helmet>
                <style>{'body { background-color: #1976d2 ; }'}</style>
            </Helmet>
            <Layout title='Signin'>
                {showLoading()}
                {signInForm()}
                {redirectUser()}
            </Layout>
        </div>
    );
};

export default Signin;