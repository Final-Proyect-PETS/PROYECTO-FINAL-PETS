import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage";
import UserDetail from "./components/UserDetail/UserDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/userDetail"} element={<UserDetail />} />
        <Route path={"/about"} element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
