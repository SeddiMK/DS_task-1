import { IconProps } from "@/types/general";
import { useEffect, useState } from "react";

export const IconSprite: React.FC<IconProps> = ({
  name,
  nameIconSrc,
  width,
  height,
  className,
  fellIcon,
}) => {
  // const [nameIcon, setNameIcon] = useState("");

  // useEffect(() => {
  //   if (name) {
  //     setNameIcon(name);
  //   }
  // }, [name]);

  return (
    <svg
      className={`${className ? className : ""} icon icon-${name}`}
      style={{ fill: fellIcon }}
      width={width}
      height={height}
    >
      <use xlinkHref={nameIconSrc + `#icon-${name}`} />
    </svg>
  );
};
