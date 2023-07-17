import "./CollectionBlock.scss";
import { useState, useEffect } from "react";

const CollectionCategory = ({ chapter, content }) => {
    console.log(content);
  const [chapterName, setChapterName] = useState(null);
  const [chapterIcon, setChapterIcon] = useState(null);
  const [totalSaved, setTotalSaved] = useState(0)

  useEffect(() => {
    if (chapter === "intro") {
      setChapterName("Introduction");
      import("../../assets/chapterAssets/introbag.png").then((img) =>
        setChapterIcon(img.default)
      );
      setTotalSaved(0)
      content.forEach((page) => {
        if (page.unit_id <= 2) {
            setTotalSaved((prev) => prev + 1)
        }
      })
    }
    if (chapter === "DT") {
      setChapterName("Distress Tolerance");
      import("../../assets/chapterAssets/tal1.png").then((img) =>
        setChapterIcon(img.default)
      );
      setTotalSaved(0)
      content.forEach((page) => {
        if (page.unit_id > 2 && page.unit_id <= 10) {
            setTotalSaved((prev) => prev + 1)
        }
      })
    }
    if (chapter === "MF") {
      setChapterName("Mindfulness");
      import("../../assets/chapterAssets/mana1.png").then((img) =>
        setChapterIcon(img.default)
      );
      setTotalSaved(0)
      content.forEach((page) => {
        if (page.unit_id > 10 && page.unit_id <= 18) {
            setTotalSaved((prev) => prev + 1)
        }
      })
    }
  }, [chapter, content]);



  return (
    <>
      <div className="subchapter__container">
        <div className="subchapter__left">
          <img src={chapterIcon} className="subchapter__icon" alt="" />
          <p>{chapterName}</p>
          <p className="subchapter__total">{totalSaved}</p>
        </div>
        <div className="subchapter__right">
          <span className="material-symbols-outlined subchapter__expand">
            <span aria-hidden="true">unfold_more</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default CollectionCategory;
