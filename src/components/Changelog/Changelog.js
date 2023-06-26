import "./Changelog.scss";
import { useState } from "react";

const Changelog = () => {

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
          <li className="log__list-item">Notification for account creation success added</li>
          <li className="log__list-item">Homepage image clipping fixed</li>
          <li className="log__list-item">Button text to access content changes based on progress</li>
          <li className="log__list-item">Bottom Navigation shifting turned off on mobile due to visibility issues</li>
          <li className="log__list-item">Added 'Go To Newest Unit' button for fewer clicks between content</li>
          <li className="log__list-item">Mobile slide scroll buttons adjusted to prevent blocking text</li>
        </ul>
      </>
    );
  };
  const patch3 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.2</h2>
        <ul className="log__list">
          <li className="log__list-item">New Tutorials generated at relevant times</li>
          <li className="log__list-item">Styling updates to Hearth top icon, sign out button</li>
        </ul>
      </>
    );
  };

  const patches = [patch1, patch2, patch3];
  const [currentPatch, setCurrentPatch] = useState(2);

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
    <><div className="log__bg"></div>
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
  )}

export default Changelog;
