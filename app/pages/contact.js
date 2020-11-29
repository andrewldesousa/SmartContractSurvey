import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from "next/link";

const useStyles = makeStyles({
    root: {
        height: "250px",
        width: "300px",
        marginLeft: "550px",
        marginTop: "50px"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Contact Us
                </Typography>
                <br/>
                <Typography className={classes.pos} color="textSecondary">
                    Name - Daniel Obermeier
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Mobile Number - +49(0)8928925745
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Email - daniel.obermeier@tum.de
                </Typography>
                <center>
                    <Link href="/">
                    <Button variant="outlined" color="primary">
                        Go Back
                    </Button>
                </Link>
                </center>
            </CardContent>
        </Card>
    );
}