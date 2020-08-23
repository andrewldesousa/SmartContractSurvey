import TextQA from '../components/q_text'
import RateQA from '../components/q_rate'
import SingleQA from '../components/q_SingleChoice'
import MultipleQA from '../components/q_MultipleChoice'
import DateQA from '../components/q_date'
import DiscreteSlider from '../components/q_slider'
import DropdownQA from '../components/q_dropdown'
import Wallet from '../components/q_wallet'

export default function Home() {
  const qList=['A','B','C']
  return (
    <div>
      <Wallet/>
      <DropdownQA question='Choose one of the following' label='Some label' list={qList} />
      <RateQA question = 'How good was ...?' />
      <TextQA question ='What where when who why?' hint='Answer here' />
      <SingleQA question ='Which of the following ...?' qList={qList}/>
      <MultipleQA question ='Choose the relevent options.' qList={qList} />
      <DateQA question ='When did .....?' label='Date of something' />
      <DiscreteSlider question = 'What is the value of...?' label='Value of' min={0} max={100} step={10}/>
      <br/>
    </div>
  )
}
