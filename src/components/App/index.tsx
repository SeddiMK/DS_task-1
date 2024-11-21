import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameProvider } from "@/context/GameContext";
import { GameField } from "@/containers/GameField";
import { Settings } from "@/containers/Settings";
import { GameResults } from "@/containers/GameResults";
import "./style.css";

export const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GameField />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/results" element={<GameResults />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};
