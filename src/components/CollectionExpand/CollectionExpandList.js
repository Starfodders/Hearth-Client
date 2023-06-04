import "./CollectionExpand.scss"
import iconAsset from "../../assets/icons/tal-icon.png"
import { useState } from "react";


const CollectionExpandList = ({content}) => {

    const [currentSuggestion, setCurrentSuggestion] = useState(null)

    function handleSuggestion() {
        const suggestionList = content.list.split('; ')
        let randomIndex = Math.floor(Math.random() * suggestionList.length);
        let currentWord = `"${suggestionList[randomIndex]}"`;
        setCurrentSuggestion(currentWord)
    }

    return (
        <div className = "expand__list__block">
            <img src = {iconAsset} className = "expand__list--icon" onClick = {() => handleSuggestion()} alt = "Interact to generate suggestion"/>
            <div className="expand__list--suggestion">
                <p className="expand__list--text">{currentSuggestion}</p>
              </div>
        </div>
    );
};

export default CollectionExpandList;