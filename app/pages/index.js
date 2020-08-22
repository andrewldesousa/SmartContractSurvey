import TextQA from '../compoments/q_text'
import RateQA from '../compoments/q_rate'

export default function Home() {
  return (
    <div>
      <TextQA  question ='What where when who why?' hint='Answer here' />
      <RateQA question = 'How good was ...?'/>
    </div>
  )
}
