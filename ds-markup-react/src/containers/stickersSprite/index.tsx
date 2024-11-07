import Stickers from "@public/assets/images/sprites/stickers/sprite.svg";

export const StickersSprite = ({ name = "", color = "", size = "" }) => {
  return (
    <svg
      style={{ position: "absolute" }}
      width={size}
      viewBox="0 0 1000 500"
      // fill={color}
    >
      <use href={Stickers + `#${name}`} />
    </svg>
  );
};
