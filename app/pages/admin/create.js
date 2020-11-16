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
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {makeSurvey, addQuestions} from '../api/store';
import {isAuthenticated} from '../api/auth';

import PromptOnly from '../../components/questions/create/promptOnly';
import {QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES} from '../../components/questions/questionTypes';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  description: {
    margin: '2rem',
    width: '80%',
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
  newQuestionButtonContainer: {
    textAlign: 'center',
    width: '15rem',
    height: '15rem',
    margin: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  window: {
    width: '90vw',
    height: '80vh',
    overflowY: 'scroll',
    marginBottom: '1rem',
  },
}));


export default function Create() {
  const classes = useStyles(useTheme());
  const [questions, setQuestions] = useState([]);
  const [description, setDescription] = useState('');
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
    const survey = {
      'description': description,
    };

    

    const t1 = isAuthenticated()
    console.log(description)
    console.log(t1.token)

    console.log(makeSurvey(survey, t1.token))
    console.log("FLAG")
    // const questionsBody = {
    //   'questions': {
    //     'q1': {
    //       'survey_id': surveyId,
    //       'question': '',
    //       'type': 'MCQ',
    //     },
    //   },
    // };
    // addQuestions(questionsBody, token);
    //window.location.href = 'http://localhost:3000/';
  }

  function createQuestion(questionType) {
    if (ADMIN_PROMPT_ONLY_TYPES[questionType.toUpperCase()]) {
      setQuestions(questions.concat({
        type: questionType,
        prompt: '',
      }));
    } else {
      throw console.error(`Error in createQuestion: \"${questionType}\" is an invalid question type.`);
    }
    setOpen(false);
  }

  function renderQuestions() {
    let output = [];
    for (let i = 0; i < questions.length; i++) {
      const questionType = questions[i]['type'];
      if (ADMIN_PROMPT_ONLY_TYPES[questionType.toUpperCase()]) {
        output = output.concat(<Grid item><PromptOnly key={i} questionKey={i} type={questionType}
          prompt={questions[i]['prompt']} handleChange={handleChange}/></Grid>);
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
        <Paper elevation={3} className={classes.window}>
          <TextField label="Description" className={classes.description}
            onChange={(event) => setDescription(event.target.value)}/>
          <Grid container wrap="wrap" justify="flex-start" spacing={0}>
            {renderQuestions(questions)}
            <Grid item>
              <div className={classes.newQuestionButtonContainer}>
                <Button onClick={handleOpen} variant="contained" color="primary">Add a new question</Button>
              </div>
            </Grid>
          </Grid>
        </Paper>

        <Button onClick={handleSubmit} variant="contained" color="primary">Create Survey</Button>

        <Modal
          open={open}
          onClose={handleClose}
        >
          <Paper className={classes.modal}>
            <Typography variant="h3">What type of question do you want to create?</Typography>
            <Select
              onChange={(event) => {
                setModalQuestionType(event.target.value);
              }}>
              {Object.keys(QUESTION_TYPES).map((key, index) => (
                <MenuItem key={index} value={QUESTION_TYPES[key]}>{key}</MenuItem>))}
            </Select>
            <Button onClick={() => createQuestion(modalQuestionType)}>Create question</Button>
          </Paper>
        </Modal>
      </main>
    </>
  );
}
