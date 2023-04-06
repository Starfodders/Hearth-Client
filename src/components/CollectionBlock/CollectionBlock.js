import "./CollectionBlock.scss";
import CollectionItem from "../CollectionItem/CollectionItem";

import {useState} from "react"

const CollectionBlock = ({ type, content }) => {
  console.log(content);

  const [expand, setExpand] = useState(false);

  function shortenText(text) {
    return text.split(" ").slice(0, 8).join(" ") + "...";
  }

  function shortenTitle(title) {
    return title.split(" ").slice(0, -1);
  }

  function handleTextExpand() {
    setExpand(prevExpand => !prevExpand)
  }

  return (
    <>
      {content.map((page) => {
        return (
          <div className="block__container" key={page.id}>
            <div className="block__left">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="block__center">
              <p className="block__title">
                {page.title ? page.title : shortenTitle(type)}
              </p>
              <CollectionItem content = {page.content} shorten = {shortenText} expand = {expand}/>
            </div>
            <div className="block__expand" onClick = {() => handleTextExpand()}>
              <span className="material-symbols-outlined">unfold_more</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CollectionBlock;
