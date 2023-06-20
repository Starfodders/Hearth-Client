import "./Changelog.scss";
import { useState, useEffect } from "react";

const Changelog = () => {
  const [logOn, setLogOn] = useState(false);

  const patch1 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.0</h2>
        <ul className="log__list">
          <li className="log__list-item">Initial app deployment</li>
          <li className="log__list-item">Content available up to chapter 2</li>
          <li className="log__list-item">User Testing</li>
          <li className="log__list-item">Bug Reporting</li>
          <li className="log__list-item">Database stress test</li>
        </ul>
      </>
    );
  };
  const patch2 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.1</h2>
        <ul className="log__list">
          <li className="log__list-item">Added changelog</li>
          <li className="log__list-item">Background animation disabled</li>
          
        </ul>
      </>
    );
  };

  const patches = [patch1, patch2];
  const [currentPatch, setCurrentPatch] = useState(0);

  function handleNextPatch() {
    if (currentPatch < patches.length - 1) {
        setCurrentPatch((prev) => prev + 1);
    }
  }

  function handlePrevPatch() {
    if (currentPatch !== 0) {
        setCurrentPatch((prev) => prev - 1);
    }
  }
  const PatchComponent = patches[currentPatch];

  return (
    <>
      {logOn ? (
        <>
          <section className="log__container">
            <div className="log__nav">
              <span
                className="material-symbols-outlined"
                onClick={() => handlePrevPatch()}
                aria-label="Go backwards 1 patch"
              >
                <span aria-hidden="true">arrow_back</span>
              </span>
              <span
                className="material-symbols-outlined"
                onClick={() => handleNextPatch()}
                aria-label="Go forwards 1 patch"
              >
                <span aria-hidden="true">arrow_forward</span>
              </span>
            </div>
            <PatchComponent />
          </section>
        </>
      ) : (
        <section className="log__container--off" aria-hidden="true"></section>
      )}
      <div className="log__button">
        <button
          onClick={() => setLogOn((prev) => !prev)}
          className="log__button-el"
        >
          View Changelog
        </button>
      </div>
    </>
  );
};

export default Changelog;
