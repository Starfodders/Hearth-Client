import "./CollectionCard.scss";

const CollectionCard = ({ name, image, count, setBlock, setPage }) => {
  function handleBlockState() {
    setBlock(true);
    setPage(name);
  }

  return (
    <div className="collection-card__container">
      <p className="collection-card__name">{name}</p>
      <img src={image} className="collection-card__image" aria-hidden="true" />
      <p
        className="collection-card__count"
        aria-label={`${count} ${name} saved`}
      >
        <span aria-hidden="true">{count} saved</span>
      </p>
      <button
        className="collection-card__button"
        onClick={() => handleBlockState()}
        aria-label={`View ${name}`}
      >
        <span aria-hidden = "true">View</span>
      </button>
    </div>
  );
};

export default CollectionCard;
