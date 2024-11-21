import { FC } from "react";

export interface GameResultModalProps {
  isSuccess: boolean;
  score: number;
  difficulty: string;
  errors: number;
  onClose?: () => void;
}

export const GameResultModal: FC<GameResultModalProps> = ({
  isSuccess,
  score,
  difficulty,
  errors,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{isSuccess ? "Поздравляем!" : "Неудача!"}</h2>
        <p>Сложность: {difficulty}</p>
        <p>Ошибки: {errors}</p>
        <p>Ваш счет: {score}</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};
