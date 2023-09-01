import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProgressContext from "../ProgressContext/ProgressContext";
import "./TopLogo.scss";

const TopLogo = ({ name, login }) => {
  const [menuHover, setMenuHover] = useState(false);
  const navigate = useNavigate();

  const { darkMode, setDarkMode } = useContext(ProgressContext);

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
    sessionStorage.removeItem("user-progress");
    login(false);
    navigate("/");
  }

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  // const toggleHelp = () => {
  //   if (location.pathname === '/home') {
  //     localStorage.removeItem('home-tutorial')
  //   }
  //   else {
  //     return
  //   }
  // }

  return (
    <div className={isScrolled ? "top__container--hidden" : "top__container"}>
      <div className="spacer"></div>
      {/* <Link
        to="/home"
        className="top__link"
        aria-label="Link to Homepage"
        tabIndex={0}
      > */}
      <h2 className="top__title" onClick={() => navigate("/home")}>
        Hearth
      </h2>
      {/* </Link> */}
      <div
        className="top__profile"
        onMouseDown={() => setMenuHover(true)}
        onMouseLeave={() => setMenuHover(false)}
      >
        <div className="top__profile__preview">
          <div className="top__profile__primary">
            {/* <span className="material-symbols-outlined" aria-label = "toggle help" onClick = {() => toggleHelp()}>help</span> */}
            <span
              className="material-symbols-outlined top__icon"
              aria-hidden="true"
            >
              account_circle
            </span>
            <p className={mobileWindow ? "top__name--hidden" : "top__name"}>
              {name}
            </p>
          </div>
          {menuHover ? (
            <div className="top__profile__opened">
              <div className="top__profile-segment" onClick={() => toggleDarkMode()}>
                <span className="material-symbols-outlined">{darkMode ? 'radio_button_checked' : 'radio_button_unchecked'}</span>
                <p className="top__signout">
                  Dark Mode
                </p>
              </div>
              <div className="top__profile-segment">
                <span
                  className="material-symbols-outlined logout-icon"
                  aria-hidden="true"
                >
                  logout
                </span>
                <p className="top__signout" onClick={() => handleLogOut()}>
                  Sign Out
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TopLogo;
