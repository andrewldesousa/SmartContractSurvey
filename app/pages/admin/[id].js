/* eslint-disable quote-props */
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { isAuthenticated } from '../api/auth';
import NavBar from '../../components/NavBar';
import LinkIcon from '@material-ui/icons/Link';
import Signin from '../../components/signin';
import { copyButton } from '../../components/copyButton'
import {retrieveSurveyByOwner} from '../api/retrieve'
import BarChartIcon from '@material-ui/icons/BarChart';

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
    height: '35rem',
    width: '40rem',
    overflowY: 'scroll',
  },
  surveyListItem: {
    display: 'flex',
    height: '100%',
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
  copyText: {
    fontSize: 0,
    display: 'none',
  },
  newSurveyButton: {
    marginTop: '2rem',
  },
}));

export default function AdminProfile(props) {
  const classes = useStyles(useTheme());

  const [surveyList, setSurveyList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const {user} = isAuthenticated();
  const token = isAuthenticated().token;

  async function fetchData(u, t) {
    const data = await retrieveSurveyByOwner(u._id, t);
    const output = [];
    for (let i=0; i<data.length; i++) {
      output.push([data[i].title, data[i]._id]);
    }
    setSurveyList(output);
    setLoading(false);
  }

  useEffect(() => {
    fetchData(user, token);
  }, []);


  const handleTooltipOpen = () => {
    setOpen(true);
  };

  function renderSurveyList() {
    const output = [];

    for (let i = 0; i < surveyList.length; i++) {
      output.push(<div className={classes.surveyListItem}>
        <div className={classes.titleContainer}>
          <Typography variant="h3">{surveyList[i][0]}</Typography>
        </div>
        <textarea id={`${i}-link`}
          className={classes.copyText}>{process.env.REACT_CLIENT_URL + '/survey/land?sid=' + surveyList[i][1]}
        </textarea>

        <div className={classes.buttonContainer}>
          <IconButton onClick={() => {
            const copyText = document.getElementById(`${i}-link`);
            copyText.select();
            navigator.clipboard.writeText(copyText.value);
          }}>
            <LinkIcon></LinkIcon>
          </IconButton>
          <Link href={`visualization?sid=${surveyList[i][1]}`}>
            <IconButton>
              <BarChartIcon/>
            </IconButton>
          </Link>
        </div>
      </div>);
    }
    return output;
  }

  if (isLoading) return (<p>Loading...</p>);

  if (!isAuthenticated()) {
    return <Signin />;
  } else {
    return (
      <>
        <NavBar showRightSide={true} />
        <div className={classes.container}>
          <Typography variant="h2">{user.name + '\'s' + ' Dashboard'}</Typography>
          <br></br>
          <Typography variant="p">
            Your created surveys are listed below. You may access the data visuals and referral links for each survey.
          </Typography>


          <Paper elevation={3} className={classes.surveyListContainer}>
            {renderSurveyList()}
          </Paper>

          <Link href="create"><Button variant="outlined" className={classes.newSurveyButton}>Create New Survey</Button></Link>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
    },
  };
}
