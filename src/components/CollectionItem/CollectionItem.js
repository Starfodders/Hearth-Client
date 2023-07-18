import { useEffect, useState } from "react";
import CollectionExpandList from "../CollectionExpand/CollectionExpandList";
import CollectionExpandTech from "../CollectionExpand/CollectionExpandTech";

const CollectionItem = ({ page, deletePage }) => {
  const { type, content } = page;

  const [isList, setIsList] = useState(false);
  const [isTechnique, setIsTechnique] = useState(false);
  const [expand, setExpand] = useState(false)


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

  //truncates the text, the syntax is very confusing please don't ask me
  function shortenText(text) {
    if (text.length <= 8) {
      return text;
    }
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

    return text.split(" ").slice(0, 8).join(" ") + "...";
  } 

  useEffect(() => {
    if (type === "List Cards") {
      setIsList(true);
      setIsTechnique(false);
    }
    if (type === "Technique Cards") {
      setIsTechnique(true);
      setIsList(false);
    }
  }, [type, expand]);


  return (
    <>
      <div className="block__container">
        <div className="block__left">
          <span
            className="material-symbols-outlined block__delete"
            onClick={() => deletePage(page.id)}
            aria-label="Delete saved card"
          >
            <span aria-hidden="true">delete</span>
          </span>
        </div>
        <div className="block__center">
          <p className="block__title" onClick={() => setExpand((prev) => !prev)}>
            {page.title}
          </p>
          <div className="block__center--text">
            {expand ? (
              <>
                {formatContent(content).map((paragraph, index) => (
                  <p className="block__content--expand" key={index}>
                    {paragraph}
                  </p>
                ))}
                {isList ? <CollectionExpandList content={content} /> : null}
                {isTechnique && content.transcript === "1" ? (
                  <CollectionExpandTech content={content} />
                ) : null}
              </>
            ) : (
              <p className="block__content">{shortenText(content)}</p>
            )}
          </div>
        </div>
        <div
            className="block__expand"
            onClick={() => setExpand((prev) => !prev)}
            aria-label="Interact to expand card"
          >
            <span className="material-symbols-outlined block__expand--btn">
              <span aria-hidden="true">unfold_more</span>
            </span>
          </div>
      </div>
    </>
  );
};

export default CollectionItem;

//if list exists, then render the expand list
