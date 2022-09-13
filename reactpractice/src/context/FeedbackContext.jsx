import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

// now create a provider
export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is Feedback item 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This is Feedback item 2",
      rating: 3,
    },
    {
      id: 3,
      text: "This is Feedback item 3",
      rating: 7,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  // added boolean to know if it is edited or not

  //delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
// youre returning whatever you wrapped, and eventually all the
// components that need access to the context
// any value you want to pass in, such as state/value - you pass it down to the value
export default FeedbackContext;

// delete all functions in components when using it as context - ex handleDelete/handleAdd
// import useContext and import context components in components now using the context
