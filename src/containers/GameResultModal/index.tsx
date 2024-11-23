import { FC } from "react";
import "./style.css";
export interface GameResultModalProps {
  isSuccess: boolean;
  score: number;
  duration: number;
  difficulty: string;
  errors: number;
  onClose?: () => void;
}

export const GameResultModal: FC<GameResultModalProps> = ({
  isSuccess,
  score,
  duration,
  difficulty,
  errors,
  onClose,
}) => {
  return (
    <div className="modal__overlay">
      <div className="modal__content content-modal">
        <h2 className="content-modal__title">
          {isSuccess ? "Поздравляем!" : "Неудача!"}
        </h2>
        <p className="content-modal__text">Сложность: {difficulty}</p>
        <p className="content-modal__text">Затраченное время: {duration}c</p>
        <p className="content-modal__text">Ошибки: {errors}</p>
        <p className="content-modal__text">Ваш счет: {score}</p>
        <button
          className="content-modal__btn btn btn-content-modal"
          onClick={onClose}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};
