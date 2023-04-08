import "./FinishCard.scss"

const FinishCard = ({details}) => {
    const {id, content, image} = details
    const userID = sessionStorage.getItem('userId')
    console.log(content);

    function handleUnitComplete() {

    }

    return (
        <div className='finish__wrapper'>
            <div className="finish__container">
                {image ? <div className="finish__image">
                    {image ? <img src = {image} alt = "Congratulations on finishing the unit"/> : null }
                    </div> : null }
                <h3 className="finish__message">{content}</h3>
                <button className="finish__confirm">Complete</button>
            </div>
        </div>
    );
};

export default FinishCard;