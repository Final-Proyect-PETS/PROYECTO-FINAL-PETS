import {Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import Home from "./components/Home";
import LandingPage from "./components/LandingPage"
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path={'/'} element={<LandingPage />}/>
        <Route path={'/register'} element={<Register />}/>
        <Route path={'/home'} element={<Home />}/>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
