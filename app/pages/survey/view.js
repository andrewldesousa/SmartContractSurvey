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
}));


export default function Survey(prop) {
  const classes = useStyles(useTheme());
  const [questionsVal, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  const getData = (sid) => {

    retrieveQuestionsBySurvey(sid).then((data) => {
      if (data.error) {
        console.log('Error loding survey data!');
      } else {
        const dataWithAnswer = [];
        let ans=''
        for (let i = 0; i < data.length; i++) {
          dataWithAnswer.push([]);
          for (let j = 0; j < data[i].length; j++) {
            if (data[i][j]['type']==QUESTION_TYPES.BINARY) {
              ans = false
            }
            else if (data[i][j]['type']==QUESTION_TYPES.SLIDER) {
              ans='0'
            }
            else if (data[i][j]['type']==QUESTION_TYPES.SLIDER_DISCRETE) {
              ans='0'
            }
            else if (data[i][j]['type']==QUESTION_TYPES.SLIDER) {
              ans='0'
            }
            else if (data[i][j]['type']==QUESTION_TYPES.DATE) {
              ans=moment(new Date()).format('MM/DD/YYYY') 
            }
            else {
              ans = ''
            }
            dataWithAnswer[i].push({
                  '_id': data[i][j]['_id'],
                  'type': data[i][j]['type'],
                  'question': data[i][j]['question'],
                  'answer': ans,
                  'options': data[i][j]['options'],
                });
          }
        }

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

  function submitBtn() {
    const error = responseSubmitDummy();
    setRedirect(error);
  }

  function submitSurvey() {
    const cleanRes = {
      'responses': {},
    };

    let flag = true;
    for (let k = 0; k < questionsVal.length; ++k) {
      if (questionsVal[k].answer != '' || questionsVal[k].type == QUESTION_TYPES.BINARY) {
        if (questionsVal[k].type == QUESTION_TYPES.MULTIPLE_CHOICE) {
          const list = questionsVal[k].answer.split("");
          for (let i=0; i<list.length; ++i) {
            if (list[i]==1) {
              cleanRes.responses[`Q${questionsVal.length+(1+i)}`] = {
                'question_id': questionsVal[k]._id,
                'answer': questionsVal[k].options[i],
              }
            }
          }
        }
        else {
          cleanRes.responses[`Q${k}`] = {
            'question_id': questionsVal[k]._id,
            'answer': questionsVal[k].answer,
          }
        };
      }
      else {
        flag = false
        handleClose()
        alert(`Fill value for ${questionsVal[k].question}`)
        break;
      }
    }

    if (flag) {
      const error = submit(cleanRes);
      setRedirect(error);
    }
  }

  function handleChange(k, answer) {
    const type = questions[k]['type'];
    const question = questions[k]['question'];
    const _id = questionsVal[k]['_id'];
    const options = questionsVal[k]['options'];
    setQuestions(questionsVal.slice(0, k).concat([{ type: type, options: options, question: question, answer: answer, options: questionsVal[k]['options'], _id: _id }])
        .concat(questionsVal.slice(k + 1, questionsVal.length)));
  };

  function parseSurvey(survey) {
    // const questions = [<Wallet key={-1}/>];

    
    const questions = [];
    var global_index = 0;
    var page_index = 0;
    survey.map((section, j) => {
      
      questions.push([]);


      


      for(var i=0; i<section.length; i++) {
        if (i%5 == 0 && i>0) {
          questions.push([]);
          page_index +=1;
        }
        
        const question = section[i];
        switch (question.type) {
          case QUESTION_TYPES.WALLET:
            questions[page_index].push(<Wallet key={global_index} INDEX={global_index} question={question.question} label='' list={question.options} value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.SLIDER_DISCRETE:
            questions[page_index].push(<DiscreteSlider key={global_index} INDEX={global_index} question={question.question} label='' list={question.options} value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.SLIDER:
            questions[page_index].push(<Slider key={global_index} INDEX={global_index} question={question.question} label='' value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.DROPDOWN:
            questions[page_index].push(<DropdownQA key={global_index} INDEX={global_index} question={question.question} list={question.options} value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.DATE:
            questions[page_index].push(<DateQuestion key={global_index} INDEX={global_index} question={question.question} value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.SINGLE_CHOICE:
            questions[page_index].push(<SingleQA key={global_index} INDEX={global_index} question={question.question} qList={question.options} value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.MULTIPLE_CHOICE:
            questions[page_index].push(<MultipleQA key={global_index} INDEX={global_index} question={question.question} qList={question.options} value={questionsVal[i]['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.TEXT:
            questions[page_index].push(<TextQA key={global_index} INDEX={global_index} question={question.question} hint='Answer here' value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.RATE:
            questions[page_index].push(<RateQA key={global_index} INDEX={global_index} question={question.question} value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.LIKERT:
            questions[page_index].push(<Likert key={global_index} INDEX={global_index} question={question.question} value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.BINARY:
            questions[page_index].push(<YesNoQuestion key={global_index} INDEX={global_index} question={question.question} value={question['answer']} handleChange={handleChange} />);
            break;
          case QUESTION_TYPES.NUMERIC:
            questions[page_index].push(<NumericQA key={global_index} INDEX={global_index} question={question.question} hint='Answer here' value={question['answer']} handleChange={handleChange} />);
            break;
      }
      
      global_index += 1;
    }

    page_index += 1;
    });

    console.log(questions)
    return questions;
  }

  function renderSubmitSection() {
    if (page > numOfpages) {
      return;
    }
    return (<div>
          <div className={classes.flexContainer}><Button variant="contained" className={classes.submitStyle} color="primary" onClick={handleClickOpen} >
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
        </div>
    )
  }

  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [redirect, setRedirect] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  if (isLoading) return <div className={classes.spinnerStyle}> <Spinner /></div>;
  const questions = parseSurvey(questionsVal);

  const indexOfLastPost = page * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  var numOfpages = Math.ceil((questions.length - 1) / pageSize);

  if(numOfpages == 0)
  {
    numOfpages = 1
  }
  const changePage = (event, value) => {
    setPage(value);
    setProgress((value) / numOfpages * 100);
  };



  const questionList = () => (
      <div id="Cards">
        {questions[page-1]}
        <Pagination count={questionsVal.length} page={page} shape="rounded" className={classes.paginationStyle} onChange={changePage} />
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
      {renderSubmitSection()}
      {redirectUser()}
    </div>
  );
};