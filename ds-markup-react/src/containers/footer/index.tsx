import React, { useEffect, useState } from "react";
import { useDB } from "@/hooks/getDB";
import { Menu } from "@/types/db";
import { Contacts } from "@/containers/contacts";
import { IconComponent } from "../IconComponent";

// interface FooterMenuItem {
// 	label: string
// 	url?: string
// }

// interface FooterSection {
// 	label: string
// 	items: FooterMenuItem[]
// }

// interface FooterData {
// 	logo: string
// 	footer: FooterSection[]
// }

export const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<Menu | null>(null);
  const { fetchData, loading, error } = useDB("menu");
  useEffect(() => {
    console.log(fetchData);

    setFooterData(fetchData);
  }, [fetchData]);

  if (!footerData) {
    return <footer>Loading...</footer>;
  }

  return (
    <footer className="footer">
      <div className="container footer-cnt">
        <section className="footer__up">
          <div className="footer__up-left left-footer">
            <div className="left-footer__logo logo logo-left-footer">
              <a href="/" className="logo__link logo_color_white">
                <IconComponent
                  iconUrl={fetchData?.logo}
                  className="icon-logo"
                />
              </a>
            </div>
            <div className="left-footer__awards img-wrp">
              <img
                className="left-footer__awards-img img"
                src="./images/footer/awards.jpg"
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
              placeholder="Su correo electrónico"
            />
            <button
              className="subscribe__subscribe-to-newsletter btn btn_footer footer_bgc_active footer_bgc_hover footer_bgc_disabled footer_bgc_focus"
              type="submit"
            >
              Suscribirse al boletín
            </button>
          </form>

          {/* Footer Menu */}
          <div className="footer__up-menu menu-footer">
            {footerData.footer.map((section) => (
              <div key={section.label} className="menu-footer__section">
                <h3 className="menu-footer__title">{section.label}</h3>
                <ul className="menu-footer__list list">
                  {section.items.map((item) => (
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
              <div className="tab tab-cursor">
                <input className="tab__inp" type="checkbox" id="chck1" />
                <label className="tab__label" htmlFor="chck1">
                  CURSOS
                </label>
                <div className="tab__content">
                  <ul className="menu-footer__list list">
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Diseño
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Programación & Data
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Gaming
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Marketing
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Software
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab tab-webinars">
                <input className="tab__inp" type="checkbox" id="chck2" />
                <label className="tab__label" htmlFor="chck2">
                  WEBINARS
                </label>
                <div className="tab__content">
                  <ul className="menu-footer__list list">
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Próximamente
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Anteriores
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab tab-about">
                <input className="tab__inp" type="checkbox" id="chck3" />
                <label className="tab__label" htmlFor="chck3">
                  SOBRE
                </label>
                <div className="tab__content">
                  <ul className="menu-footer__list list">
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Sobre nostros
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Centro de carreras
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Vacantes
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab tab-blog">
                <input className="tab__inp" type="checkbox" id="chck4" />
                <label className="tab__label" htmlFor="chck4">
                  BLOG
                </label>
                <div className="tab__content">
                  <ul className="menu-footer__list list">
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Diseño
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Programación & Data
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Gaming
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Marketing
                      </a>
                    </li>
                    <li className="list__item">
                      <a
                        href="#"
                        className="list__link link link_metis link_metis_color_white"
                      >
                        Software
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Contacts />
        </section>

        <Contacts />
        {/* Privacy and Terms */}
        <section className="footer__privacy privicy">
          <p className="privicy__text">AVISO DE PRIVACIDAD ALUMNOS</p>
          <span className="privicy__separator">•</span>
          <p className="privicy__text">AVISO DE PRIVACIDAD PROFESORES</p>
          <span className="privicy__separator">•</span>
          <p className="privicy__text">TÉRMINOS Y CONDICIONES</p>
        </section>
      </div>
    </footer>
  );
};
