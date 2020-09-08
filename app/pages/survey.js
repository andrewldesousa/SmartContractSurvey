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


export default function Home() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  var data;
  const qList=['A', 'B', 'C'];
  var initial = [<Wallet/>];

  const [elements, setElement] = React.useState(initial);
  React.useEffect(() => {
    fetch("http://localhost:3000/api/survey")
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
              data=result;
              data.sections.map((section) => section.questions.map((question, i) => {
                switch (question.type) {
                  case 'slider':
                    setElement((elements) => [...elements, <DiscreteSlider key={i} question={question.prompt}
                      label='' min={0} max={100} step={1}/>]);
                    break;
                  case 'selectOne':
                    setElement((elements) => [...elements, <SingleQA key = {i}
                      question ={question.prompt} qList={question.choices} />]);
                    break;
                  case 'selectOneOrOther':
                    setElement((elements) => [...elements, <MultipleQA key = {i}
                      question={question.prompt} qList={question.choices} />]);
                    break;
                  case 'number':
                    setElement((elements) => [...elements, <TextQA key = {i} question ={question.prompt}
                      hint='Answer here' />]);
                    break;
                  case 'rate':
                    setElement((elements) => [...elements, <RateQA key = {i}
                      question ={question.prompt}/>]);
                    break;
                  case 'likert':
                    setElement((elements) => [...elements, <Likert key = {i}
                      question = {question.prompt}/>]);
                }
              }
            )
          )
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  var contents;
  const [currentPage, setcurrentPage] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const indexOfLastPost = page * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const noOfpages = Math.ceil(elements.length/pageSize);
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
  const handleChange = (event, value) => {
    setPage(value);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <ButtonAppBar/>
        <br/>
        <br/>
        <div id="Cards">
          {elements.slice(indexOfFirstPost, indexOfLastPost)}
          <Pagination count={noOfpages} page={page} shape="rounded" style = {paginationStyle} onChange={handleChange} />
          <br/>
        </div>
      </React.Fragment>
    );
  }
}
