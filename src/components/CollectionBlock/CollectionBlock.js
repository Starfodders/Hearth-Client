import "./CollectionBlock.scss";
import CollectionItem from "../CollectionItem/CollectionItem";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const CollectionBlock = ({ type, content }) => {
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

  //truncates the text, the syntax is very confusing please don't ask me
  function shortenText(text) {
    if (text.indexOf(";") !== -1) {
      const colonIndex = text.split("").indexOf(";");
      const newShortenString =
        text
          .split("")
          .splice(0, colonIndex)
          .join("")
          .split(" ")
          .slice(0, 8)
          .join(" ") + "...";
      return newShortenString;
    }
    if (text.length <= 8) {
      return text;
    }
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

  function handleDelete(id) {
    axios
      .delete(
        `/.netlify/functions/units/unsave?userID=${sessionStorage.getItem("userId")}&slideID=${id}`
      )
      .then((response) => {
        if (response.status === 204) {
          setFilteredContent(filteredContent.filter((item) => item.id !== id));
          setBlocks(content.map(() => ({ expand: false })));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!contentLoad) {
    return (
      <div className="loader__wrapper">
        <h2 className="loader__disclaimer">There seems to be nothing here!</h2>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {filteredContent.map((page, index) => {
        return (
          <div className="block__container" key={page.id} aria-label = {`${type} number ${index + 1}`}>
            <div className="block__left">
              <span
                className="material-symbols-outlined block__delete"
                onClick={() => handleDelete(page.id)}
                aria-label = "Delete saved card"
              >
                <span aria-hidden="true">delete</span>
              </span>
            </div>
            <div className="block__center">
              <p
                className="block__title"
                onClick={() => handleTextExpand(index)}
              >
                {page.title}
              </p>
              <CollectionItem
                type={type}
                content={page}
                shorten={shortenText}
                expand={blocks[index].expand}
              />
            </div>
            <div
              className="block__expand"
              onClick={() => handleTextExpand(index)}
              aria-label = "Interact to expand card"
            >
              <span className="material-symbols-outlined block__expand--btn">
                <span aria-hidden = "true">unfold_more</span>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CollectionBlock;
