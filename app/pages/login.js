import {Link, useHistory} from 'react-router-dom';
import {authenticate, signin} from '../auth';
import React from 'react';

export default function Signin(props) {
    const history = useHistory();
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {email, password, success, error} = values;

    const handleChange = (event, name) => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false});
        signin({email, password}).then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false});
            } else {
                authenticate(data, () => {
                    history.push("/survey")
                });
            }
        });
    };

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function () {
        setCardAnimation("");
    }, 700);

    const classes = useStyles();
    
    const {...rest} = props;

    return(
        <div></div>
    );
}