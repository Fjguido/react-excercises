import { useState, useContext, useEffect } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import FeedbackContext from "../context/FeedbackContext";

function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setbtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setbtnDisabled(false);
      setText(feedbackEdit.item.text);
      setRating(feedbackEdit.item.rating);
    }
  }, [feedbackEdit]);
  // want to add feedbackEdit in brackets so it works whatever you assign
  // the useEffect to do

  const handleTextChange = (e) => {
    if (text === "") {
      setbtnDisabled(true);
      setMessage(null);
      // if text is blank - button is diabled and no message will appear
    } else if (text !== "" && text.trim().length <= 10) {
      setbtnDisabled(true);
      setMessage("Text must at least be 10 characters");
      // if text is less then - it will display set message and button will still be disabled
    } else {
      setMessage(null);
      setbtnDisabled(false);
      // if message is over 10 characters- buton wont be disabled and and setMessage will dissappear
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      setText("");
    }
  };
  // you can check if it works by going to components in inspect and clicking form then checking state
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" version="secondary" isDisabled={btnDisabled}>
            Send
          </Button>
          {/* if didnt include version - button would be purple - check css files - check button.jsx - version is selected to primary*/}
        </div>
        {message && <div className="message">{message}</div>}
        {/* added conditional - so displays when there is message */}
      </form>
      {/*need use state when using form */}
    </Card>
  );
}

export default FeedbackForm;
