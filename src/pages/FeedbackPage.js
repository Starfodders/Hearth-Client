import "../styles/FeedbackPage.scss"

const FeedbackPage = () => {
    return (
        <div className="feedback__wrapper">
            <form className="feedback__form">
                <h2 className="feedback__heading">Feedback</h2>
                <p className="feedback__paragraph">Let me know what you liked or disliked about Hearth!</p>
                <p className="feedback__paragraph">Please offer suggestions for improvements, bugs that you've found, or any other comments!</p>
                <textarea className="feedback__text"></textarea>
                <button className="feedback__submit">Submit</button>
                </form>   
        </div>
    );
};

export default FeedbackPage;