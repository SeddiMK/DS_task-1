import IconSpinnerLoading from "@public/assets/images/icons/general/6-dots-rotate.svg";
import { IconSprite } from "../icons/IconSprite";

export const Loading = () => {
  return (
    <div>
      Loading component...{" "}
      <IconSprite name="" nameIconSrc={IconSpinnerLoading} />
    </div>
  );
};
