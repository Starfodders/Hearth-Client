import "./Card.scss";

const CardImageImports = ({ images }) => {
  // const imageSource = require(`../../assets/chapterAssets/${src.images}.png`);
  
  return (
    <img src={images.src} alt="" aria-hidden="true" className="card__image" ></img>
  );
};

export default CardImageImports;
