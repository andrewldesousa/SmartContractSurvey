import React, { useState } from 'react';
import Layout from "./layout";
import { signup } from '../pages/api/auth';
import { Card, CardContent, CardHeader, Button, TextField, FormControl, InputLabel, IconButton, Input, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Helmet } from 'react-helmet';
import Alert from '@material-ui/lab/Alert';
import Link from "next/link";

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
    marginTop: '10%'
}

var margin1 = {
    paddingTop: '0.75rem'
}


const Signup = () => {
    const classes = useStyles();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

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
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };


    const signUpForm = () => (
        <div>
            <Card variant="outlined" style={cardStyle}>
                <CardHeader className={classes.cardHeader} title='Signup' />
                <CardContent>
                    <form>
                        <FormControl className={classes.margin}>
                            <TextField
                                label="Username"
                                required
                                placeholder="Enter Name"
                                onChange={handleChange('name')}
                            />
                        </FormControl>
                        <FormControl className={classes.margin}>
                            <TextField
                                label="Email"
                                required
                                placeholder="Enter Email"
                                type="email"
                                onChange={handleChange('email')}
                            />
                        </FormControl>
                        <FormControl className={clsx(classes.margin, classes.textField)}>
                            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                            <Input
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                required
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
                        <div align='center' style={margin1}>
                            <Button onClick={clickSubmit} type="submit" variant="contained" color="primary">Sign-up</Button>
                        </div>
                        <div align='center' style={margin1}>
                            <Link href="/login">
                            <Button type="submit" variant="contained" color="primary">Redirect To Login</Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
                <cardFooter>{showError()}</cardFooter>
                <cardFooter>{showSuccess()}</cardFooter>
            </Card>
        </div>
    );

    const showError = () => (
        <div style={{ display: error ? '' : 'none' }}>
           <Alert variant="filled" severity="warning">{error}</Alert> 
        </div>
    );

    const showSuccess = () => (
        <div  style={{ display: success ? '' : 'none' }}>
            <Alert variant="filled" severity="success">New account created.</Alert>
        </div>
    );
    return (
        <div>
            <Helmet>
                <style>{'body { background-color: #1976d2 ; }'}</style>
            </Helmet>
            <Layout title="SignUp">
                {signUpForm()}
            </Layout>
        </div>
    );
};

export default Signup;