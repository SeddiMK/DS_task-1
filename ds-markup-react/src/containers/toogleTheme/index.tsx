import { useTheme } from "@/hooks/useTheme";
import "./style.css";

export const ToggleTheme: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const switchToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={`switch-toggle-theme btn ${theme}`}>
      <div className="switch-toggle-theme__btn-switch btn-swh">
        <span className="btn-swh__text">
          {theme === "dark" ? "Dark" : "Light"}
        </span>
        <label className="btn-swh__switch">
          <input
            className="btn-swh__inp"
            type="checkbox"
            checked={theme === "dark"}
            onChange={switchToggleTheme}
          />
          <span className="btn-swh__slider"></span>
        </label>
      </div>
    </div>
  );
};
