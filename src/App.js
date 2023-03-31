import "./_App.scss";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import TopLogo from "./components/TopLogo/TopLogo";
import ChaptersPage from "./pages/ChaptersPage";
import MeditationPage from "./pages/MeditationPage";
import CollectionPage from "./pages/CollectionPage";

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
            </>
          }
        ></Route>
        <Route
          path="/chapters"
          element={
            <>
              <TopLogo />
              <ChaptersPage isLoggedIn={isLoggedIn} />
            </>
          }
        ></Route>
         <Route
          path="/meditation"
          element={
            <>
              <TopLogo />
              <MeditationPage isLoggedIn={isLoggedIn} />
            </>
          }
        ></Route>
         <Route
          path="/collection"
          element={
            <>
              <TopLogo />
              <CollectionPage isLoggedIn={isLoggedIn} />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
