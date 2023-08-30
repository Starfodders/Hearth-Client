import "./UnitSkeleton.scss";

const UnitSkeleton = () => {

    const elementsToRender = 3;

    const renderSkeletonElements = () => {
        const elements = [];
        for (let i = 0; i < elementsToRender; i++) {
          elements.push(
            <div className="skeleton__container" key={i}>
              <h2 className="skeleton__name"></h2>
              <div className="skeleton__circle"></div>
              <div className="skeleton__button"></div>
            </div>
          );
        }
        return elements;
      };

  return (
    <>
      <section className="chapters__container">
        <div className="chapters__header">
          <h2 className="skeleton__title">Placeholder</h2>
        </div>
        <main className="skeleton__main">
            {renderSkeletonElements()}
        </main>
      </section>
    </>
  );
};

export default UnitSkeleton;
