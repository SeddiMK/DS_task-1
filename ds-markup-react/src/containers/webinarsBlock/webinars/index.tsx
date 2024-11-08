import { useState, useEffect } from "react";
import { WebinarCard } from "../webinarCard";
import { useDB } from "@/hooks/getDB";
import { Loading } from "@/containers/loading";
import { Marquee } from "@/components/marquee";
import { Proposals } from "@/types/db";
import "./style.css";

export const Webinars: React.FC = () => {
  const { fetchData } = useDB("sections");
  const [data, setData] = useState<Proposals | null>(null);

  useEffect(() => {
    setData(fetchData?.proposals);
  }, [fetchData]);

  if (!data) return <Loading />;

  return (
    <section className="webinars">
      <div className="webinars-wrp">
        <div className="container webinars-cnt">
          <div className="webinars__title">
            <h2 className="webinars__title-txt">{data.title}</h2>
          </div>
          <div className="webinars__btn">
            <a
              href="#"
              className="webinars__btn-link btn link-btn-webinars webinars_bgc_active webinars_bgc_hover webinars_bgc_focus webinars_bgc_disabled"
            >
              {data["browse-all-text"]}
            </a>
          </div>

          <div className="webinars__cards-mini">
            {data.items.map((webinar, index) => (
              <WebinarCard key={index} webinar={webinar} index={index} />
            ))}
          </div>
        </div>
      </div>
      <Marquee
        tickerClass="webinars"
        tickerText={data.ticker.text}
        tickerColor={data.ticker.color}
      />
    </section>
  );
};
