import { Images } from "@/containers/GameField";
import Beach from "@public/assets/images/cards/art/beach.jpg";
import CityMoto from "@public/assets/images/cards/art/city-moto.jpg";
import Duck from "@public/assets/images/cards/art/duck.jpg";
import Eagle from "@public/assets/images/cards/art/eagle.jpg";
import Field from "@public/assets/images/cards/art/field.jpg";
import Home from "@public/assets/images/cards/art/home.jpg";
import Lambo from "@public/assets/images/cards/art/lambo.jpg";
import Land from "@public/assets/images/cards/art/land.jpg";
import Porche from "@public/assets/images/cards/art/porche.jpg";
import Ship from "@public/assets/images/cards/art/ship.jpg";
import Speace from "@public/assets/images/cards/art/speace.jpg";
import Train from "@public/assets/images/cards/art/train.jpg";

export const fetchCards = async () => {
  try {
    // const response = await fetch("https://api.example.com/cards");
    // const data = await response.json();

    // const data: Images[] = [
    // { src: IconAlarm, matched: false, flipped: 0 },
    // { src: IconAlert, matched: false, flipped: 0 },
    // { src: IconCalendar, matched: false, flipped: 0 },
    // { src: IconCrown, matched: false, flipped: 0 },
    // ]; //!!!

    // const response = await fetch(
    //   "https://api.pexels.com/v1/curated?per_page=12",
    //   {
    //     headers: {
    //       Authorization: "YOUR_API_KEY",
    //     },
    //   },
    // );
    // const data = await response.json();
    // return data.photos.map((item: any) => item.src.tiny); // Получаем URL изображений

    const imageUrls: Images[] = [
      Beach,
      CityMoto,
      Duck,
      Eagle,
      Field,
      Home,
      Lambo,
      Land,
      Porche,
      Ship,
      Speace,
      Train,
    ];

    // const imageUrls = [];
    // for (let i = 0; i < 12; i++) {
    //   // imageUrls.push(`https://picsum.photos/200/200`);
    //   imageUrls.push(
    //     `https://api.dicebear.com/9.x/pixel-art/svg?seed=${Math.random()}`,
    //   );
    // }

    // setLoading(false); // если данные не загрузились

    // console.log(shuffleCards(cardArrayConvert(imageUrls)));
    return imageUrls;
  } catch (error) {
    console.error("Ошибка при загрузке карт:", error);
    // setLoading(false);
  }
};
