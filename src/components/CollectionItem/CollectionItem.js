import { useEffect, useState } from "react";
import CollectionExpandList from "../CollectionExpand/CollectionExpandList";
import CollectionExpandTech from "../CollectionExpand/CollectionExpandTech";


const CollectionItem = ({ type, content, shorten, expand }) => {


  function formatContent(content) {
    return content.split(';')
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
          {formatContent(content.content).map((paragraph)=>  <p className="block__content--expand" key ={paragraph}>{paragraph}</p>)}
          {isList ? <CollectionExpandList content = {content}/> : null }
          {isTechnique ? <CollectionExpandTech content = {content}/> : null }
        </>
      ) : (
        <p className="block__content">{shorten(content.content)}</p>
      )}
    </div>
  );
};

export default CollectionItem;

//if list exists, then render the expand list