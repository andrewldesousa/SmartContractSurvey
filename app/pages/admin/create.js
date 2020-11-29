import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ButtonAppBar from '../../components/header';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeSurvey, addQuestions } from '../api/store';
import { isAuthenticated } from '../api/auth';
import Signin from '../../components/signin';

import PromptAndChoices from '../../components/questions/create/promptAndChoices';
import PromptOnly from '../../components/questions/create/promptOnly';
import { QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES } from '../../components/questions/questionTypes';


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

  function handleChange(key, questionData) {
    const values = questionData['values'];
    const questionType = questionData['type'];

    console.log(questionData);
    if (ADMIN_PROMPT_ONLY_TYPES[questionData['type'].toUpperCase()]) {
      setQuestions(questions.slice(0, key).concat([{ type: questionType, values: { prompt: values['prompt'] } }])
        .concat(questions.slice(key + 1, questions.length)));
    } else {
      setQuestions(questions.slice(0, key).concat([{
        type: questionType, values: {
          prompt: values['prompt'],
          answers: values['answers'],
        }
      }]).concat(questions.slice(key + 1, questions.length)));
    }
  };

  async function handleSubmit() {
    const survey = {
      'description': description,
    };

<<<<<<< HEAD
    function handleChange(key, questionData) {
      const values = questionData['values'];
      const questionType = questionData['type'];
      if (ADMIN_PROMPT_ONLY_TYPES[questionData['type'].toUpperCase()]) {
        setQuestions(questions.slice(0, key).concat([{type: questionType, values: {prompt: values['prompt']}}])
            .concat(questions.slice(key + 1, questions.length)));
      } else {
        setQuestions(questions.slice(0, key).concat([{
          type: questionType, values: {
            prompt: values['prompt'],
            answers: values['answers'],
          },
        }]).concat(questions.slice(key + 1, questions.length)));
      }
    };
=======
>>>>>>> 12c762e976cf92c0cfb14115ccdff795fb864003

    const t1 = await isAuthenticated();

    makeSurvey(survey, t1.token);

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

<<<<<<< HEAD
      questionsBody();
      addQuestions(output, t1.token);
      window.location.href = 'http://localhost:3000/';
=======
  function createQuestion(questionType) {
    if (questionType === '') {
      return;
    }

    console.log(questionType);
    if (ADMIN_PROMPT_ONLY_TYPES[questionType.toUpperCase()]) {
      setQuestions(questions.concat({
        type: questionType,
        values: {
          prompt: '',
        },
      }));
    } else {
      setQuestions(questions.concat({
        type: questionType,
        values: {
          prompt: '',
          answers: [''],
        },
      }));
>>>>>>> 12c762e976cf92c0cfb14115ccdff795fb864003
    }
    setOpen(false);
  }

  function renderQuestions() {
    let output = [];
    for (let i = 0; i < questions.length; i++) {
      const questionType = questions[i]['type'];
      const values = questions[i]['values'];
      if (ADMIN_PROMPT_ONLY_TYPES[questionType.toUpperCase()]) {
        output = output.concat(<Grid item><PromptOnly key={i} index={i} type={questionType}
          prompt={values['prompt']} handleChange={handleChange} /></Grid>);
      } else {
        output = output.concat(<Grid item><PromptAndChoices key={i} index={i} type={questionType}
          values={values} handleChange={handleChange} /></Grid>);
      }
    }
    return output;
  }

  const auth = <>
    <ButtonAppBar></ButtonAppBar>
    <main className={classes.container}>
      <Paper elevation={3} className={classes.window}>
        <TextField label="Description" className={classes.description}
          onChange={(event) => setDescription(event.target.value)} />
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
  const unauth = <Signin />
  if (!isAuthenticated()) {
    return unauth
  }
  else {
    return auth
  }
}