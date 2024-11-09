import { MaskedImageProps } from "@/types/general";
// import Masks from "@public/assets/images/sprites/masks";
import { useEffect, useState } from "react";

{
  /* <MaskedImage
  src="/path/to/image1.jpg"
  alt="Circular masked image"
  maskType="circle"
/> */
}

//  style={{ maskImage: `url(${maskUrl})` }}
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
  const [maskSrc, setMaskSrc] = useState("");

  useEffect(() => {
    if (!maskSrcMiniCardAvatar) {
      setMaskSrc(`../../assets/images/masks/${maskShape}.png`);
    } else {
      setMaskSrc(maskSrcMiniCardAvatar);
    }
  }, [maskShape]);
  console.log("maskSrc", maskSrc);

  return (
    <div
      className={`img-wrp mask mask-${maskType} ${className}`}
      style={{
        // width: width,
        // height: height,
        maskImage: `url(${maskSrc})`,
        WebkitMaskImage: `url(${maskSrc})`,
        maskSize: "cover",
        maskPosition: "center",
        maskRepeat: "no-repeat",
      }}
    >
      <img className="img-wrp__imamge img masked-image" src={src} alt={alt} />
    </div>
  );
};
