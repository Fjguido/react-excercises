import {useState} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm() {
const [text, setText] = useState('')
const [rating, setRating] = useState(10)
const [btnDisabled, setbtnDisabled] = useState(true)
const [message, setMessage] = useState('')


const handleTextChange = (e) => {
    if(text === '') {
        setbtnDisabled(true)
        setMessage(null)
          {/* if text is blank - button is diabled and no message will appear */}
    } else if(text !== '' && text.trim().length <= 10) {
        setbtnDisabled(true)
        setMessage('Text must at least be 10 characters')
          {/* if text is less then - it will display set message and button will still be disabled */}
    } else {
        setMessage(null)
        setbtnDisabled(false)
          {/* if message is over 10 characters- buton wont be disabled and and setMessage will dissappear  */}
    }
    setText(e.target.value)
}
// you can check if it works by going to components in inspect and clicking form then checking state
  return (
    <Card>
    <form>
        <h2>How would you rate your service with us?</h2>
       <RatingSelect  select={(rating) => setRating(rating)}  />
        <div className="input-group">
            <input 
            onChange={handleTextChange} 
            type="text" 
            placeholder="Write a review"
            value={text}/>
            <Button type="submit" version='secondary' isDisabled={btnDisabled}>Send</Button>
             {/* if didnt include version - button would be purple - check css files - check button.jsx - version is selected to primary*/}
        </div>
        {message && <div className='message'>{message}</div>}
          {/* added conditional - so displays when there is message */}
    </form>
    {/*need use state when using form */}

  </Card>
  )
  
}

export default FeedbackForm