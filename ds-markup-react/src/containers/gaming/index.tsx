import React, { useEffect, useState } from "react";
import { useDB } from "@/hooks/getDB";
import StickersGaming from "@public/assets/images/gaming/sticker/sticker-gaming.svg";
import IconDate from "@public/assets/images/icons/general/calendar.svg";
import IconTime from "@public/assets/images/icons/general/cloсk.svg";
import { MaskedImage } from "../maskedImage";
import { Item2, Main } from "@/types/db";
import { Marquee } from "@/components/marquee";
import { Loading } from "../loading";
import "./style.css";
import { StickersImage } from "../stickersImage";
import { IconSprite } from "../IconSprite";
import spriteStickers from "@public/assets/images/stickers/spriteStickers.svg";

export const Gaming: React.FC = () => {
  const { fetchData } = useDB("sections");
  const [data, setData] = useState<Main | null>(null);
  const [item, setItem] = useState<Item2 | null>(null);

  useEffect(() => {
    setData(fetchData?.main);
    setItem(fetchData?.main.items[0]);
  }, [fetchData]);

  if (!data) return <Loading />;

  return (
    <section className="gaming">
      <div className="container gaming-cnt">
        <div className="gaming__img-wrapper">
          <MaskedImage
            src={item.img.url}
            alt="imagen de una niña con una computadora portátil en su regazo"
            maskShape={item.img.shape}
            className="mask-gaming gaming__img-wrp"
          />
          <span
            className={`img-wrp__stiker-gaming stiker-gaming stiker-img stiker-img_r_t_0`}
          >
            <IconSprite name="gaming" nameSpriteSrc={spriteStickers} />
          </span>
          {/* <StickersImage
            word={item.stamp.word}
            type={item.stamp.type}
            position={item.stamp.position}
          /> */}
          {/* <StickersGaming /> */}
        </div>

        <div className="gaming__content-info content-info-big-card content-info-gaming">
          <div className="content-info__links links-big-cards">
            <ul className="content-info__list list list-gaming">
              {item.tags.map((tag: string, index: number) => (
                <li className="list__item" key={index}>
                  <a
                    href="#"
                    className={`list__link ${index === 0 ? "btn link-gaming" : ""}`}
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="content-info__text text-info text-info-gaming">
            <h3 className="text-info__title">{item.title}</h3>
            <p className="text-info__sub-text">{item.text}</p>
          </div>
          <div className="content-info__date date-big-cards date-big-cards-gaming">
            <p className="content-info__date-text date-text">
              <span className="date-text__icon icon">
                {/* <IconDate /> */}
                svg
              </span>
              <span className="date-text__txt">{item.date}</span>
            </p>
            <p className="content-info__time time">
              <span className="time__icon icon">
                svg
                {/* <IconTime /> */}
              </span>
              <span className="time__text">{item.duration} min</span>
            </p>
          </div>
          <div className="content-info__link-btn">
            <a
              href="#"
              className="content-info__link-btn-item btn link-btn-gaming link-btn-gaming_active link-btn-gaming_hover link-btn-gaming_disabled link-btn-gaming_focus"
            >
              {item["browse-text"]}
            </a>
          </div>
        </div>
      </div>
      <Marquee
        tickerClass="articles"
        tickerText={data.ticker.text}
        tickerColor={data.ticker.color}
      />
    </section>
  );
};
