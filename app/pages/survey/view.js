import React, { useState, useEffect } from 'react';
import { retrieveQuestionsBySurvey } from '../api/retrieve';
import { QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES } from '../../components/questions/questionTypes';
import moment from 'moment';
import Pagination from '@material-ui/lab/Pagination';
import { submit } from '../api/store';
import TextQA from '../../components/questions/text';
import RateQA from '../../components/questions/rate';
import SingleQA from '../../components/questions/singleChoice';
import MultipleQA from '../../components/questions/multipleChoice';
import DateQuestion from '../../components/questions/date';
import DiscreteSlider from '../../components/questions/sliderDiscrete';
import Slider from '../../components/questions/slider';
import DropdownQA from '../../components/questions/dropdown';
import Wallet from '../../components/questions/wallet';
import Likert from '../../components/questions/likert';
import Button from '@material-ui/core/Button';
import Spinner from '../../components/spinner';
import NavBar from '../../components/NavBar';
import { useRouter } from 'next/router';
import { responseSubmitDummy } from '../api/submit';
import YesNoQuestion from '../../components/questions/binary';
import LinearDeterminate from '../../components/progress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import NumericQA from "../../components/questions/numbers";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paginationStyle: {
    textAlign: 'center',
    padding: '1.5rem',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    color: 'inherit',
    width: '70%',
    transitionDuration: 'color 0.15s ease',
  },
  submitStyle: {
    paddingTop: '10px',
    marginTop: '20px',
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    color: 'white',
    width: '100px',
  },
  spinnerStyle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  section: {
    margin: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  line: {
    width: '20%',
    backgroundColor: 'black',
  }
}));


