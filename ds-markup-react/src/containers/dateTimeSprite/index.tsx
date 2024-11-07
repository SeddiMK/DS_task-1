import DateTimeIcons from "@public/assets/images/icons/general/spriteDateTime.svg";

export const DateTimeSprite = ({ name = "", color = "", size = "" }) => {
  return (
    <svg
      style={{ position: "absolute" }}
      width={size}
      viewBox="0 0 1000 500"
      // fill={color}
    >
      <use href={DateTimeIcons + `#${name}`} />
    </svg>
  );
};
