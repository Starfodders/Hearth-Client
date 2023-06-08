import React from 'react';

const SpecialCard = ({slide}) => {
    const {title, content, images} = slide
    const mascotPath = require(`../../assets/chapterAssets/${images}.png`)

    function formatContent(content) {
      return content.split(';')
    }

    return (
        <div className="slide__container--special">
        <div className="slide__container--special--left">
          <h1 className="slide__title--special">{title}</h1>
          {formatContent(content).map((paragraph)=>  <p className="slide__content" key ={paragraph}>{paragraph}</p>)}
        </div>
        <div className="slide__container--special--right">
          <img
            src={mascotPath}
            className="slide__container--special--mascot"
            alt = "Cute Purple Friend"
          />
        </div>
      </div>
    );
};

export default SpecialCard;