import Dylan from "@public/assets/images/bg/dylan_3.jpg";
import Icon from "@public/assets/images/bg/icons_1.jpg";
import Person from "@public/assets/images/bg/personas_1.jpg";
import PixelArt from "@public/assets/images/bg/pixel-art_1.jpg";
// ------------------------------------------------------------------------

// export const bgImgUrl: string[] = [Dylan, Icon, Person, PixelArt];
export const bgImgUrlFetch = (bgStyle: string) => {
  if (bgStyle === "brazil") {
    return Dylan;
  } else if (bgStyle === "dylan") {
    return Dylan;
  } else if (bgStyle === "icons") {
    return Icon;
  } else if (bgStyle === "personas") {
    return Person;
  } else if (bgStyle === "pixel-art") {
    return PixelArt;
  }
};
