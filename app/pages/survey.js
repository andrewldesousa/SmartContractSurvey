import TextQA from '../components/questions/text'
import RateQA from '../components/questions/rate'
import SingleQA from '../components/questions/SingleChoice'
import MultipleQA from '../components/questions/MultipleChoice'
import DateQA from '../components/questions/date'
import DiscreteSlider from '../components/questions/slider'
import DropdownQA from '../components/questions/dropdown'
import Wallet from '../components/questions/wallet'
import Pagination from '@material-ui/lab/Pagination';



export default function Home() {
  const qList=['A','B','C']
  var elements = [<Wallet/>
    ,<DropdownQA question='Choose one of the following' label='Some label' list={qList} />
    ,<RateQA question = 'How good was ...?' />
    ,<TextQA question ='What where when who why?' hint='Answer here' />
    ,<SingleQA question ='Which of the following ...?' qList={qList}/>
    ,<MultipleQA question ='Choose the relevent options.' qList={qList} />
    ,<DateQA question ='When did .....?' label='Date of something' />
    ,<DiscreteSlider question = 'What is the value of...?' label='Value of' min={0} max={100} step={10}/>]
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

   
  return (
    <div id="Cards"   >
     
      {elements.slice(indexOfFirstPost, indexOfLastPost)}
     
      <Pagination count={2}  page={page} shape="rounded" style = {paginationStyle} onChange={handleChange} />
      <br/>
    </div>
  )
}
