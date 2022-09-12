import {Link} from 'react-router-dom'
import Card from '../components/shared/Card'
function AboutPage() {

  return  <Card>
    <div className="about">
        <h1>About this Project</h1>
        <p>React project to post feedback for a product</p>
        <p>
          <Link to='/'>Back To Home</Link>
        </p>
    </div>

  </Card> 
}

export default AboutPage