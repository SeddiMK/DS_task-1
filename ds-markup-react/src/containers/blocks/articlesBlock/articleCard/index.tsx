import React, { useEffect, useState } from "react";
import { MaskedImage } from "@/components/images/maskedImage";
import { ArticleCardProps } from "@/types/db";
import { IconSprite } from "@/components/icons/IconSprite";
import { Loading } from "@/components/loading";
import {
  getFullMaskPath,
  SpriteDateTime,
  SpriteStickers,
} from "@/config/paths";

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const [nameStickers, setNameStickers] = useState("");
  const [classSpanStickers, setSpanStickers] = useState("");

  // const spanStickersClass = (index: number) => {
  //   if (index === 2) {
  //   }
  // };

  useEffect(() => {
    if (article) {
      if (article.stamp.word.toLowerCase() === "diseño") {
        setNameStickers("design");
      } else {
        setNameStickers(article.stamp.word.toLowerCase());
      }
    }
  }, [article]);

  useEffect(() => {
    if (nameStickers) {
      setSpanStickers(
        `img-wrp__stiker-articles stiker-img stiker-${index === 2 ? `design-ux-ui` : nameStickers} ${index === 1 ? "stiker-design_rotate-animation" : ""} stiker_${article.stamp.position}`,
      );
    }
  }, [nameStickers]);

  if (!article) {
    return <Loading />;
  }

  // console.log("article=====", article);
  // console.log("article.stamp.word=====", article.stamp.word.toLowerCase());
  // console.log("nameStickers=====", nameStickers);

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
            maskShape={getFullMaskPath(article.img.shape)}
            className={
              index === 2
                ? `design-ux-ui__img-wrp img-wrp mask mask-design-ux-ui`
                : `card__img-wrp img-wrp img-wrp-cards mask mask-${nameStickers} `
            }
          />

          <span id={`stiker-${nameStickers}`} className={classSpanStickers}>
            {/* <StickersImage
              word={article.stamp.word}
              type={article.stamp.type}
              position={article.stamp.position}
            /> */}

            <IconSprite name={nameStickers} nameIconSrc={SpriteStickers} />

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
                <IconSprite
                  name="calendar"
                  nameIconSrc={SpriteDateTime}
                  fellIcon="#aeaeae"
                />
              </span>
              <span className="date-text__txt">{article.date}</span>
            </p>
            <p className="content-info__time time">
              <span className="time__icon icon">
                <IconSprite
                  name="clock"
                  nameIconSrc={SpriteDateTime}
                  fellIcon="#aeaeae"
                />
              </span>
              <span className="time__text">{article.duration} min</span>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