export default function Survey(prop) {
  const classes = useStyles(useTheme());
  const [questionsVal, setQuestions] = useState([]);
  const [sectionsVal, setSections] = useState([]);
  const [walletVal, setWallet] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const getData = (sid) => {
    retrieveQuestionsBySurvey(sid).then((data) => {
      if (data.error) {
        console.log('Error loding survey data!');
      } else {
        const dataWithAnswer = [];
        const sections = [];
        let ans = ''
        for (let i = 0; i < data.length; i++) {

          dataWithAnswer.push([]);
          sections.push([data[i]['title'], data[i]['description']])

          for (let j = 0; j < data[i]['questions'].length; j++) {

            if (data[i]['questions'][j]['type'] == QUESTION_TYPES.BINARY) {
              ans = false
            }
            else if (data[i]['questions'][j]['type'] == QUESTION_TYPES.SLIDER) {
              ans = '0'
            }
            else if (data[i]['questions'][j]['type'] == QUESTION_TYPES.SLIDER_DISCRETE) {
              ans = '0'
            }
            else if (data[i]['questions'][j]['type'] == QUESTION_TYPES.SLIDER) {
              ans = '0'
            }
            else if (data[i]['questions'][j]['type'] == QUESTION_TYPES.DATE) {
              ans = moment(new Date()).format('MM/DD/YYYY')
            }
            else if (data[i]['questions'][j]['type'] == 'wallet') {
              setWallet([data[i]['questions'][j]['_id'], '']);
            }
            else {
              ans = ''
            }
            dataWithAnswer[i].push({
              '_id': data[i]['questions'][j]['_id'],
              'type': data[i]['questions'][j]['type'],
              'question': data[i]['questions'][j]['question'],
              'answer': ans,
              'options': data[i]['questions'][j]['options'],
            });
          }
        }
        setSections(sections);
        setQuestions(dataWithAnswer);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    const Id = prop.sid;
    getData(Id);
  }, [prop]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function submitSurvey() {
    const cleanRes = {
      'responses': {},
    };

    let flag = true;
    var u = 0;
    for (let i = 0; i < questionsVal.length; i++) {
      for (let j = 0; j < questionsVal[i].length; ++j) {
        u += 1;
        if (questionsVal[i][j].answer != '' || questionsVal[i][j].type == QUESTION_TYPES.BINARY) {
          if (questionsVal[i][j].type == QUESTION_TYPES.MULTIPLE_CHOICE) {
            const list = questionsVal[i][j].answer.split("");
            for (let k = 0; k < list.length; ++k) {
              if (list[i] == 1) {
                cleanRes.responses[`Q${u}`] = {
                  'question_id': questionsVal[i][j]._id,
                  'answer': questionsVal[i][j].options[k],
                }
              }
            }
          }
          else {
            cleanRes.responses[`Q${u}`] = {
              'question_id': questionsVal[i][j]._id,
              'answer': questionsVal[i][j].answer,
            }
          };
        }
        else {
          if (questionsVal[i][j].type != 'wallet') {
            flag = false
            handleClose();
            alert(`Fill value for ${questionsVal[i][j].question}`)
            break;
          }
          else {
            if (walletVal[1] == '') {
              flag = false
              handleClose();
              alert(`Fill value for ${questionsVal[i][j].question}`)
              break;
            }
          }
        }
      }
    }

    cleanRes.responses[`W1`] = {
      'question_id': walletVal[0],
      'answer': walletVal[1],
    }

    if (flag) {
      const error = submit(cleanRes);
      setRedirect(error);
    }
  }

  function handleChange(i, k, answer) {
    console.log(answer,i,k)
    console.log(questionsVal[i][k])
    const type = questionsVal[i][k]['type'];
    const question = questionsVal[i][k]['question'];
    const _id = questionsVal[i][k]['_id'];
    const options = questionsVal[i][k]['options'];
    const newQuestionVal = []
    for (var a = 0; a < questionsVal.length; ++a) {
      newQuestionVal.push([])
      for (var b = 0; b < questionsVal[a].length; ++b) {
        if (i == a && b == k) {
          newQuestionVal[a].push({ type: type, options: options, question: question, answer: answer, options: questionsVal[i][k]['options'], _id: _id })
        }
        else
          newQuestionVal[a].push(questionsVal[a][b])
      }
    }
    setQuestions(newQuestionVal)
  };

  const questions = [];
  function populatePage(page_index, section, j,size) {
    //console.log(section)
    for (var i = 0; i < section.length; i++) {
      const question = section[i];
      switch (question.type) {
        case QUESTION_TYPES.SLIDER_DISCRETE:
          questions[page_index].push(<DiscreteSlider key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} label='' list={question.options} value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.SLIDER:
          questions[page_index].push(<Slider key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} label='' value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.DROPDOWN:
          questions[page_index].push(<DropdownQA key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} list={question.options} value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.DATE:
          questions[page_index].push(<DateQuestion key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.SINGLE_CHOICE:
          questions[page_index].push(<SingleQA key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} qList={question.options} value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.MULTIPLE_CHOICE:
          questions[page_index].push(<MultipleQA key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} qList={question.options} value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.TEXT:
          questions[page_index].push(<TextQA key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} hint='Answer here' value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.RATE:
          questions[page_index].push(<RateQA key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.LIKERT:
          questions[page_index].push(<Likert key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.BINARY:
          questions[page_index].push(<YesNoQuestion key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} value={question['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.NUMERIC:
          questions[page_index].push(<NumericQA key={i} SECTION_INDEX={j} INDEX={i+size} question={question.question} hint='Answer here' value={question['answer']} handleChange={handleChange} />);
          break;
      }
    }
    numOfpages += 1
  }

  function parseSurvey(survey) {
    var page_index = 0;
    survey.map((section, j) => {
      var pageCount = Math.ceil((section.length - 1) / 5)
      if (pageCount == 0) {
        pageCount = 1
      }
      for (var i = 0; i < pageCount; ++i) {
        questions.push([]);
        if (page_index == 0) {
          questions[page_index].push(<Wallet key={-1} question={'What is your wallet id?'}
            label='' handleChange={() => setWallet([walletVal[0], event.target.value])} value={walletVal[1]} />);
        }
        questions[page_index].push(<Typography className={classes.section} key={-1} variant="h2">{sectionsVal[j][0]}</Typography>);
        questions[page_index].push(<hr className={classes.line} key={-1}/>);
        questions[page_index].push(<Typography className={classes.section} key={-1} variant="h3">{sectionsVal[j][1]}</Typography>);

        if (i > 0) {
          questions.push([])
        }
        populatePage(page_index, section.slice((5 * i), ((i + 1) * 5)), j, (i * 5));
        page_index += 1;
      }
    });
    //numOfpages = page_index + 1;
    //console.log("PAGE:",page_index)
    if (questions.length > 0) {
      questions[page_index - 1].push(<div>
        <div className={classes.flexContainer}>
          <Button variant="contained" className={classes.submitStyle} color="primary" onClick={handleClickOpen} >
            Submit</Button></div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Submission'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to submit ? You will initiate a blockchain transaction and participate in lottery.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submitSurvey} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>);
    }
    var pageList=[];
    for(var x=0; x<questions.length; ++x) {
      if (questions[x].length==0)
        break;
      else
        pageList.push(questions[x])
    }
    return pageList;
  }

  const [page, setPage] = React.useState(1);
  const [redirect, setRedirect] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  var numOfpages = 1;
  if (isLoading) return <div className={classes.spinnerStyle}> <Spinner /></div>;
  const questionsList = parseSurvey(questionsVal);

  const changePage = (event, value) => {
    setPage(value);
    setProgress((value) / numOfpages * 100);
  };

  const questionList = () => (
    <div id="Cards">
      {questionsList[page - 1]}
      <Pagination
        count={questionsList.length}
        page={page}
        shape="rounded"
        className={classes.paginationStyle}
        onChange={changePage} />
      <br />
    </div>
  );

  const redirectUser = () => {
    if (redirect) {
      router.push('/submission');
    }
  };

  return (
    <div>
      <NavBar />
      <LinearDeterminate progress={progress} />
      <br />
      <br />
      {questionList()}
      {redirectUser()}
    </div>
  );
};