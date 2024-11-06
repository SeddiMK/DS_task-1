import React, { useEffect, useState } from "react";
import { useDB } from "@/hooks/getDB";
import { ContactsType } from "@/types/db";

export const Contacts: React.FC = () => {
  const [footerDataContacts, setFooterDataContacts] =
    useState<ContactsType | null>(null);
  const { fetchData, loading, error } = useDB("contacts");

  useEffect(() => {
    console.log(fetchData);

    setFooterDataContacts(fetchData);
  }, [fetchData]);

  if (!footerDataContacts) {
    return <footer>Loading...</footer>;
  }

  return (
    <>
      {/* Footer Contacts */}
      <div className="footer__up-contacts contacts">
        <div className="contacts__wsp contacts-item">
          <p className="contacts-item__title">WhatsApp</p>
          <a
            className="list__link link link_metis link_metis_color_white"
            href="https://wa.me/525592252629?text=Hola! Quiero inscribirme"
          >
            +52 55 9225-2629
          </a>
        </div>
        <div className="contacts__tel contacts-item">
          <p className="contacts-item__title">Telefone</p>
          <a
            className="list__link link link_metis link_metis_color_white"
            href="tel:+525592252629"
          >
            +52 55 9225-2629
          </a>
        </div>
        <div className="contacts__email contacts-item">
          <p className="contacts-item__title">Email</p>
          <a
            className="list__link link link_metis link_metis_color_white"
            href="mailto:ebac.mx@gmail.com"
          >
            Ebac.mx@gmail.com
          </a>
        </div>
      </div>

      {/* Footer Sosial */}
      <div className="footer__up-sosial sosial">
        <ul className="sosial__list list-sosial">
          <li className="list-sosial__item">
            <a
              href="http://instagram.com"
              className="list-sosial__link instagram-icon"
            >
              svg
            </a>
          </li>
          <li className="list-sosial__item">
            <a
              href="https://facebook.com"
              className="list-sosial__link facebook-icon"
            >
              svg
            </a>
          </li>
          <li className="list-sosial__item">
            <a
              href="https://youtube.com/"
              className="list-sosial__link youtube-icon"
            >
              svg
            </a>
          </li>
          <li className="list-sosial__item">
            <a
              href="https://linkedin.com/"
              className="list-sosial__link linkedin-icon"
            >
              svg
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
