import Icons from "./sprite.svg";

export const iconSocial = ({ id = "", className = "" }) => {
  return (
    <svg className={className}>
      <use href={Icons + "#icon-" + id}></use>
    </svg>
  );
};
