import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import useSWR from 'swr';
import TextQA from '../components/questions/text';
import RateQA from '../components/questions/rate';
import SingleQA from '../components/questions/singleChoice';
import MultipleQA from '../components/questions/multipleChoice';
import DateQuestion from '../components/questions/date';
import DiscreteSlider from '../components/questions/sliderDiscrete';
import Slider from '../components/questions/slider';
import DropdownQA from '../components/questions/dropdown';
import Wallet from '../components/questions/wallet';
import Likert from '../components/questions/likert';
import Button from '@material-ui/core/Button';
import Spinner from '../components/spinner';
import ButtonAppBar from '../components/header';
import { useRouter } from 'next/router'
import responseSubmit from './api/submit';
import YesNoQuestion from '../components/questions/binary';
import DenseAppBar from "../components/footer";


const paginationStyle = {
  textAlign: 'center',
  padding: '1.5rem',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  color: 'inherit',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
};

const submitStyle = {
  textAlign: 'center',
  paddingTop: '10px',
  marginTop: '20px',
  marginLeft: '660px',
  display: 'flex',
  justifyContent: 'center',
  color: 'white',
  width: '100px',
  transitionDuration: 'color 0.15s ease',
};

const spinnerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
};

 const Survey=()=> {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const router = useRouter();
  const { survey, isLoading, isError } = useSurvey();
  const list = [1, 2, 3, 4, 5];


  function submitBtn() {
    const error = responseSubmit();
    setRedirect(error);
  }
   
  function useSurvey() {
    const {data, error} = useSWR('/api/survey', fetcher);
    return {
      survey: data,
      isLoading: !error && !data,
      isError: error,
    };
  }

function parseSurvey(survey) {
  const questions = [<Wallet key={-1}/>];

  survey.sections.map((section) => section.questions.map((question, i) => {
    switch (question.type) {
      case 'sliderDiscrete':
        questions.push(<DiscreteSlider key={i} question={question.prompt} label='' list={list}/>);
        break;
      case 'slider':
        questions.push(<Slider key={i} question={question.prompt} label='' />);
        break;
      case 'dropDown':
        questions.push(<DropdownQA key={i} question={question.prompt} list={question.choices} />);
        break;
      case 'date':
        questions.push(<DateQuestion key={i} question={question.prompt} />);
        break;
      case 'selectOne':
        questions.push(<SingleQA key={i} question ={question.prompt} qList={question.choices}/>);
        break;
      case 'selectOneOrOther':
        questions.push(<MultipleQA key={i} question={question.prompt} qList={question.choices}/>);
        break;
      case 'number':
        questions.push(<TextQA key = {i} question ={question.prompt} hint='Answer here'/>);
        break;
      case 'rate':
        questions.push(<RateQA key={i} question ={question.prompt}/>);
        break;
      case 'likert':
        questions.push(<Likert key={i} question={question.prompt}/>);
        break;
      case 'trueOrFalse':
        questions.push(<YesNoQuestion key={i} question={question.prompt}/>);
        break;
    }
  }));
  questions.push(<Button variant="contained" style={submitStyle} color="primary" onClick={submitBtn} >Submit</Button>);
  return questions;
}

  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [redirect, setRedirect] = React.useState(false);

  const changePage = (event, value) => {
    setPage(value);
  };


  if (isLoading) return <div style={spinnerStyle}><Spinner /></div>;
  if (isError) return <p>Error!</p>;

  const questions = parseSurvey(survey);
  const indexOfLastPost = page * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const numOfpages = Math.ceil(questions.length / pageSize);
  const questionList = () => (
    <div id="Cards">
      {questions.slice(indexOfFirstPost, indexOfLastPost)}
      <Pagination count={numOfpages} page={page} shape="rounded" style={paginationStyle} onChange={changePage} />
      <br />
    </div>
  )

  const redirectUser = () => {
    if (redirect) {
      router.push('/submission')
    }
  };

  return (
    <div>
      <ButtonAppBar />
      <br />
      <br />
      {questionList()}
      {redirectUser()}
      <DenseAppBar />
    </div>
  );
}

export default Survey;
