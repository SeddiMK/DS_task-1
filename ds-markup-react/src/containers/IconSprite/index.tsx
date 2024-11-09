import { IconProps } from "@/types/general";
import { useEffect, useState } from "react";

export const IconSprite: React.FC<IconProps> = ({
  name,
  nameSpriteSrc,
  width,
  height,
  className,
  bgColorIcon,
}) => {
  const [nameStickers, setNameStickers] = useState("");

  useEffect(() => {
    if (name) {
      setNameStickers(name);
    }

    if (!name) {
      setNameStickers("gaming");
    }
  }, [name]);

  console.log(name, "name+++++++++++++++++++++");
  console.log(nameSpriteSrc, "nameSpriteSrc+++++++++++++++++++++");

  return (
    <svg
      className={`icon icon-${nameStickers}`}
      // style={{ backgroundColor: bgColorIcon }}
      width={width}
      height={height}
    >
      <use xlinkHref={nameSpriteSrc + `#icon-${nameStickers}`} />
    </svg>
  );
};
