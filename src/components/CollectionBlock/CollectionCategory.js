import "./CollectionBlock.scss";
import { useState, useEffect } from "react";
import CollectionItem from "../CollectionItem/CollectionItem";

const CollectionCategory = ({ chapter, content }) => {
  const [chapterName, setChapterName] = useState(null);
  const [chapterIcon, setChapterIcon] = useState(null);
  const [totalSaved, setTotalSaved] = useState(0)

  const [subPagesOpen, setSubPagesOpen] = useState(false)
  const [filteredContent, setFilteredContent] = useState([]);

  useEffect(() => {
    if (chapter === "intro") {
      setChapterName("Introduction");
      import("../../assets/chapterAssets/introbag.png").then((img) =>
        setChapterIcon(img.default)
      );
      setTotalSaved(0)
      const introContent = content.filter((page) => page.unit_id <= 2);
      setTotalSaved(introContent.length);
      setFilteredContent(introContent);
    }
    if (chapter === "DT") {
      setChapterName("Distress Tolerance");
      import("../../assets/chapterAssets/tal1.png").then((img) =>
        setChapterIcon(img.default)
      );
      setTotalSaved(0)
      const dtContent = content.filter((page) => page.unit_id > 2 && page.unit_id <= 10);
      setTotalSaved(dtContent.length);
      setFilteredContent(dtContent);
    }
    if (chapter === "MF") {
      setChapterName("Mindfulness");
      import("../../assets/chapterAssets/mana1.png").then((img) =>
        setChapterIcon(img.default)
      );
      setTotalSaved(0)
      const mfContent = content.filter((page) => page.unit_id > 10 && page.unit_id <= 18);
      setTotalSaved(mfContent.length);
      setFilteredContent(mfContent);
    }
  }, []);

  return (
    <>
      <div className="subchapter__container">
        <div className="subchapter__left">
          <img src={chapterIcon} className="subchapter__icon" alt="" />
          <p>{chapterName}</p>
          <p className="subchapter__total">{totalSaved}</p>
        </div>
        <div className="subchapter__right">
          <span className="material-symbols-outlined subchapter__expand" onClick = {() => setSubPagesOpen((prev) => !prev)}>
            <span aria-hidden="true">unfold_more</span>
          </span>
        </div>
      </div>
      <div className="subchapter__results">
        {subPagesOpen ? filteredContent.map((page, index) => {
            return <CollectionItem page = {page}/>
        }): null}
      </div>
    </>
  );
};

export default CollectionCategory;

//right now I need to create the entire block container, but this HTML should be within CollectionItem and have the expand functionality nested inside as well
