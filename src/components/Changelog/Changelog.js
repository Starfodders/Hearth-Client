import "./Changelog.scss";
import { useState } from "react";

const Changelog = () => {

  const patch1 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.0</h2>
        <ul className="log__list">
          <li className="log__list-item">Initial app deployment</li>
          <li className="log__list-item">Content available up to chapter 2 (distress tolerance)</li>
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
          <li className="log__list-item">Added bolding for certain words throughout content for emphasis</li>
        </ul>
      </>
    );
  };
  const patch4 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.3</h2>
        <ul className="log__list">
          <li className="log__list-item">Mindfulness chapters have been added, Mana joins the roster!</li>
          <li className="log__list-item">Artwork and Voiceover is not complete for this chapter, focus will be on completing the rest of the book's content. </li>
          <li className="log__list-item">Collections have been reworked to specify which chapter the page was saved from for easier access</li>
        </ul>
      </>
    );
  };
  const patch5 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.4</h2>
        <ul className="log__list">
          <li className="log__list-item">Emotional Regulation Chapters added, Edo joins the roster!</li>
          <li className="log__list-item">Illustrations will be done when Hearth's content is complete, better use of timing</li>
          <li className="log__list-item">Removed distracting animation at login, reduce time to get into actual app to 1 second.</li>
        </ul>
      </>
    );
  };
  const patch6 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.5</h2>
        <ul className="log__list">
          <li className="log__list-item">Interpersonal Effectiveness chapter added, Igo & Ewa join the roster</li>
        </ul>
      </>
    );
  };
  const patch7 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.6</h2>
        <ul className="log__list">
          <li className="log__list-item">Conclusion Chapter added!</li>
          <li className="log__list-item">Final release planned, working on user types (student vs facilitator) and password recovery</li>
        </ul>
      </>
    );
  };
  const patch8 = () => {
    return (
      <>
        <h2 className="log__version">Version 1.7</h2>
        <ul className="log__list">
          <li className="log__list-item">Dark Mode added at request.</li>
          <li className="log__list-item">Fixed bug with saved techniques and lists not showing up properly in the collections</li>
        </ul>
      </>
    );
  };

  const patches = [patch1, patch2, patch3, patch4, patch5, patch6, patch7, patch8];
  const [currentPatch, setCurrentPatch] = useState(7);

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
