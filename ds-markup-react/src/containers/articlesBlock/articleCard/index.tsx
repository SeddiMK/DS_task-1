import React, { useEffect, useState } from "react";
import StickerFashion from "@public/assets/images/articles/stikers/fashion.svg";
import StickerDesign from "@public/assets/images/articles/stikers/design.svg";
import StickerMarketing from "@public/assets/images/articles/stikers/marketing.svg";
import StickerSoftware from "@public/assets/images/articles/stikers/software.svg";
import IconDate from "@public/assets/images/icons/general/calendar.svg";
import IconTime from "@public/assets/images/icons/general/cloсk.svg";
import { MaskedImage } from "../../maskedImage";
import MaskImageSrc from "@public/assets/images/articles/mask/fashion.png";
import { ArticleCardProps } from "@/types/db";
import { StickersImage } from "@/containers/stickersImage";
import { IconSprite } from "@/containers/IconSprite";
import spriteStickers from "@public/assets/images/stickers/spriteStickers.svg";
import { Loading } from "@/containers/loading";

// !!!
const classes = ["fashion", "design", "design-ux-ui", "marketing", "software"];

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  // const [classCard, setClassCard] = useState("");
  const [nameStickers, setNameStickers] = useState("");

  useEffect(() => {
    if (article) {
      if (article.stamp.word.toLowerCase() === "diseño") {
        setNameStickers("design");
      } else {
        setNameStickers(article.stamp.word.toLowerCase());
      }
    }
  }, [article]);

  if (!article) {
    return <Loading />;
  }

  console.log("article=====", article);
  console.log("article.stamp.word=====", article.stamp.word.toLowerCase());
  console.log("nameStickers=====", nameStickers);

  return (
    <article
      className={
        index === 2
          ? `articles__design-ux-ui design-ux-ui`
          : `articles__cards articles-cards cards articles-cards_m_b card-${nameStickers}`
      }
    >
      <div
        className={
          index === 2 ? `` : `articles-cards__card card card-${nameStickers}`
        }
      >
        <div
          className={
            index === 2
              ? `design-ux-ui__img-wrapper`
              : `card__img-wrapper img-wrapper-${nameStickers}`
          }
        >
          {/* <div
            className={
              index === 2
                ? `design-ux-ui__img-wrp img-wrp mask mask-design-ux-ui`
                : `card__img-wrp img-wrp img-wrp-cards mask mask-${nameStickers} `
            }
          > */}
          <MaskedImage
            src={article.img.url}
            alt={
              article.title ||
              "imagen de una niña con una computadora portátil en su regazo"
            }
            maskShape={article.img.shape}
            className={
              index === 2
                ? `design-ux-ui__img-wrp img-wrp mask mask-design-ux-ui`
                : `card__img-wrp img-wrp img-wrp-cards mask mask-${nameStickers} `
            }
          />

          <span
            className={`img-wrp__stiker-articles stiker-img stiker-${index === 2 ? `design-ux-ui` : nameStickers} ${index === 0 && "stiker-img_l_t_47"} ${index === 1 && "stiker-design_rotate-animation"} ${(index === 1 || index === 2) && "stiker-img_r_t_47"} ${index === 2 && "stiker-img_r_t_15"}  ${index === 3 && "stiker-img_l_t_80"} ${index === 4 && "stiker-img_r_t"}`}
          >
            {/* <StickersImage
              word={article.stamp.word}
              type={article.stamp.type}
              position={article.stamp.position}
            /> */}

            <IconSprite name={nameStickers} nameSpriteSrc={spriteStickers} />

            {/* {index === 0 && <StickerFashion />}
            {(index === 1 || index === 2) && <StickerDesign />}
            {index === 3 && <StickerMarketing />}
            {index === 4 && <StickerSoftware />} */}
          </span>
        </div>

        <div
          className={`articles__content-info content-info content-info-${nameStickers} ${index === 2 && "design-ux-ui__info content-info-big-card info-design-ux-ui content-info"}`}
        >
          <div className="content-info__links links-cards">
            <ul
              className={`content-info__list list list-${nameStickers} list-cards`}
            >
              {article.tags.map((tag: string, index: number) => (
                <li key={index} className="list__item">
                  <a
                    href="#"
                    className={`list__link ${index === 0 ? `link-${nameStickers} btn` : ""}`}
                  >
                    {tag}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="content-info__text text-info text-info-articles text-info-card">
            <h3 className="text-info__title">{article.title}</h3>
            <p className="text-info__sub-text">{article.text}</p>
          </div>

          <div className="content-info__date">
            <p className="content-info__date-text date-text">
              <span className="date-text__icon icon">
                {/* <IconDate /> */}
                svg
              </span>
              <span className="date-text__txt">{article.date}</span>
            </p>
            <p className="content-info__time time">
              <span className="time__icon icon">
                {/* <IconTime /> */}
                svg
              </span>
              <span className="time__text">{article.duration} min</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
