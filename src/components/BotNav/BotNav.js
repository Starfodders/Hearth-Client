import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./BotNav.scss";

const BotNav = () => {
  const [userScrollDown, setUserScrollDown] = useState(false);

  // let lastScrollPosition = window.scrollY;

  // window.addEventListener("scroll", (e) => {
  //   const currentScrollPosition = window.scrollY;
  //   if (currentScrollPosition > lastScrollPosition) {
  //     setUserScrollDown(true);
  //   } else {
  //     // console.log('User scrolled up');
  //     setUserScrollDown(false);
  //   }
  //   lastScrollPosition = currentScrollPosition;
  // });

  return userScrollDown ? (
    <>
      <div className="bot-nav__container--reduced">
        <NavLink to="/chapters" className="bot-nav__block--reduced" aria-label="Link to Chapters">
          <p className="bot-nav__title">Chapters</p>
        </NavLink>
        <NavLink to="/meditation" className="bot-nav__block--reduced" aria-label="Link to Meditation">
          <p className="bot-nav__title">Meditation</p>
        </NavLink>
        <NavLink to="/collection" className="bot-nav__block--reduced" aria-label="Link to Collections">
          <p className="bot-nav__title">Collection</p>
        </NavLink>
      </div>
    </>
  ) : (
    <>
      <div className="bot-nav__container">
        <NavLink to="/chapters" className="bot-nav__block" aria-label="Link to Chapters">
          <p className="bot-nav__title">Chapters</p>
          <span className="material-symbols-outlined bot-nav__icon">
            <span className = "bot-nav__icon"> menu_book </span>
          </span>
        </NavLink>
        <NavLink to="/meditation" className="bot-nav__block" aria-label="Link to Meditation">
          <p className="bot-nav__title">Meditation</p>
          <span className="material-symbols-outlined bot-nav__icon">
            self_improvement
          </span>
        </NavLink>
        <NavLink to="/collection" className="bot-nav__block" aria-label="Link to Collections">
          <p className="bot-nav__title">Collection</p>
          <span className="material-symbols-outlined bot-nav__icon">
            bookmark
          </span>
        </NavLink>
      </div>
    </>
  );
};

export default BotNav;
