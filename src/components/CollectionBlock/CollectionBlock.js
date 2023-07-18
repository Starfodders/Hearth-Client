import "./CollectionBlock.scss";
import CollectionItem from "../CollectionItem/CollectionItem";
import CollectionCategory from "./CollectionCategory";

import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const CollectionBlock = ({ type, content }) => {
  //init a state var, object full of expand false equal to the content length
  const [blocks, setBlocks] = useState(content.map(() => ({ expand: false })));

  //filter content depending on which saved data user is accessing
  const [filteredContent, setFilteredContent] = useState([]);
  const [contentLoad, setContentLoad] = useState(false);

  const [introLoad, setIntroLoad] = useState(false)
  const [DTLoad, setDTLoad] = useState(false)
  const [MFLoad, setMFLoad] = useState(false)
  const [ERLoad, setERLoad] = useState(false)
  const [IELoad, setIELoad] = useState(false)

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


  //formats the title to remove 'card' from text
  function shortenTitle(title) {
    return title.split(" ").slice(0, -1);
  }

  //passes block's index, takes the current state of blocks, maps over it. If index matches clicked index, reverse the state
  //OLD CODE, KEEP IN CASE BUT NOT BEING USED RIGHT NOW
  // function handleTextExpand(index) {
  //   setBlocks((prevState) => {
  //     return prevState.map((block, i) => {
  //       if (i === index) {
  //         return { ...block, expand: !block.expand };
  //       } else {
  //         return block;
  //       }
  //     });
  //   });
  // }

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/units/${sessionStorage.getItem('userId')}/${id}`)
    // axios.delete(`/.netlify/functions/units/unsave?userID=${sessionStorage.getItem("userId")}&slideID=${id}`)
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

  //Array to track if a unit in a specific chapter is saved, if so, render a unique component
  const renderedChapters = [];

  return (
    <>
    {filteredContent.map((page, index) => {
      if (page.unit_id <= 2 && !renderedChapters.includes('intro')) {
        renderedChapters.push('intro')
        return <CollectionCategory chapter = 'intro' key = {index} content = {filteredContent} />
      }
      if (page.unit_id > 2 && page.unit_id <= 10 && !renderedChapters.includes('DT')) {
        renderedChapters.push('DT')
        return <CollectionCategory chapter = 'DT' key = {index} content = {filteredContent} />
      }
      if (page.unit_id > 10 && page.unit_id <= 18 && !renderedChapters.includes('MF')) {
        renderedChapters.push('MF')
        return <CollectionCategory chapter = 'MF' key = {index} content = {filteredContent} />
      }
      return null
    })}
      {/* {filteredContent.map((page, index) => {
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
      })} */}
    </>
  );
};

export default CollectionBlock;

//Specific category is selected, it renders CollectionBlock
//Displays a component that has the specific chapters categorized for easier access
//Only render the chapter component if the user has something saved there

//get data, filter the data, generate components
//if within filteredContent, there are units within certain chapters, create specific component for this