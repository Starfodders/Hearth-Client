import React from "react";
import "./ErrorIcon.scss";

const ErrorIcon = ({ element, message }) => {


  if (!element) {
    return (
      <div className="error__container">
        <span className="material-symbols-outlined error__icon">error</span>
        <p className="error__message">{message}</p>
      </div>
    );
  } else {
    return (
        <div className="error__container hidden">
        <span className="material-symbols-outlined error__icon">error</span>
        <p className="error__message">{message}</p>
      </div>
    )
  }
};

export default ErrorIcon;
