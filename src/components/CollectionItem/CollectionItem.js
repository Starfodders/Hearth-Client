import { useState } from "react";

const CollectionItem = ({ content, shorten, expand }) => {



  return (
    <>
      {expand ? (
        <p className="block__content">{content}</p>
      ) : (
        <p className="block__content">{shorten(content)}</p>
      )}
    </>
  );
};

export default CollectionItem;
