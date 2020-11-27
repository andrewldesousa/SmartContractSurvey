import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import AppBar from '../../components/header';
import {Button} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  surveyListContainer: {
    marginTop: '3rem',
    height: '40rem',
    width: '40rem',
    overflowY: 'scroll',
  },
  surveyListItem: {
    display: 'flex',
    height: '4rem',
    width: '100%',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer',
    },
  },
  surveyListItem: {
    display: 'flex',
    height: '4rem',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer',
    },
  },
  titleContainer: {
    paddingLeft: '2rem',
  },
  buttonContainer: {
    paddingRight: '2rem',
  },
}));

export default function AdminProfile(props) {
  const classes = useStyles(useTheme());
  const surveyList = props.surveyList;

  function renderSurveyList() {
    const output = [];
    for (let i=0; i<surveyList.length; i++) {
      output.push(<div className={classes.surveyListItem}>
        <div className={classes.titleContainer}>
          <Typography variant="h3">{surveyList[i][0]}</Typography>
        </div>
        <div className={classes.buttonContainer}>
          <IconButton aria-label="link" className={classes.margin}>
            <LinkIcon fontSize="large" />
          </IconButton>
          <IconButton aria-label="delete" className={classes.margin}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </div>
      </div>);
    }
    return output;
  }

  return (
    <>
      <AppBar></AppBar>
      <div className={classes.container}>
        <Typography variant="h2">{props.name + '\'s' + ' Profile'}</Typography>
        <Paper elevation={3} className={classes.surveyListContainer}>
          {renderSurveyList()}
        </Paper>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const name = 'Andrew Desousa';
  const email = 'desousa.andrew11@gmail.com';
  const surveyList = [['Title', 3], ['Tit', 5]];

  return {
    props: {
      name: name,
      email: email,
      surveyList: surveyList,
    },
  };
}