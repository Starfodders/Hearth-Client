import React from "react";
import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom";
import "./BotNav.scss";

const BotNav = () => {
  // const location = useLocation();
  // const {pathname} = location;
  // const [toggleIcons, setToggleIcons] = useState({chapters: true, meditate: true, collection: true})

  // useEffect(() => {
  //   if (pathname === '/home') {
  //     setToggleIcons({...toggleIcons, chapters: true, meditate: true, collection: true})
  //   } else {
  //     if (pathname === '/chapters') {
  //       setToggleIcons({...toggleIcons, chapters: true, meditate: false, collection: false})
  //     }
  //     if (pathname === '/meditate') {
  //       setToggleIcons({...toggleIcons, chapters: false, meditate: true, collection: false})
  //     }
  //     if (pathname === '/collections') {
  //       setToggleIcons({...toggleIcons, chapters: false, meditate: false, collection: true})
  //     }
  //   }
  // }, [pathname])

  return (
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
  );
};

export default BotNav;
