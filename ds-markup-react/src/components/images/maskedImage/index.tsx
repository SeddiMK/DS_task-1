import { MaskedImageProps } from "@/types/general";

export const MaskedImage: React.FC<MaskedImageProps> = ({
  src,
  alt,
  maskShape,
  maskSrcMiniCardAvatar,
  maskType,
  className,
  width,
  height,
}) => {
  return (
    <div
      className={`img-wrp mask mask-${maskType} ${className}`}
      style={{
        width: width,
        height: height,
        maskImage: `url(${maskShape || maskSrcMiniCardAvatar})`,
        WebkitMaskImage: `url(${maskShape || maskSrcMiniCardAvatar})`,
        maskSize: "cover",
        maskPosition: "center",
        maskRepeat: "no-repeat",
      }}
    >
      <img className="img-wrp__imamge img masked-image" src={src} alt={alt} />
    </div>
  );
};
