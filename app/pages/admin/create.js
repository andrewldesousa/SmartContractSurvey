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
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import NavBar from '../../components/NavBar';
import PromptAndChoices from '../../components/questions/create/promptAndChoices';
import PromptOnly from '../../components/questions/create/promptOnly';
import {QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES} from '../../components/questions/questionTypes';
import Signin from '../../components/signin';
import {makeSurvey, addQuestions} from '../api/store';
import {isAuthenticated} from '../api/auth';


const useStyles = makeStyles((theme) => ({
  container: {
    height: '93vh',
    flexGrow:1,
    display: 'flex',
    justifyContent: 'start',
    backgroundColor: theme.palette.primary.light,
  },
  textField: {
    width: '100%',
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
  leftPane: {
    width: '60%',
    paddingTop: '4rem',
    border: '1px grey solid',
    backgroundColor: 'white',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  leftPaneSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  rightPane: {
    width: '100%',
    padding: '8rem',
  },
  paper: {
    minHeight: '100%',
  },

  modal: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15rem',
    marginLeft: '30rem',
    marginRight: '30rem',
    minHeight: "220px",
    width: "40%"
  },
  MenuItem: {
    marginTop: "30px",
  },
  button: {
    marginTop: "20px"
  },
  sectionListContainer: {
    marginTop: '1rem',
    minHeight: '100%',
    maxHeight: '100%',
    width: '100%',
    overflowY: 'scroll',
  },
  sectionListItem: {
    display: 'flex',
    height: '4rem',
    width: '100%',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer',
    },
  },
  createSurveyButton: {
    display: 'flex',
    height: '3rem',
    width: '15rem',
  }
}));

export default function Create() {
  if (!isAuthenticated()) {
    return <Signin/>;
  } else {
    const classes = useStyles(useTheme());
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(-1);
    const [open, setOpen] = useState(false);
    const [modalQuestionType, setModalQuestionType] = useState('');

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };


    function deleteQuestion(key) {
      setQuestions(questions.slice(0, key).concat(questions.slice(key + 1, questions.length)));
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

    function renderSectionList() {
      const output = [];
  
      for (let i = 0; i < sections.length; i++) {
        output.push(
          <div className={classes.sectionListItem} onClick={() => {
            setSelectedSection(i);
          }}>
            <Typography variant="h3">{sections[i].title}</Typography>
          </div>);
      }
      return output;
    }

    function renderQuestions() {
      console.log('here')
      if (sections.length == 0) { return; }
      if (questions.length-1 > selectedSection || questions.length == 0) { return; }

      
      
      let questionsForSection = questions[selectedSection];
      let output = [];
      for (let i = 0; i < questionsForSection.length; i++) {
        const questionType = questionsForSection[i]['type'];
        const values = questionsForSection[i]['values'];
        if (ADMIN_PROMPT_ONLY_TYPES[questionType.toUpperCase()]) {
          output = output.concat(<Grid item xs={3}><PromptOnly key={i} index={i} type={questionType}
            prompt={values['prompt']} handleChange={handleChange} deleteQuestion={deleteQuestion}/></Grid>);
        } else {
          output = output.concat(<Grid item xs={3}><PromptAndChoices key={i} index={i} type={questionType}
            values={values} handleChange={handleChange} deleteQuestion={deleteQuestion}/></Grid>);
        }
      }

      output = output.concat(<IconButton onClick={handleOpen}>
                              <AddCircleIcon fontSize="large" />
                            </IconButton>);
      return output;
    }

    return (
      <>
        <NavBar showRightSide={true}/>
        <main className={classes.container}>
          <div className={classes.leftPane}>
              <div className={classes.leftPaneSection}>
                <Typography variant="h3">Define the survey you'd like to create</Typography>
                <br></br>
                <TextField label="Survey Title" className={classes.textField}
                  onChange={(event) => setTitle(event.target.value)} />
                <br></br>
                <br></br>
                <TextField label="Survey Description" multiline rows={6} variant="outlined" className={classes.textField}
                  onChange={(event) => setDescription(event.target.value)} />
              </div>

              <br></br>
              <br></br>


              <div className={classes.leftPaneSection}>
                <div>
                  <Typography variant="h3">Define the sections of the survey</Typography>
                </div>
                <Paper elevation={3} className={classes.sectionListContainer}>
                  {renderSectionList()}

                  <div>
                    <IconButton onClick={() => {
                      let newSections = sections.concat([{title: 'New Section', description: ''}])
                      let newQuestions = questions.concat([])
                      setSections(newSections)
                      setQuestions(newQuestions);
                      setSelectedSection(newSections.length-1);
                    }}>
                      <AddCircleIcon fontSize="large" />
                    </IconButton>
                  </div>
                </Paper>
                <br></br>
                <br></br>
                <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.createSurveyButton}>Create Survey</Button>
              </div>
          </div>

          <div className={classes.rightPane}>
            {renderQuestions()}
          </div>
          
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Paper className={classes.modal}>
              <Typography variant="h3"> <center>What type of question do you want to create? </center></Typography>
              <FormControl>
              <InputLabel id="demo-simple-select-error-label">Question Type</InputLabel>
              <Select
                  id="demo-simple-select-readonly"
                  labelId="demo-simple-select-error-label"
                onChange={(event) => {
                  setModalQuestionType(event.target.value);
                }}>
                {Object.keys(QUESTION_TYPES).map((key, index) => (
                  <MenuItem className={classes.MenuItem} key={index} value={QUESTION_TYPES[key]}>{key}</MenuItem>))}
              </Select>
                <FormHelperText>Choose a question Type</FormHelperText>
              </FormControl>
              <Button className={classes.button} color="primary" variant="contained" onClick={() => createQuestion(modalQuestionType)}>Create question</Button>
            </Paper>
          </Modal>
        </main>
      </>
    );
  }
}

