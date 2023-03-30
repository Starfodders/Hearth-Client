import React from "react";
import "./ErrorIcon.scss";

const ErrorIcon = ({ element }) => {
    //if element is false (therefore empty), render error element
  if (!element) {
    return (
      <div className="error__container">
        <span className="material-symbols-outlined error__icon">error</span>
        <p className="error__message">Please fill in this field</p>
      </div>
    );
  } else {
    return (
        <div className="error__container hidden">
        <span className="material-symbols-outlined error__icon">error</span>
        <p className="error__message">Please fill in this field</p>
      </div>
    )
  }
};

export default ErrorIcon;
