import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import ButtonAppBar from '../../components/header';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {Typography} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import PromptOnly from '../../components/questions/create/promptOnly';
import QUESTION_TYPES, {ADMIN_PROMPT_ONLY_TYPES} from '../../components/questions/questionTypes';


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
  newQuestionButtonContainer: {
    textAlign: 'center',
    width: '15rem',
    height: '15rem',
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  questionsContainer: {
    height: '70vh',
    width: '90vw',
    maxHeight: '70vh',
    overflowY: 'scroll',
    marginBottom: '4rem',
    justifyContent: 'center',
    justifyItems: 'center',
    border: '1px solid black',
  },
}));


export default function Create() {
  const classes = useStyles(useTheme());
  const [questions, setQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalQuestionType, setModalQuestionType] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleChange(key, value) {
    setQuestions(questions.slice(0, key).concat([{type: 'binary', prompt: value}])
        .concat(questions.slice(key+1, questions.length)));
  };

  function handleSubmit() {
    window.location.href = 'http://localhost:3000/';
  }

  function createQuestion(questionType) {
    switch (questionType) {
      case QUESTION_TYPES.BINARY:
        setQuestions(questions.concat({
          type: QUESTION_TYPES.BINARY,
          prompt: '',
        }));
        break;
      case QUESTION_TYPES.LIKERT:
        break;
      default:
        throw console.error(`Error in createQuestion: \"${questionType}\" is an invalid question type.`);
        break;
    }
    setOpen(false);
  }

  function renderQuestions() {
    let output = [];
    for (let i = 0; i < questions.length; i++) {
      const questionType = questions[i]['type'];
      if (ADMIN_PROMPT_ONLY_TYPES[questionType]) {
        output = output.concat(<PromptOnly key={i} questionKey={i} type={questionType}
          prompt={questions[i]['prompt']} handleChange={handleChange}/>);
      } else {
        throw console.error(`Could not render question this type: ${questionType}`);
      }
    }
    return output;
  }

  return (
    <>
      <ButtonAppBar></ButtonAppBar>
      <main className={classes.container}>
        <div className={classes.questionsContainer}>
          <Grid container wrap="wrap" justify="flex-start">
            {renderQuestions(questions)}
            <Grid item>
              <div className={classes.newQuestionButtonContainer}>
                <Button onClick={handleOpen} variant="contained" color="primary">Add a new question</Button>
              </div>
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
              onChange={(event) => {
                setModalQuestionType(event.target.value);
              }}
            >
              <MenuItem value={QUESTION_TYPES.BINARY}>Binary</MenuItem>
              <MenuItem value={QUESTION_TYPES.LIKERT}>Likert</MenuItem>
            </Select>
            <Button onClick={() => createQuestion(modalQuestionType)}>Create question</Button>
          </Paper>
        </Modal>
      </main>
    </>
  );
}
