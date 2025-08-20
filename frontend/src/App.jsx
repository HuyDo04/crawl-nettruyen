import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/tim-truyen" />} />
        <Route path="/tim-truyen" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
