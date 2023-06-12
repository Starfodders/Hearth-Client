import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./TopLogo.scss";

const TopLogo = ({ name, login }) => {
  const [menuHover, setMenuHover] = useState(false);
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false); 

  const [mobileWindow, setMobileWindow] = useState(
    window.innerWidth <= 425 ? true : false
  );

  function handleResize() {
    if (window.innerWidth < 425 && !mobileWindow) {
      setMobileWindow(true);
      window.removeEventListener("resize", handleResize);
    } else if (window.innerWidth > 425 && mobileWindow) {
      setMobileWindow(false);
      window.removeEventListener("resize", handleResize);
    }
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.1; // Calculate 10% of the viewport height
      const currentScrollPos = window.pageYOffset;
  
      setIsScrolled(currentScrollPos > scrollThreshold);
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleLogOut() {
    sessionStorage.removeItem("authToken");
    login(false);
    navigate("/");
  }

  return (
    <div className={isScrolled ? "top__container--hidden": "top__container"}>
      <div className="spacer"></div>
      <Link to="/home" className="top__link" aria-label = "Link to Homepage" tabIndex={0}>
        <h2 className="top__title">Hearth</h2>
      </Link>
      <div
        className="top__profile"
        onMouseEnter={() => setMenuHover(true)}
        onMouseLeave={() => setMenuHover(false)}
      >
        <div className="top__profile__preview">
          <div className="top__profile__primary">
            <span className="material-symbols-outlined top__icon" aria-hidden = 'true'>
              account_circle
            </span>
            <p className={mobileWindow ? "top__name--hidden" : "top__name"}>
              {name}
            </p>
          </div>
          {menuHover ? (
            <div className="top__profile__opened">
              <span className="material-symbols-outlined logout-icon" aria-hidden='true'>
                logout
              </span>
              <p className="top__signout" onClick={() => handleLogOut()}>
                Sign Out
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TopLogo;
