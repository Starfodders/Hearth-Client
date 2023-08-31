import "./Card.scss";
import { useEffect, useState } from "react";

const CardImageImports = ({ src }) => {
  const imageSource = require(`../../assets/chapterAssets/${src.images}.png`);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imageSource;
    img.onload = () => {
      setImageLoaded(true);
    };
  },[imageSource])

  return (
    <>
      {imageLoaded ? (
        <img
          src={imageSource}
          alt=""
          aria-hidden="true"
          className="card__image"
        ></img>
      ) : (
        <div className="card__image-placeholder"></div>
      )}
    </>
  );
};

export default CardImageImports;
