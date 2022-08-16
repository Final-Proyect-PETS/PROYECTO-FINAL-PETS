import {Routes, Route, BrowserRouter } from "react-router-dom"
import './App.css';
import LandingPage from "./components/LandingPage"

function App() {
  return (
    <BrowserRouter>
        <Routes>
        <Route path={'/'} element={<LandingPage />}/>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
