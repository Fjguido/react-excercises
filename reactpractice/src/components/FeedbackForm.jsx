import {useState} from 'react'
import Card from './shared/Card'

function FeedbackForm() {
const [text, setText] = useState('')

const handleTextChange = (e) => {
    setText(e.target.value)
}
// you can check if it works by going to components in inspect and clicking form then checking state
  return (
    <Card>
    <form>
        <h2>How would you rate your service with us?</h2>
        {/* @todo - rating select component */}
        <div className="input-group">
            <input 
            onChange={handleTextChange} 
            type="text" 
            placeholder="Write a review"
            value={text}/>
            <button type="submit">Send</button>
        </div>
    </form>
    {/*need use state when using form */}

  </Card>
  )
  
}

export default FeedbackForm