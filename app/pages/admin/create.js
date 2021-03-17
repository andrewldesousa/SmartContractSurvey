import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { IconButton, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

import NavBar from '../../components/NavBar';
import PromptAndChoices from '../../components/questions/create/promptAndChoices';
import PromptOnly from '../../components/questions/create/promptOnly';
import { QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES } from '../../components/questions/questionTypes';
import Signin from '../../components/signin';
import { makeSurvey, addQuestions, addOneQuestion } from '../api/store';
import { isAuthenticated } from '../api/auth';


const useStyles = makeStyles((theme) => ({
  container: {
    height: '93vh',
    display: 'flex',
    justifyContent: 'start',
    backgroundColor: theme.palette.primary.light,
  },
  textField: {
    width: '100%',
  },
  questionContainer: {
    width: '70%',
  },
  questionSectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  addQuestionIconContainer: {
    display: 'flex',
    height: '12rem',
  },
  circleIcon: {
    display: 'box',
  },
  leftPane: {
    width: '60%',
    paddingTop: '4rem',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'scroll',

    border: '1px grey solid'
  },
  leftPaneSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightPane: {
    width: '100%',
    display: 'flex',
    overflowY: 'scroll',
    flexDirection: 'column',
  },
  rightPaneTop: {
    height: '14rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    border: '1px grey solid',
    padding: '2rem'
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
    height: '20rem',
    width: '100%',
    overflowY: 'scroll',
  },
  sectionListItem: {
    'display': 'flex',
    'justifyContent': 'center',
    'height': '4rem',
    'width': '100%',
    'alignItems': 'center',
    '&:hover': {
      'backgroundColor': theme.palette.primary.light,
      'cursor': 'pointer',
    },
  },
  createSurveyButton: {
    display: 'flex',
    height: '3rem',
    width: '15rem',
  },
  centerDiv: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  }
}));


