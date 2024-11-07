import React, { useEffect, useState } from "react";
import { useDB } from "@/hooks/getDB";

import "./style.css";

import MaskedImage from "../maskedImage";
import MaskImageSrc from "@/mask-gaming.png";
import { Item2 } from "@/types/db";

export const Gaming: React.FC = () => {
  const { fetchData } = useDB("sections");
  const [item, setItem] = useState<Item2 | null>(null);

  // const item = fetchData?.main.items[0];

  useEffect(() => {
    setItem(fetchData?.main.items[0]);
  }, [fetchData]);

  console.log(item);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <section className="gaming">
      <div className="container gaming-cnt">
        <div className="gaming__img-wrapper">
          <MaskedImage
            src={item.img.url}
            alt="imagen de una niña con una computadora portátil en su regazo"
            maskSrc={MaskImageSrc}
            // maskType={item.img.shape}
            className="mask-gaming gaming__img-wrp"
          />
          {/* ../../../ */}
          {/* <div
            className={`gaming__img-wrp img-wrp mask mask-${item.img.shape}`}
          >
            <img
              className="img-wrp__imamge img img-gaming"
              src={item.img.url}
              alt="imagen de una niña con una computadora portátil en su regazo"
            />
          </div> */}
          <span
            className={`img-wrp__stiker-gaming stiker-img stiker-img_r_t_0`}
          >
            {item.stamp.word}
          </span>
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
              <span className="date-text__icon icon">svg</span>
              <span className="date-text__txt">{item.date}</span>
            </p>
            <p className="content-info__time time">
              <span className="time__icon icon">svg</span>
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
    </section>
  );
};
