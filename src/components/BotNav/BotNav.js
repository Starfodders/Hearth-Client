import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom";
import "./BotNav.scss";

const BotNav = () => {

  const [userScrollDown, setUserScrollDown] = useState(false)

  let lastScrollPosition = window.scrollY;

  window.addEventListener('scroll', (e) => {
    const currentScrollPosition = window.scrollY;
    if (currentScrollPosition > lastScrollPosition) {
      // console.log('User scrolled down');
      setUserScrollDown(true)
    } else {
      // console.log('User scrolled up');
      setUserScrollDown(false)
    }
    lastScrollPosition = currentScrollPosition;
  })

  return (
    userScrollDown ? 
    <>
    <div className="bot-nav__container--reduced">
      <NavLink to="/chapters" className="bot-nav__block--reduced">
        <p className = "bot-nav__title">Chapters</p>
      </NavLink>
      <NavLink to="/meditation" className="bot-nav__block--reduced">
        <p className = "bot-nav__title">Meditation</p>
      </NavLink>
      <NavLink to="/collection" className="bot-nav__block--reduced">
        <p className = "bot-nav__title">Collection</p>
      </NavLink>
    </div>
    </>
      :
      <>
      <div className="bot-nav__container">
        <NavLink to="/chapters" className="bot-nav__block">
          <p className = "bot-nav__title">Chapters</p>
          <span className="material-symbols-outlined bot-nav__icon">menu_book</span>
        </NavLink>
        <NavLink to="/meditation" className="bot-nav__block">
          <p className = "bot-nav__title">Meditation</p>
          <span className="material-symbols-outlined bot-nav__icon">self_improvement</span>
        </NavLink>
        <NavLink to="/collection" className="bot-nav__block">
          <p className = "bot-nav__title">Collection</p>
          <span className="material-symbols-outlined bot-nav__icon">bookmark</span>
        </NavLink>
      </div>
      </>
  );
};

export default BotNav;
