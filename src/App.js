import "./_App.scss";
import { useEffect, useState } from "react";
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

              <ChaptersPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/chapters/:id"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn} />

              <ChaptersPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/chapters/:name/:unitId"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn}/>

              <ChaptersPage isLoggedIn={isLoggedIn} />
              <BotNav />
            </>
          }
        ></Route>
        <Route
          path="/unit/:name/:id"
          element={
            <>
              <TopLogo name={displayName} login = {setIsLoggedIn}/>

              <UnitsPage isLoggedIn={isLoggedIn} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
