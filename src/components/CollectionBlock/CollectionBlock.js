import "./CollectionBlock.scss";
import CollectionItem from "../CollectionItem/CollectionItem";

import { useState } from "react";

const CollectionBlock = ({ type, content }) => {
//   console.log(content);

//init a state var, object full of expand false equal to the content length
  const [blocks, setBlocks] = useState(content.map(() => ({ expand: false })));

  //truncates the text
  function shortenText(text) {
    return text.split(" ").slice(0, 8).join(" ") + "...";
  }

  //formats the title to remove 'card' from text
  function shortenTitle(title) {
    return title.split(" ").slice(0, -1);
  }

  //passes block's index, takes the current state of blocks, maps over it. If index matches clicked index, reverse the state
  function handleTextExpand(index) {
    setBlocks((prevState) => {
      return prevState.map((block, i) => {
        if (i === index) {
          return { ...block, expand: !block.expand };
        } else {
          return block;
        }
      });
    });
  }

  return (
    <>
      {content.map((page, index) => {
        return (
          <div className="block__container" key={page.id}>
            <div className="block__left">
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className="block__center">
              <p className="block__title">
                {page.title ? page.title : shortenTitle(type)}
              </p>
              <CollectionItem
                content={page.content}
                shorten={shortenText}
                expand = {blocks[index].expand}
              />
            </div>
            <div className="block__expand" onClick={() => handleTextExpand(index)}>
              <span className="material-symbols-outlined">unfold_more</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CollectionBlock;
