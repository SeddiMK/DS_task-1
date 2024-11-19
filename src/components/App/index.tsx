import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GameProvider } from "@/context/GameContext";
import { GameField } from "@/containers/GameField";
import { Settings } from "@/components/Settings";
import { Results } from "@/components/Results";
import "./style.css";

export const App: React.FC = () => {
  return (
    <GameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<GameField />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </GameProvider>
  );
};
