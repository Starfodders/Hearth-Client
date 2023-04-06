import "./CollectionBlock.scss";
import CollectionItem from "../CollectionItem/CollectionItem";

import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const CollectionBlock = ({ type, content }) => {
  console.log(content); //encompasses ALL retrieved data
  //   console.log(type); //encompasses the current data to be displayed

  //init a state var, object full of expand false equal to the content length
  const [blocks, setBlocks] = useState(content.map(() => ({ expand: false })));

  //filter content depending on which saved data user is accessing
  const [filteredContent, setFilteredContent] = useState([]);
  const [contentLoad, setContentLoad] = useState(false);

  useEffect(() => {
    if (type) {
      if (type === "Text Cards") {
        const textFilter = content.filter((saved) => saved.type === "text");
        setFilteredContent(textFilter);
        if (textFilter.length > 0) {
          setContentLoad(true);
        }
      }
      if (type === "Technique Cards") {
        const techniqueFilter = content.filter(
          (saved) => saved.type === "technique"
        );
        setFilteredContent(techniqueFilter);
        if (techniqueFilter.length > 0) {
          setContentLoad(true);
        }
      }
      if (type === "List Cards") {
        const listFilter = content.filter((saved) => saved.type === "list");
        setFilteredContent(listFilter);
        if (listFilter.length > 0) {
          setContentLoad(true);
        }
      }
      if (type === "Summary Cards") {
        const summaryFilter = content.filter(
          (saved) => saved.type === "summary"
        );
        setFilteredContent(summaryFilter);
        if (summaryFilter.length > 0) {
          setContentLoad(true);
        }
      }
    }
  }, [content, type]);

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

  if (!contentLoad) {
    return (
      <div className="loader__wrapper">
        <h2 className = "loader__disclaimer">Nothing saved.</h2>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {filteredContent.map((page, index) => {
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
                expand={blocks[index].expand}
              />
            </div>
            <div
              className="block__expand"
              onClick={() => handleTextExpand(index)}
            >
              <span className="material-symbols-outlined">unfold_more</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CollectionBlock;
