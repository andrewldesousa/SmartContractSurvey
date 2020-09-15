import React, {useEffect} from 'react';
import Pagination from '@material-ui/lab/Pagination';
import useSWR from 'swr';

import TextQA from '../components/questions/text';
import RateQA from '../components/questions/rate';
import SingleQA from '../components/questions/singleChoice';
import MultipleQA from '../components/questions/multipleChoice';
import DateQA from '../components/questions/date';
import DiscreteSlider from '../components/questions/slider';
import DropdownQA from '../components/questions/dropdown';
import Wallet from '../components/questions/wallet';
import Likert from '../components/questions/likert';
import ButtonAppBar from '../components/header';


const paginationStyle = {
  textAlign: 'center',
  padding: '1.5rem',
  margin: '0 auto',
  display: 'flex',
  color: 'inherit',
  display: 'block',
  width: '70%',
  transitionDuration: 'color 0.15s ease',
  minHeight: '180px',
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function useSurvey() {
  const {data, error} = useSWR('/api/survey', fetcher);
  return {
    survey: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function parseSurvey(survey) {
  const questions = [];

  survey.sections.map((section) => section.questions.map((question, i) => {
    switch (question.type) {
      case 'slider':
        questions.push(<DiscreteSlider key={i} question={question.prompt} label='' min={0} max={100} step={1}/>);
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
    }
  }));

  return questions;
}


export default function Survey() {
  const {survey, isLoading, isError} = useSurvey();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const changePage = (event, value) => {
    setPage(value);
  };

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error!</p>;

  const questions = parseSurvey(survey);
  const indexOfLastPost = page * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const numOfpages = Math.ceil(questions.length / pageSize);

  console.log(questions.slice(indexOfFirstPost, indexOfLastPost));

  return (
    <>
      <ButtonAppBar/>
      <br/>
      <br/>
      <div id="Cards">
        {questions.slice(indexOfFirstPost, indexOfLastPost)}
        <Pagination count={numOfpages} page={page} shape="rounded" style={paginationStyle} onChange={changePage} />
        <br/>
      </div>
    </>
  );
}
