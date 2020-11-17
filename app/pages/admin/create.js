import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import ButtonAppBar from '../../components/header';
import Binary from '../../components/questions/create/binary';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {Typography} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '4rem',
  },
  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '20rem',
    marginLeft: '30rem',
    marginRight: '30rem',
    height: '10rem',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '15rem',
    height: '15rem',
    margin: '2rem',
  },
  questionsContainer: {
    height: '70vh',
    width: '90vw',
    maxHeight: '70vh',
    overflowY: 'scroll',
    marginBottom: '4rem',
  },
}));


export default function Create() {
  const classes = useStyles(useTheme());
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(key) {
    console.log(key);
    console.log('This is a test');
  };

  function handleSubmit() {
    window.location.href = "http://localhost:3000/";
  }

  function createQuestion() {
    switch ('binary') {
      case 'binary':
        /*
        {
          id: 0,
          type: 'binary',
          question: '',
        }
        */
        setQuestions(questions.concat(<Binary questionKey={questions.length} key={questions.length}></Binary>));
        break;
      case 'likert':
        break;
      default:
        break;
    }
    setOpen(false);
  }

  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <main className={classes.container}>
        <div className={classes.questionsContainer}>
          <Grid container wrap="wrap" justify="flex-start">
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">item</Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} variant="outlined">
                <Button onClick={handleOpen} variant="contained" color="primary">Add a new question</Button>
              </Paper>
            </Grid>
          </Grid>
        </div>

        <Button onClick={handleSubmit} variant="contained" color="primary">Create Survey</Button>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Paper className={classes.modal}>
            <Typography variant="h3">What type of question do you want to create?</Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
            >
              <MenuItem value={'binary'}>Binary</MenuItem>
              <MenuItem value={'likert'}>Likert</MenuItem>
            </Select>
            <Button onClick={() => createQuestion()}>Create question</Button>
          </Paper>
        </Modal>
      </main>
    </>
  );
}
