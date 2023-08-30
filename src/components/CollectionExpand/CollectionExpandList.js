import "./CollectionExpand.scss";
import { useState, useEffect } from "react";

const CollectionExpandList = ({content, darkMode}) => {
    const [iconAsset, setIconAsset] = useState();
    const [currentSuggestion, setCurrentSuggestion] = useState(null);
    const [unusedIndices, setUnusedIndices] = useState([]);

    useEffect(() => {
        const suggestionList = content.list.split('; ');
        setUnusedIndices(Array.from({ length: suggestionList.length }, (_, i) => i));
        setIconAsset(require(`../../assets/collectionListPrompt/${content.images}.png`));
    }, [content]);

    const handleSuggestion = () => {
        if (unusedIndices.length === 0) {
            const suggestionList = content.list.split('; ');
            setUnusedIndices(Array.from({ length: suggestionList.length }, (_, i) => i));
            return;
        }

        const randomIndexPosition = Math.floor(Math.random() * unusedIndices.length);
        const randomIndex = unusedIndices[randomIndexPosition];

        setUnusedIndices(prev => prev.filter(index => index !== randomIndex));

        const suggestionList = content.list.split('; ');
        const currentWord = `"${suggestionList[randomIndex]}"`;
        setCurrentSuggestion(currentWord);
    };

    return (
        <div className="expand__list__block">
            <img src={iconAsset} className="expand__list--icon" onClick={handleSuggestion} alt="Interact to generate suggestion" />
            <div className={darkMode ? "expand__list--suggestion--dark" : "expand__list--suggestion"}>
                <p className="expand__list--text">{currentSuggestion}</p>
            </div>
        </div>
    );
};

export default CollectionExpandList;
