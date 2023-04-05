import "./CollectionCard.scss"
import placeholder from "../../assets/images/mascot.gif"

const CollectionCard = ({name}) => {
    return (
        <div className="collection-card__container">
            <p className="collection-card__name">{name}</p>
            <img src={placeholder} className="collection-card__image"/>
            <p>Amount saved</p>
            <button className="collection-card__button">View</button>
        </div>
    );
};

export default CollectionCard;