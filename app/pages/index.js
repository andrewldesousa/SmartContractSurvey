import TextQA from '../compoments/q_text'
import RateQA from '../compoments/q_rate'
import SingleQA from '../compoments/q_SingleChoice'
import MultipleQA from '../compoments/q_MultipleChoice'
import DateQA from '../compoments/q_date'
import DiscreteSlider from '../compoments/q_slider'

export default function Home() {
  const qList=['A','B','C']
  return (
    <div>
      <RateQA question = 'How good was ...?' />
      <TextQA question ='What where when who why?' hint='Answer here' />
      <SingleQA question ='Which of the following ...?' qList={qList}/>
      <MultipleQA question ='Choose the relevent options.' qList={qList} />
      <DateQA question ='When did .....?' label='Date of something' />
      <DiscreteSlider question = 'What is the value of...?' label='Value of' min={0} max={100} step={10}/>
      <br/>
    </div>
//    <SingleQA  question ='What where when who why?' qList={qList}/>
  )
}
