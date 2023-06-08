import "./Card.scss";

const CardImageImports = ({ src }) => {
  const imageSource = require(`../../assets/chapterAssets/${src.images}.png`);

  return (
    <img src={imageSource} alt="" aria-hidden="true" className="card__image"></img>
  );
};

export default CardImageImports;
