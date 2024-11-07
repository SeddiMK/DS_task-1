import { useState, useEffect } from "react";

type Author = {
  img: string;
  name: string;
  position: string;
};

type Webinar = {
  background: string;
  author: Author;
  text: string;
  tags: string[];
  date_from: string;
  date_to: string;
  time: string;
};

interface WebinarCardProps {
  index: number;
  webinar: Webinar;
}

const classes = ["one", "two", "three"];

export const WebinarCard: React.FC<WebinarCardProps> = ({ webinar, index }) => {
  const [classCard, setClassCard] = useState("");

  useEffect(() => {
    setClassCard(classes[index]);
  }, [webinar]);

  console.log(webinar, "webinar----------------");

  return (
    <article
      className={`webinars__card-mini card-mini card-mini-${classCard}`}
      style={{ backgroundColor: webinar.background }}
    >
      <div className="card-mini__top top-card-mini">
        <div className="top-card-mini__avatar img-wrp img-card-mini">
          <img
            className="card-mini__img img img-avatar-mini"
            src={webinar.author.img}
            alt={`Avatar of ${webinar.author.name}`}
          />
        </div>
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
            <span className="date-text__icon icon learn-time-icon">svg</span>
            <span className="date-text__txt">
              {webinar.date_from} - {webinar.date_to}
            </span>
          </p>
          <p className="learn-time__time time">
            <span className="time__icon icon">svg</span>
            <span className="time__text">{webinar.time}</span>
          </p>
        </div>
      </div>
    </article>
  );
};
