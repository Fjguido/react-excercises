import PropTpyes from 'prop-types'

function FeedbackStats({feedback}) {
// Calculate ratings avg

 let average = feedback.reduce((acc,cur) => {
    return acc + cur.rating
 },0) / feedback.length
 //added 0 for the second default of the accumalator
console.log(average)

average = average.toFixed(1).replace(/[.,]0$/,'')
// to fixed to show one decimal place. ^ expression to display whole number when there is no decimal needed - "if 0 show nothing"

  return (
    <div className="feedback-stats">
        <h4>{feedback.length} Reviews</h4>
        <h4>Average Rating: {isNaN(average) ? 0 : average}</h4> 
    </div>
  )
}

FeedbackStats.propTpyes = {
    feedback: PropTpyes.array.isRequired,
}

export default FeedbackStats

// added isNaN and ternary 0 so when all stats are gone it will display 0 instead of NaN