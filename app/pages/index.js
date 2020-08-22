import TextQA from '../compoments/q_text'
import RateQA from '../compoments/q_rate'
import SingleQA from '../compoments/q_SingleChoice'

export default function Home() {
  const qList=['A','B','C']
  return (
    <div>
      <RateQA question = 'How good was ...?' />
      <TextQA question ='What where when who why?' hint='Answer here' />
      <SingleQA question ='Which of the following ...?' qList={qList}/>
      
      <br/>
    </div>
//    <SingleQA  question ='What where when who why?' qList={qList}/>
  )
}
