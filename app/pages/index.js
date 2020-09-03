import TextQA from '../components/q_text'
import RateQA from '../components/q_rate'
import SingleQA from '../components/q_SingleChoice'
import MultipleQA from '../components/q_MultipleChoice'
import DateQA from '../components/q_date'
import SliderQA from '../components/q_slider'
import DropdownQA from '../components/q_dropdown'
import Wallet from '../components/q_wallet'
import Pagination from '@material-ui/lab/Pagination';
import Likert from '../components/q_likert'
import YesNo from '../components/q_binary'
import DiscreteSlider from '../components/q_sliderDiscrete'

export default function Home() {
  const qList=['A','B','C']
  var elements = [<Wallet/>
    ,<DropdownQA question='Choose one of the following' label='Some label' list={qList} />
    ,<RateQA question = 'How good was ...?' />
    ,<TextQA question ='What where when who why?' hint='Answer here' />
    ,<SingleQA question ='Which of the following ...?' qList={qList}/>
    ,<MultipleQA question ='Choose the relevent options.' qList={qList} label='Some lable' />
    ,<SliderQA question = 'What is the value of...?' label='Value of' min={0} max={100}/>
    ,<Likert question="Covid 19 is the worst thing in my life."/>
    ,<YesNo question="Drinking on a weekday is retarded."/>
    ,<DiscreteSlider question = 'What is the value of...?' label='Value of' list={['a','b','c','d','e','f']} />]
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
