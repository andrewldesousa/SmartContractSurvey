import React, {useState} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {IconButton, Typography} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import ButtonAppBar from '../../components/header';
import PromptAndChoices from '../../components/questions/create/promptAndChoices';
import PromptOnly from '../../components/questions/create/promptOnly';
import {QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES} from '../../components/questions/questionTypes';
import {makeSurvey, addQuestions} from '../api/store';
import {isAuthenticated} from '../api/auth';
import Signin from '../../components/signin';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '93vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.light,
  },
  description: {
    margin: '2rem',
    width: '80%',
  },
  addQuestionIconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '12rem',
  },
  circleIcon: {
    display: 'box',
  },
  window: {
    width: '90vw',
    height: '75vh',
    padding: '1rem',
    overflowY: 'scroll',
    marginBottom: '1rem',
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
}));

export default function Create() {
  if (!isAuthenticated()) {
    return <Signin/>;
  } else {
    const classes = useStyles(useTheme());
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
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

    async function handleSubmit() {
      const survey = {
        'title': title,
        'description': description,
      };

      const t1 = await isAuthenticated();
      const output = {
        'questions': {
        },
      };
      const surveyResponse = await makeSurvey(survey, t1.token);
      const questionsBody = () => {
        for (let i = 0; i < questions.length; i++) {
          if (ADMIN_PROMPT_ONLY_TYPES[questions[i]['type']]) {
            output['questions'][`q${i}`] = {
              'survey_id': surveyResponse['_id'],
              'question': questions[i]['values']['prompt'],
              'type': questions[i]['type'],
            };
          } else {
            output['questions'][`q${i}`] = {
              'survey_id': surveyResponse['_id'],
              'question': questions[i]['values']['prompt'],
              'options': questions[i]['values']['answers'],
              'type': questions[i]['type'],
            };
          }
        }
      };

      questionsBody();
      addQuestions(output, t1.token);
      window.location.href = 'http://localhost:3000/';
    }

    function createQuestion(questionType) {
      if (questionType === '') {
        return;
      }
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
      }
      setOpen(false);
    }

    function renderQuestions() {
      let output = [];
      for (let i = 0; i < questions.length; i++) {
        const questionType = questions[i]['type'];
        const values = questions[i]['values'];
        if (ADMIN_PROMPT_ONLY_TYPES[questionType.toUpperCase()]) {
          output = output.concat(<Grid item xs={3}><PromptOnly key={i} index={i} type={questionType}
            prompt={values['prompt']} handleChange={handleChange} /></Grid>);
        } else {
          output = output.concat(<Grid item xs={3}><PromptAndChoices key={i} index={i} type={questionType}
            values={values} handleChange={handleChange} /></Grid>);
        }
      }
      return output;
    }

    return (
      <>
        <ButtonAppBar></ButtonAppBar>
        <main className={classes.container}>
          <Paper elevation={3} className={classes.window}>
            <TextField label="Title" className={classes.description}
              onChange={(event) => setTitle(event.target.value)} />
            <TextField label="Description" className={classes.description}
              onChange={(event) => setDescription(event.target.value)} />
            <Grid container wrap="wrap" justify="flex-start" spacing={0}>
              {renderQuestions(questions)}
              <Grid item xs={3} className={classes.addQuestionIconContainer}>
                <div>
                  <IconButton onClick={handleOpen}>
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Paper>

          <Button onClick={handleSubmit} variant="contained">Create Survey</Button>

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
}
