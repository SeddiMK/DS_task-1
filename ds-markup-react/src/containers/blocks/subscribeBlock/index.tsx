import React, { useEffect, useState } from "react";
import { useDB } from "@/hooks/getDB";
import { Subscription } from "@/types/db";
import { Marquee } from "@/components/marquee";
import { Loading } from "@/components/loading";
import { FormSubscribe } from "@/containers/formSubscribe";
import "./style.css";

export const SubscribeBlock: React.FC = () => {
  const { fetchData } = useDB("sections");
  const [data, setData] = useState<Subscription | null>(null);

  useEffect(() => {
    setData(fetchData?.subscription);
  }, [fetchData]);

  if (!data) return <Loading />;

  return (
    <section className="subscribe-block">
      <div className="container subscribe-block-cnt">
        <div className="subscribe-block__section section-subscribe">
          <div className="section-subscribe__wrp">
            <div className="section-subscribe__union">
              <div className="section-subscribe__content content-subscribe-block">
                <div className="content-subscribe-block__text text-info text-info-section-subscribe">
                  <h3 className="text-info__title title-section-subscribe">
                    {data.title}
                  </h3>
                  <p className="text-info__sub-text sub-text-section-subscribe">
                    {data.text}
                  </p>
                </div>
              </div>
              <div className="section-subscribe__form-block form-block">
                <FormSubscribe
                  agreementT={data["agreement-text"]}
                  submitT={data["submit-text"]}
                  emailT={data["email-placeholder"]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee
        tickerClass="subscribe-block"
        tickerText={data.ticker.text}
        tickerColor={data.ticker.color}
      />
    </section>
  );
};
