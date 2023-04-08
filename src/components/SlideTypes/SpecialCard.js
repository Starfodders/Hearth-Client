import React from 'react';

const SpecialCard = ({slide}) => {
    const {title, content, images} = slide
    return (
        <div className="slide__container--special">
        <div className="slide__container--special--left">
          <h1 className="slide__title--special">{title}</h1>
          <p className="slide__content">{content}</p>
        </div>
        <div className="slide__container--special--right">
          .
          <img
            src={`http://localhost:8080/${images}`}
            className="slide__container--special--mascot"
          />
        </div>
      </div>
    );
};

export default SpecialCard;