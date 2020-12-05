/* eslint-disable quote-props */
import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import {isAuthenticated} from '../api/auth';
import NavBar from '../../components/NavBar';
import LinkIcon from '@material-ui/icons/Link';
import Signin from '../../components/signin';


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
  const {user} = isAuthenticated();

  function renderSurveyList() {
    const output = [];
    for (let i=0; i<surveyList.length; i++) {
      output.push(<div className={classes.surveyListItem}>
        <div className={classes.titleContainer}>
          <Typography variant="h3">{surveyList[i][0]}</Typography>
        </div>
        <div className={classes.buttonContainer}>
          <Link href="/">
            <IconButton aria-label="link" className={classes.margin}>
              <LinkIcon fontSize="large" />
            </IconButton>
          </Link>
        </div>
      </div>);
    }
    return output;
  }

  if (!isAuthenticated()) {
    return <Signin/>;
  } else {
    return (
      <>
        <NavBar showRightSide={true}/>
        <div className={classes.container}>
          <Typography variant="h2">{user.name + '\'s' + ' Dashboard'}</Typography>
          <Paper elevation={3} className={classes.surveyListContainer}>
            {renderSurveyList()}
          </Paper>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const surveyList = [['Title', 3], ['Tit', 5]];
  return {
    props: {
      surveyList: surveyList,
    },
  };
}
