import "../styles/FeedbackPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";

const FeedbackPage = () => {

    const [feedbackInput, setFeedbackInput] = useState('')
    const [confirmSubmission, setConfirmSubmission] = useState(false)

    function submitForm(e) {
        e.preventDefault()
        if (feedbackInput.length <= 0) {
            return;
        }
        else {
            axios.post('http://localhost:8080/feedback', {
                message: feedbackInput
            })
            .then((data) => {
                console.log(data);
                setFeedbackInput('')
                setConfirmSubmission(true)
                setTimeout(() => {
                    setConfirmSubmission(false)
                }, 2500)
            })
            .catch((error) => {
                console.log(error);
            })
        }
        
    }

  return (
    <div className="feedback__wrapper">
      <form className="feedback__form" onSubmit = {(e) => submitForm(e)}>
        <h2 className="feedback__heading">Feedback</h2>
        <p className="feedback__paragraph">
          Let me know what you liked or disliked about Hearth!
        </p>
        <p className="feedback__paragraph">
          Please offer suggestions for improvements, bugs that you've found, or
          any other comments!
        </p>
        <textarea className="feedback__text" onChange = {(e) => setFeedbackInput(e.target.value)} value = {feedbackInput} placeholder= "Feedback, Bugs, Suggestions!" aria-label = "Feedback Input Field"></textarea>
        {confirmSubmission ? <p className="feedback__success">Thanks! Submission Received.</p>:<button className="feedback__submit">Submit</button>}
      </form>
    </div>
  );
};

export default FeedbackPage;
