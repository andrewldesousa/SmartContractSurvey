import React, {useState, useEffect} from 'react';
import {retrieveQuestionsBySurvey} from '../api/retrieve';
import {QUESTION_TYPES, ADMIN_PROMPT_ONLY_TYPES} from '../../components/questions/questionTypes';

import Pagination from '@material-ui/lab/Pagination';

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
import {useRouter} from 'next/router';
import {responseSubmitDummy} from '../api/submit';
import YesNoQuestion from '../../components/questions/binary';
import DenseAppBar from '../../components/footer';
import LinearDeterminate from '../../components/progress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {makeStyles, useTheme} from '@material-ui/core/styles';

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


export const View = (prop) => {
  const classes = useStyles(useTheme());
  const [questionsVal, setQuestions] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const getData = (sid)=> {
    retrieveQuestionsBySurvey(sid).then((data) => {
      if (data.error) {
        console.log('Error loding survey data!');
      } else {
        const dataWithAnswer = [];
        for (let i=0; i<data.length; i++) {
          dataWithAnswer.push(
              {
                '_id': data[i]['_id'],
                'type': data[i]['type'],
                'question': data[i]['question'],
                'answer': '',
                'options': data[i]['options'],
              },
          );
        }

        setQuestions(dataWithAnswer);
        setLoading(false);
      }
    });
  };
  useEffect(()=>{
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

  function handleChange(k, answer) {
    const type = questionsVal[k]['type'];
    const question = questionsVal[k]['question'];
    const _id = questionsVal[k]['_id'];
    setQuestions(questionsVal.slice(0, k).concat([{type: type, question: question, answer: answer, options: questionsVal[k]['options'], _id: _id}])
        .concat(questionsVal.slice(k + 1, questionsVal.length)));
  };


  function parseSurvey(survey) {
    // const questions = [<Wallet key={-1}/>];
    const questions =[];
    survey.map((question, i)=>{
      switch (question.type) {
        case QUESTION_TYPES.WALLET:
          questions.push(<Wallet key={i} INDEX={i} question={question.question} label='' list={question.options } value={questionsVal[i]['answer']} handleChange={handleChange}/>);
          break;
        case QUESTION_TYPES.SLIDER_DISCRETE:
          questions.push(<DiscreteSlider key={i} INDEX={i} question={question.question} label='' list={question.options } value={questionsVal[i]['answer']} handleChange={handleChange}/>);
          break;
        case QUESTION_TYPES.SLIDER:
          questions.push(<Slider key={i} INDEX={i} question={question.question} label='' value={questionsVal[i]['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.DROPDOWN:
          questions.push(<DropdownQA key={i} INDEX={i} question={question.question} list={question.options} value={questionsVal[i]['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.DATE:
          questions.push(<DateQuestion key={i} INDEX={i} question={question.question} value={questionsVal[i]['answer']} handleChange={handleChange} />);
          break;
        case QUESTION_TYPES.SINGLE_CHOICE:
          questions.push(<SingleQA key={i} INDEX={i} question ={question.question} qList={question.options} value={questionsVal[i]['answer']} handleChange={handleChange}/>);
          break;
        case QUESTION_TYPES.MULTIPLE_CHOICE:
          questions.push(<MultipleQA key={i} INDEX={i} question={question.question} qList={question.options} value={questionsVal[i]['answer']} handleChange={handleChange}/>);
          break;
        case QUESTION_TYPES.TEXT:
          questions.push(<TextQA key = {i} INDEX={i} question ={question.question} hint='Answer here' value={questionsVal[i]['answer']} handleChange={handleChange}/>);
          break;
        case QUESTION_TYPES.RATE:
          questions.push(<RateQA key={i} INDEX={i} question ={question.question} value={questionsVal[i]['answer']} handleChange={handleChange}/>);
          break;
        case QUESTION_TYPES.LIKERT:
          questions.push(<Likert key={i} INDEX={i} question={question.question} value={questionsVal[i]['answer']} handleChange={handleChange}/>);
          break;
        case QUESTION_TYPES.BINARY:
          questions.push(<YesNoQuestion key={i} INDEX={i} question={question.question} value={questionsVal[i]['answer']} handleChange={handleChange}/>);
          break;
      }
    });
    questions.push(<div className={classes.flexContainer}><Button variant="contained" className={classes.submitStyle} color="primary" onClick={handleClickOpen} >
      Submit</Button></div>);
    questions.push(<Dialog
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
        <Button onClick={submitBtn} color="primary" autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>);
    return questions;
  }

  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [redirect, setRedirect] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  if (isLoading) return <div className={classes.spinnerStyle}> <Spinner /></div>;
  const questions = parseSurvey(questionsVal);

  const indexOfLastPost = page * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const numOfpages = Math.ceil((questions.length-1) / pageSize);
  const changePage = (event, value) => {
    setPage(value);
    setProgress((value - 1) / numOfpages * 100);
  };

  const questionList = () => (
    <div id="Cards">
      {questions.slice(indexOfFirstPost, indexOfLastPost)}
      <Pagination count={numOfpages} page={page} shape="rounded" className={classes.paginationStyle} onChange={changePage} />
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
