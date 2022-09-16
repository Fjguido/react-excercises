import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

// now create a provider
export const FeedbackProvider = ({ children }) => {
  //set true by default then when the output loads its false
  const [isLoading, setIsloading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });
  // added boolean to know if it is edited or not

  // useEffect takes in a function and an argument of dependencies (array of dependencies)
  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(
      `http://localhost:3001/feedback?_sort=id&_order=desc`
    );
    const data = await response.json();
    setFeedback(data);
    setIsloading(false);
  };

  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch(`http://localhost:3001/feedback?_sort=id&_order=desc`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  //delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {

    await fetch(`http://localhost:3001/feedback/${id}`, { method: 'DELETE' })

      setFeedback(feedback.filter((item) => item.id !== id))
    }
  };

  // Update feedback item
  // return array because you want to mutate the item how you want
  // for each feedback youre calling in an item, is that item id equal
  // to the id we want to update, if so we want to spread across the current
  // item and spread across the updated item, else if it doesnt match id
  // just return item.
  const updateFeedback = (id, updateItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updateItem } : item
      )
    );
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
        updateFeedback,
        isLoading,
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
