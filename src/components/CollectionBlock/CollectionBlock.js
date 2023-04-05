import "./CollectionBlock.scss";

const CollectionBlock = ({ type, content }) => {
  // console.log(type);
  console.log(content);

  function shortenText(text) {
    const arrayText = text.split(" ");
    arrayText.length = 8;
    const joined = arrayText.join(" ");
    return `${joined}...`;
  }

  function shortenTitle(title) {
    const arrayTitle = title.split(" ");
    arrayTitle.pop();
    return arrayTitle;
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
              <p className="block__content">{shortenText(page.content)}</p>
            </div>
            <div className="block__expand">
              <span className="material-symbols-outlined">unfold_more</span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CollectionBlock;
