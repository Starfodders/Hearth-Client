import React from "react";
import { NavLink } from "react-router-dom";

const BotNav = () => {
  return (
    <div className="bot-nav__container">
      <NavLink>
        <div className="bot-nav__block">
          <p>Chapters</p>
          <span className="material-symbols-outlined">menu_book</span>
        </div>
      </NavLink>
      <NavLink>
        <div className="bot-nav__block">
          <p>Meditation</p>
          <span class="material-symbols-outlined">self_improvement</span>
        </div>
      </NavLink>
      <NavLink>
        <div className="bot-nav__block">
          <p>Collection</p>
          <span class="material-symbols-outlined">bookmark</span>
        </div>
      </NavLink>
    </div>
  );
};

export default BotNav;
