import { MaskedImage } from "@/components/images/maskedImage";
import MaskImageSrc from "@public/assets/images/webinars/card/mask/mask-avatar.png";
import SpriteDateTime from "@public/assets/images/icons/general/dateTime/spriteDateTime.svg";
import { WebinarCardProps } from "@/types/db";
import { IconSprite } from "@/components/icons/IconSprite";

export const WebinarCard: React.FC<WebinarCardProps> = ({ webinar, index }) => {
  return (
    <article
      className={`webinars__card-mini card-mini card-mini-${index}`}
      style={{ backgroundColor: webinar.background }}
    >
      <div className="card-mini__top top-card-mini">
        <MaskedImage
          src={webinar.author.img}
          alt={`Avatar of ${webinar.author.name}`}
          maskSrcMiniCardAvatar={MaskImageSrc}
          className={`top-card-mini__avatar img-wrp img-card-mini mask-${index}`}
        />

        <div className="top-card-mini__title title-card-mini_m_b_31">
          <h5 className="top-card-mini__name">{webinar.author.name}</h5>
          <p className="top-card-mini__specialization">
            {webinar.author.position}
          </p>
        </div>
      </div>
      <div className="card-mini__title">
        <h4 className="card-mini__title-txt">{webinar.text}</h4>
      </div>
      <div className="card-mini__bottom bottom-card-mini">
        <div className="bottom-card-mini__horizon horizon">
          <h5 className="horizon__title">{webinar.tags[0]}</h5>
          <p className="horizon__text">{webinar.tags[1]}</p>
        </div>
        <div className="bottom-card-mini__learn-time learn-time">
          <p className="learn-time__date-text date-text">
            <span className="date-text__icon icon learn-time-icon">
              <IconSprite
                name="calendar"
                nameIconSrc={SpriteDateTime}
                fellIcon="#fcfaf9"
              />
            </span>
            <span className="date-text__txt">
              {webinar.date_from} {webinar.date_to}
            </span>
          </p>
          <p className="learn-time__time time">
            <span className="time__icon icon">
              <IconSprite
                name="clock"
                nameIconSrc={SpriteDateTime}
                fellIcon="#fcfaf9"
              />
            </span>
            <span className="time__text">{webinar.time}</span>
          </p>
        </div>
      </div>
    </article>
  );
};
