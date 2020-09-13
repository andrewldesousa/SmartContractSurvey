import TextQA from '../components/questions/text';
import RateQA from '../components/questions/rate';
import SingleQA from '../components/questions/singleChoice';
import MultipleQA from '../components/questions/multipleChoice';
import DateQA from '../components/questions/date';
import DiscreteSlider from '../components/questions/slider';
import DropdownQA from '../components/questions/dropdown';
import Wallet from '../components/questions/wallet';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import Likert from '../components/questions/likert';
import ButtonAppBar from '../components/header';

import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json());

function useSurvey() {
  const {data, error} = useSWR('/api/survey', fetcher);
  return {
    survey: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Survey() {
  const {survey, isLoading, isError} = useSurvey();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);

  const initial = [<Wallet key={1}/>];

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error!</p>;

  // const questions = survey.sections.map((section) => section.questions.map((question, i) => {
  //   switch (question.type) {
  //     case 'slider':
  //       setElement((elements) => [...elements, <DiscreteSlider key={i} question={question.prompt}
  //         label='' min={0} max={100} step={1}/>]);
  //       break;
  //     case 'selectOne':
  //       setElement((elements) => [...elements, <SingleQA key = {i}
  //         question ={question.prompt} qList={question.choices} />]);
  //       break;
  //     case 'selectOneOrOther':
  //       setElement((elements) => [...elements, <MultipleQA key = {i}
  //         question={question.prompt} qList={question.choices} />]);
  //       break;
  //     case 'number':
  //       setElement((elements) => [...elements, <TextQA key = {i} question ={question.prompt}
  //         hint='Answer here' />]);
  //       break;
  //     case 'rate':
  //       setElement((elements) => [...elements, <RateQA key = {i}
  //         question ={question.prompt}/>]);
  //       break;
  //     case 'likert':
  //       setElement((elements) => [...elements, <Likert key = {i}
  //         question = {question.prompt}/>]);
  //   }
  // }

  // var contents;
  const indexOfLastPost = page * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const noOfpages = Math.ceil(elements.length/ pageSize);
  // const paginationStyle = {
  //   textAlign: 'center',
  //   padding: '1.5rem',
  //   margin: '0 auto',
  //   display: 'flex',
  //   color: 'inherit',
  //   display: 'block',
  //   width: '70%',
  //   transitionDuration: 'color 0.15s ease',
  //   minHeight: '180px',
  // };
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };


  return (
    <>
      <ButtonAppBar/>
      <br/>
      <br/>
      <div id="Cards">
        {elements.slice(indexOfFirstPost, indexOfLastPost)}
        <Pagination count={noOfpages} page={page} shape="rounded" style = {paginationStyle} onChange={handleChange} />
        <br/>
      </div>
    </>
  );
}
