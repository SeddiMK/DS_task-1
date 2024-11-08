import React, { useEffect, useState } from "react";
import { useDB } from "@/hooks/getDB";
import { Loading } from "../loading";
import { Subscription } from "@/types/db";
import { Form } from "../form";
import "./style.css";

export const SubscribeBlock: React.FC = () => {
  const { fetchData } = useDB("sections");
  const [data, setData] = useState<Subscription | null>(null);

  // Fetch the webinars data from the API using the custom hook
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
                <Form
                  agreementT={data["agreement-text"]}
                  submitT={data["submit-text"]}
                  emailT={data["email-placeholder"]}
                />

                <div className="form-block__subscr-successful subscr-successful">
                  <div className="subscr-successful__block">
                    <p className="subscr-successful__text">
                      Fantástico! Espera la primera carta
                    </p>
                  </div>
                  <div className="subscr-successful__img-wrp img-wrp subscr-successful-img-wrp">
                    <img
                      className="subscr-successful__img img img-subscr-successful"
                      src="./images/subscribe-block/subscr-success/sticker/sticker-success.png"
                      alt="etiqueta y sobre de suscripción exitosa"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
