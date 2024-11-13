import { IconProps } from "@/types/general";

export const IconSprite: React.FC<IconProps> = ({
  name,
  nameIconSrc,
  width,
  height,
  className,
  fellIcon,
}) => {
  return (
    <svg
      className={`${className ? className : ""} icon icon-${name}`}
      style={{ fill: fellIcon }}
      // width={width}
      // height={height}
    >
      <use xlinkHref={nameIconSrc + `#icon-${name}`} />
    </svg>
  );
};
