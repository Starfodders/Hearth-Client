import "./CollectionCard.scss"

const CollectionCard = ({name, image, count, setBlock, setPage}) => {

    function handleBlockState() {
        setBlock(true)
        setPage(name)
    }

    return (
        <div className="collection-card__container">
            <p className="collection-card__name">{name}</p>
            <img src={image} className="collection-card__image"/>
            <p>{count} saved</p>
            <button className="collection-card__button" onClick = {() => handleBlockState()}>View</button>
        </div>
    );
};

export default CollectionCard;