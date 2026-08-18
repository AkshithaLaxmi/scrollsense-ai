import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Reels from "./pages/Reels";
import AIAnalysis from "./pages/AIAnalysis";
import Recommendations from "./pages/Recommendations";
import InterestMap from "./pages/InterestMap";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/analysis" element={<AIAnalysis />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/interest-map" element={<InterestMap />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
