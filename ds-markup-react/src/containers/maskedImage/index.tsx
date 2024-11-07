{
  /* <MaskedImage
  src="/path/to/image1.jpg"
  alt="Circular masked image"
  maskType="circle"
/> */
}

interface MaskedImageProps {
  src: string;
  alt: string;
  maskSrc: string;
  maskType?: "circle" | "square" | "arch" | "rounded";
  className?: string;
  width?: string;
  height?: string;
}
//  style={{ maskImage: `url(${maskUrl})` }}
const MaskedImage: React.FC<MaskedImageProps> = ({
  src,
  alt,
  maskSrc = "",
  maskType = "square",
  className = "",
  width = "300px",
  height = "300px",
}) => {
  return (
    <div
      className={`img-wrp mask mask-${maskType} ${className}`}
      style={{
        // width: width,
        // height: height,
        // maskImage: `url(${maskSrc})`,
        // WebkitMaskImage: `url(${maskSrc})`,
        maskSize: "cover",
        maskPosition: "center",
        maskRepeat: "no-repeat",
      }}
    >
      <img className="img-wrp__imamge img masked-image" src={src} alt={alt} />
    </div>
  );
};

export default MaskedImage;
