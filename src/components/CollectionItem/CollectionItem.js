import { useEffect, useState } from "react";
import CollectionExpandList from "../CollectionExpand/CollectionExpandList";
import CollectionExpandTech from "../CollectionExpand/CollectionExpandTech";


const CollectionItem = ({ type, content, shorten, expand }) => {

  function formatContent(content) {
    const paragraphs = content.split(";");

    const formattedParagraphs = paragraphs.map((paragraph) => {
      const words = paragraph.split(" ");

      const formattedWords = words.map((word, index) => {
        if (word.indexOf("|") === 0) {
          const removeTag = word.substring(1); // Remove the '|' character
          return (
            <span key={index} className="content-bold">
              {removeTag}{" "}
            </span>
          );
        }
        return word + " ";
      });

      return <>{formattedWords}</>;
    });

    return formattedParagraphs;
  }

  const [isList, setIsList] = useState(false)
  const [isTechnique, setIsTechnique] = useState(false)


  useEffect(() => {
    if (type === 'List Cards') {
      setIsList(true)
      setIsTechnique(false)

    }
    if (type === 'Technique Cards') {
      setIsTechnique(true)
      setIsList(false)
    }
  }, [type, expand])

  return (
    <div className="block__center--text">
      {expand ? (
        <>
          {formatContent(content.content).map((paragraph, index)=>  <p className="block__content--expand" key ={index}>{paragraph}</p>)}
          {isList ? <CollectionExpandList content = {content}/> : null }
          {isTechnique && content.transcript === '1' ? <CollectionExpandTech content = {content}/> : null }
        </>
      ) : (
        <p className="block__content">{shorten(content.content)}</p>
      )}
    </div>
  );
};

export default CollectionItem;

//if list exists, then render the expand list