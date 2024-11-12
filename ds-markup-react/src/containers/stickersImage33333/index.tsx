import { StickerImageProps } from "@/types/general";
import { useEffect, useState } from "react";
import { ImageComponent } from "../utils/imageComponent";

//  style={{ maskImage: `url(${maskUrl})` }}
export const StickersImage: React.FC<StickerImageProps> = ({
  word,
  type,
  position,
}) => {
  const [stickerSrc, setStickerSrc] = useState("");

  useEffect(() => {
    if (word) {
      setStickerSrc(`../../assets/images/stickers/${word.toLowerCase()}.svg`);
    }
  }, []);

  return (
    <>
      <span
        className={`img-wrp__stiker-gaming stiker-gaming stiker-img`}
        style={
          {
            // width: width,
            // height: height,
            //   maskImage: `url(${maskSrc})`,
            //   WebkitMaskImage: `url(${maskSrc})`,
            //   maskSize: "cover",
            //   maskPosition: "center",
            //   maskRepeat: "no-repeat",
          }
        }
      >
        {/* <ImageComponent iconUrl={stickerSrc} /> */}
      </span>
    </>

    // <div
    // // className={`img-wrp mask mask-${maskType} ${className}`}
    // // style={{
    // //   // width: width,
    // //   // height: height,
    // //   maskImage: `url(${maskSrc})`,
    // //   WebkitMaskImage: `url(${maskSrc})`,
    // //   maskSize: "cover",
    // //   maskPosition: "center",
    // //   maskRepeat: "no-repeat",
    // // }}
    // >
    //   {/* <img className="img-wrp__imamge img masked-image" src={src} alt={alt} /> */}
    // </div>
  );
};
