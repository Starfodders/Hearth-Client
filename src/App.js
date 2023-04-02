import "./_App.scss";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import TopLogo from "./components/TopLogo/TopLogo";
import ChaptersPage from "./pages/ChaptersPage";
import MeditationPage from "./pages/MeditationPage";
import CollectionPage from "./pages/CollectionPage";
import BotNav from "./components/BotNav/BotNav";
import UnitsPage from "./pages/UnitsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        ></Route>
        <Route
          path="/home"
          element={
            <>
              <TopLogo />
              <HomePage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/chapters"
          element={
            <>
              <TopLogo />
              <ChaptersPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/chapters/:id"
          element={
            <>
              <TopLogo />
              <ChaptersPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/chapters/:name/:unitId"
          element={
            <>
              <TopLogo />
              <ChaptersPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/unit/:name/:id"
          element={
            <>
              <TopLogo />
              <UnitsPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/meditation"
          element={
            <>
              <TopLogo />
              <MeditationPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/collection"
          element={
            <>
              <TopLogo />
              <CollectionPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
