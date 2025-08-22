import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import ComicDetail from "./Pages/ComicDetail/ComicDetail"; // Import ComicDetail
import ChapterDetail from "./Pages/ChapterDetail/ChapterDetail"; // Import ChapterDetail
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/tim-truyen" />} />
        <Route path="/tim-truyen" element={<Home />} />
        <Route path="/truyen-tranh/:slug" element={<ComicDetail />} /> {/* Route for ComicDetail */}
        <Route path="/truyen-tranh/:comicSlug/:chapterSlug" element={<ChapterDetail />} /> {/* Route for ChapterDetail */}
      </Routes>
    </div>
  );
}

export default App;
