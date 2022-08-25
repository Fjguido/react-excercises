import { v4 as uuidv4 } from 'uuid'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
//Browser Router actually uses the HTML5 history API to keep our user interface in sync with the URL.
//Hash router, on the other hand, uses the hash portion of the URL to keep it in sync.
import { useState } from 'react'
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import FeedbackData from './data/FeedbackData'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'

function App() {

    const [feedback, setFeedback] = useState((FeedbackData))
    
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            setFeedback(feedback.filter((item) => 
                item.id !== id))
        }
    }

    const addFeedback = (newFeedback) => {
        newFeedback.id = uuidv4()
        setFeedback([newFeedback, ...feedback])
        {/* global feedback state so it can make changes to rating average, number of reviews and fully display on app 
    - used spread operator to include all old feedback - if i only displayed newFeedback - it wil only display new feedback*/}
    }

    
    return (
        <Router> 
        <Header  />
        <div className='container'>
     
            <FeedbackForm handleAdd={addFeedback} />
            <FeedbackStats  feedback={feedback}/>
            <FeedbackList
            feedback={feedback} 
            handleDelete={deleteFeedback} />  
        <Routes>
            <Route exact path='/about' element={<AboutPage />} />
        </Routes>
            {/* need to wrap route between routes for it to work */}
        
            
        </div>
        </Router>
    )
}



export default App