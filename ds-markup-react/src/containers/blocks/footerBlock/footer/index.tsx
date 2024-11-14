import { useState, useEffect } from "react";
import { useDB } from "@/hooks/getDB";
import { FooterType, Item, Menu } from "@/types/db";
import { Privicy } from "@/containers/blocks/footerBlock/privicy";
import { Contacts } from "@/containers/blocks/footerBlock/contacts";
import { Loading } from "@/components/loading";
import { ImageComponent } from "@/containers/utils/imageComponent";
import { Awards } from "@/config/paths";
import "./style.css";

export const Footer: React.FC = () => {
  const { fetchData } = useDB("menu");
  const fetchDataContacts = useDB("contacts");
  const [data, setData] = useState<Menu | null>(null);
  const [btnEmailPlhr, setBtnEmailPlhr] = useState("Your email address");
  const [btnSubmitPlhr, setBtnSubmitPlhr] = useState(
    "Subscribe to the newsletter",
  );

  useEffect(() => {
    if (fetchData) {
      setData(fetchData);
    }

    if (fetchDataContacts) {
      setBtnEmailPlhr(
        fetchDataContacts?.fetchData?.subscription["email-placeholder"],
      );
      setBtnSubmitPlhr(
        fetchDataContacts?.fetchData?.subscription["submit-text"],
      );
    }
  }, [fetchData, fetchDataContacts]);

  if (!data) return <Loading />;

  return (
    <footer className="footer">
      <div className="container footer-cnt">
        <section className="footer__up">
          <div className="footer__up-left left-footer">
            <div className="left-footer__logo logo logo-left-footer">
              <a
                href="/"
                className="logo__link logo_color_white logo_color_active logo_color_hover"
              >
                <ImageComponent
                  iconUrl={fetchData?.logo}
                  className="icon-logo"
                />
              </a>
            </div>
            <div className="left-footer__awards img-wrp">
              <img
                className="left-footer__awards-img img"
                src={Awards}
                alt="company awards image"
              />
            </div>
          </div>
          <form
            id="formFooter"
            className="footer__up-subscribe subscribe"
            action=""
            method="post"
          >
            <input
              id="inpEmailFooter"
              className="subscribe__email input input_footer"
              type="email"
              name="email"
              placeholder={btnEmailPlhr || "Su correo electrónico"}
            />
            <button
              className="subscribe__subscribe-to-newsletter btn btn-footer footer_bgc_active footer_bgc_hover footer_bgc_disabled footer_bgc_focus"
              type="submit"
            >
              {btnSubmitPlhr || "Suscribirse al boletín"}
            </button>
          </form>

          {/* Footer Menu */}
          <div className="footer__up-menu menu-footer">
            {fetchData.footer.map((section: FooterType) => (
              <div key={section.label} className="menu-footer__section">
                <h3 className="menu-footer__title">{section.label}</h3>
                <ul className="menu-footer__list list">
                  {section.items.map((item: Item) => (
                    <li key={item.label} className="list__item">
                      <a
                        href={item.url || "#"}
                        className="list__link link link_metis link_metis_color_white"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="footer__up-menu menu-footer-tabs">
            <div className="tabs">
              {fetchData.footer.map((section: FooterType, ind: number) => (
                <div data-tab-cursor={ind} className="tab" key={ind}>
                  <input
                    className="tab__inp"
                    type="checkbox"
                    id={"chck" + ind}
                  />
                  <label className="tab__label" htmlFor={"chck" + ind}>
                    {section.label}
                  </label>
                  <div className="tab__content">
                    <ul className="menu-footer__list list">
                      {section.items.map((item: Item) => (
                        <li key={item.label} className="list__item">
                          <a
                            href={item.url || "#"}
                            className="list__link link link_metis link_metis_color_white"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Contacts />
        </section>

        <Privicy />
      </div>
    </footer>
  );
};
