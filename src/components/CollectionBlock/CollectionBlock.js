import "./CollectionBlock.scss";
import CollectionCategory from "./CollectionCategory";

import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

const CollectionBlock = ({ type, content }) => {

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

  //Sort to mutate array to always have the order remain consistent
  filteredContent.sort((a, b) => a.unit_id - b.unit_id)

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
    </>
  );
};

export default CollectionBlock;
