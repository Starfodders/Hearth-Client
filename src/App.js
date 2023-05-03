import "./_App.scss";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import TopLogo from "./components/TopLogo/TopLogo";
import ChaptersSlidesPage from "./pages/ChaptersSlidesPage";
import SectionsSlidesPage from "./pages/SectionsSlidesPage";
import UnitsSlidesPage from "./pages/UnitsSlidesPage"
import UnitsInnerPage from "./pages/UnitsInnerPage";
import SlidesBackground from "./components/SlidesBackground/SlidesBackground";
import MeditationPage from "./pages/MeditationPage";
import CollectionPage from "./pages/CollectionPage";
import BotNav from "./components/BotNav/BotNav";
import CreditsPage from "./pages/CreditsPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState(sessionStorage.getItem('currentName'));

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setDisplayName={setDisplayName}
            />
          }
        ></Route>
        <Route
          path="/home"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn} />
              <HomePage isLoggedIn={isLoggedIn} name = {displayName}/>
            </>
          }
        ></Route>
        <Route
          path="/chapters"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn} />

              <ChaptersSlidesPage isLoggedIn={isLoggedIn} />
              <SlidesBackground/>
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/chapters/:chapterID"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn} />

              <SectionsSlidesPage isLoggedIn={isLoggedIn} />
              <SlidesBackground/>

              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/chapters/units/:sectionID"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn}/>

              <UnitsSlidesPage isLoggedIn={isLoggedIn} />
              <SlidesBackground/>

              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/unit/:name/:id"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn}/>

              <UnitsInnerPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/meditation"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn}/>

              <MeditationPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/collection"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn}/>

              <CollectionPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
         <Route
          path="/credits"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn}/>

              <CreditsPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
