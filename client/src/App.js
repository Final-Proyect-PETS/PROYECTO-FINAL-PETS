import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage";
import UserDetail from "./components/UserDetail/UserDetail";
import Register from "./components/Register";
import PetRegister from "./components/PetRegister";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<LandingPage />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/userdetail"} element={<UserDetail />} />
        <Route path={"/about"} element={<About />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/petregister"} element={<PetRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
