import "./_App.scss";
import {useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import TopLogo from "./components/TopLogo/TopLogo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn ={isLoggedIn} setIsLoggedIn = {setIsLoggedIn}/>}></Route>
        <Route
          path="/home"
          element={
            <>
              <TopLogo />
              <HomePage isLoggedIn={isLoggedIn}/>
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