export default function Create() {
  if (!isAuthenticated()) {
    return <Signin />;
  } else {
    const classes = useStyles(useTheme());

    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(-1);
    const [open, setOpen] = useState(false);
    const [modalQuestionType, setModalQuestionType] = useState('');


    const openModal = () => {
      setOpen(true);
    };

    const closeModal = () => {
      setOpen(false);
    };

    function deleteQuestion(key) {
      var newQuestionsState = [];
      for (var i = 0; i < questions.length; i++) {
        if (i !== selectedSection) {
          newQuestionsState.push(questions[i]);
        }
        else {
          var selectedSectionQuestions = [];
          for (var j = 0; j < questions[i].length; j++) {
            if (j === key) {
              continue;
            } else {
              selectedSectionQuestions.push(questions[i][j]);
            }
          }
          newQuestionsState.push(selectedSectionQuestions);
        }
      }
      setQuestions(newQuestionsState);
    };

    function handleChange(key, questionData) {
      const values = questionData['values'];
      const questionType = questionData['type'];

      if (ADMIN_PROMPT_ONLY_TYPES[questionData['type'].toUpperCase()]) {
        questionData = {
          type: questionType, values: {
            prompt: values['prompt'],
          }
        };
      } else {
        questionData = {
          type: questionType, values: {
            prompt: values['prompt'],
            answers: values['answers'],
          }
        };
      }

      var updatedQuestionState = Array.from(questions);
      updatedQuestionState[selectedSection][key] = questionData;
      setQuestions(updatedQuestionState);
    };

    async function handleSubmit() {
      const survey = {
        'title': title,
        'description': description,
      };

      const t1 = await isAuthenticated();

      const output = [];

      const surveyResponse = await makeSurvey(survey, t1.token);
      const questionsBody = () => {
        for (let i = 0; i < questions.length; i++) {
          output.push([]);
          for (let j = 0; j < questions[i].length; j++) {
            if (ADMIN_PROMPT_ONLY_TYPES[questions[i]['type']]) {
              output[i].push({
                'survey_id': surveyResponse['_id'],
                'question': questions[i]['values']['prompt'],
                'options': [],
                'type': questions[i]['type'],
                'section_id': i
              });
            } else {
              output[i].push({
                'survey_id': surveyResponse['_id'],
                'question': questions[i]['values']['prompt'],
                'options': questions[i]['values']['answers'],
                'type': questions[i]['type'],
                'section_id': i
              });
            }
          }
        }
      };
      const wallet = {
        'question': {
          'survey_id': surveyResponse['_id'],
          'question': 'Please enter your wallet id?',
          'type': ADMIN_PROMPT_ONLY_TYPES.WALLET
        }
      }
      questionsBody();
      console.log(output)
      addQuestions(output, t1.token);
      addOneQuestion(wallet, t1.token)
      //window.location.href = process.env.REACT_CLIENT_URL;
    }

    function createQuestion(questionType) {
      if (questionType === '') {
        return;
      }

      let questionData = null
      if (ADMIN_PROMPT_ONLY_TYPES[questionType.toUpperCase()]) {
        questionData = {
          type: questionType,
          values: {
            prompt: '',
          },
        };
      } else {
        questionData = {
          type: questionType,
          values: {
            prompt: '',
            answers: [''],
          }
        };
      }

      var updatedQuestionState = questions
      updatedQuestionState.slice(0, selectedSection).concat(updatedQuestionState[selectedSection].push(questionData)).concat(updatedQuestionState.slice(selectedSection + 1, updatedQuestionState.length));
      setQuestions(updatedQuestionState);
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

    function renderQuestionsSection() {
      if (questions.length == 0) return;

      let questionsForSection = questions[selectedSection];
      let output = [];
      for (let i = 0; i < questionsForSection.length; i++) {
        const questionType = questionsForSection[i]['type'];
        const values = questionsForSection[i]['values'];

        if (ADMIN_PROMPT_ONLY_TYPES[questionType.toUpperCase()]) {
          output = output.concat(<div className={classes.questionContainer}>
            <PromptOnly key={i} index={i} type={questionType}
              prompt={values['prompt']} handleChange={handleChange} deleteQuestion={deleteQuestion} /></div>);
        } else {
          output = output.concat(<div className={classes.questionContainer}><PromptAndChoices key={i} index={i} type={questionType}
            values={values} handleChange={handleChange} deleteQuestion={deleteQuestion} /></div>);
        }
      }

      output = output.concat(<div className={classes.centerDiv}><IconButton onClick={openModal} >
        <AddCircleIcon fontSize="large" />
      </IconButton></div>);
      return output;
    }

    function renderSectionTitle() {
      if (selectedSection == -1) return;
      return (
        <>
          <br></br>
          <Typography variant="h3">Section {selectedSection}</Typography>
          <br></br>
          <TextField label="Section Title" className={classes.textField} onChange={(event) => {
            var sectionsUpdated = Array.from(sections);
            sectionsUpdated[selectedSection]['title'] = event.target.value;
            setSections(sectionsUpdated);
          }} value={sections[selectedSection]['title']} />
          <br></br>
          <br></br>
          <TextField label="Section Description" variant="outlined" className={classes.textField} onChange={(event) => {
            var sectionsUpdated = Array.from(sections);
            sectionsUpdated[selectedSection]['description'] = event.target.value;
            setSections(sectionsUpdated);
          }} value={sections[selectedSection]['description']} />
        </>
      );
    }

    return (
      <>
        <NavBar showRightSide={true} />
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

                <div className={classes.centerDiv}>
                  <IconButton onClick={() => {
                    let newSections = sections.concat([{ title: 'New Section', description: '' }])
                    var newQuestions = questions
                    newQuestions.push([]);
                    setSections(newSections);
                    setQuestions(newQuestions);
                    setSelectedSection(newSections.length - 1);
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
            <div className={classes.rightPaneTop}>
              {renderSectionTitle()}
            </div>
            <div className={classes.questionSectionContainer}>
              {renderQuestionsSection()}
            </div>
          </div>

          <Modal
            open={open}
            onClose={closeModal}>
            <Paper className={classes.modal}>
              <Typography variant="h3"><center>What type of question do you want to create?</center></Typography>
              <FormControl>
                <InputLabel>Question Type</InputLabel>
                <Select
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

