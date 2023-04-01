import "./Card.scss"
import ProgressBar from '../ProgressBar/ProgressBar';

const Card = ({id, name, sections, available, images}) => {

    return (
        <div key = {id} className = "card__container">
            <h2 className = "card__name">{name}</h2>
            <img src = {`http://localhost:8080${images}`} alt = {name} className = "card__image"/>
            <ProgressBar/>
            <button>Continue</button>
        </div>
    );
};

export default Card;