import "./ErrorIcon.scss";

const ErrorIcon = ({ element, message }) => {

  //html elements already exist for spacing, but are revealed based on if an error is present or not
  if (!element) {
    return (
      <div className="error__container">
        <span className="material-symbols-outlined error__icon"><span aria-hidden = "True">error</span></span>
        <p className="error__message">{message}</p>
      </div>
    );
  } else {
    return (
        <div className="error__container hidden">
        <span className="material-symbols-outlined error__icon"><span aria-hidden = "true">error</span></span>
        <p className="error__message">{message}</p>
      </div>
    )
  }
};

export default ErrorIcon;
