import TextQA from '../components/q_text'
import RateQA from '../components/q_rate'
import SingleQA from '../components/q_SingleChoice'
import MultipleQA from '../components/q_MultipleChoice'
import DateQA from '../components/q_date'
import DiscreteSlider from '../components/q_slider'
import DropdownQA from '../components/q_dropdown'
import Wallet from '../components/q_wallet'
import Pagination from '@material-ui/lab/Pagination'
import React from 'react';



export default function Home() {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [items, setItems] = React.useState([]);
  var data;
  const qList=['A','B','C']
  var initial = [<Wallet/>
    ,<DropdownQA question='Choose one of the following' label='Some label' list={qList} />
    ,<RateQA question = 'How good was ...?' />
    ,<TextQA question ='What where when who why?' hint='Answer here' />
    ,<SingleQA question ='Which of the following ...?' qList={qList}/>
    ,<MultipleQA question ='Choose the relevent options.' qList={qList} />
    ,<DateQA question ='When did .....?' label='Date of something' />
    ,<DiscreteSlider question = 'What is the value of...?' label='Value of' min={0} max={100} step={10}/>]

  const [elements, setElement] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3000/api/survey")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          data=result;
          console.log(elements);
          
          data.sections.map((section) => section.questions.map((question, i) => 
            {switch(question.type){
                case "slider":
                  setElement(elements => [...elements,<DiscreteSlider  key= {i} question = {question.prompt} label='' min={0} max={100} step={1}/>]);
                  break;
                case "selectOne":
                  setElement(elements => [...elements,<SingleQA key = {i} question ={question.prompt} qList={question.choices} />]);
                  break;
                case "selectOneOrOther":
                  setElement(elements => [...elements,<MultipleQA key = {i} question ={question.prompt} qList={question.choices} />]);
                  break;
                case "number":
                  setElement(elements => [...elements,<TextQA key = {i} question ={question.prompt} hint='Answer here' />]);
                  break;
                case "rate":
                  setElement(elements => [...elements,<RateQA key = {i} question ={question.prompt}  />]);
                

          } } 
          ));
          console.log("hello")
          console.log(result);
          
          //setItems(result);
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
    const indexOfLastPost =  page * pageSize;
    const indexOfFirstPost = indexOfLastPost - pageSize;
    var paginationStyle = {
      "textAlign": 'center',
      padding: '1.5rem',
      margin: '0 auto',
      display: 'flex',
      color: 'inherit',
      display: 'block',
      width: '70%',
      transitionDuration: 'color 0.15s ease',
      minHeight: '180px'
    }
    const handleChange = (event, value) => {

      setPage(value);
    };

  if (!isLoaded) {
    return <div>Loading...</div>;
  } else { 
  return (
    <div id="Cards"   >
     
      
      {elements.slice(indexOfFirstPost,indexOfLastPost)}
     
      <Pagination count={2}  page={page} shape="rounded" style = {paginationStyle} onChange={handleChange} />
      <br/>
    </div>
  )
}
}
