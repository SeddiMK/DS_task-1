import { useDB } from "@/hooks/getDB";
import { useEffect, useState } from "react";
import { formatPhoneNumber } from "../../formatPhoneNumber";
import IconInstagram from "@public/assets/images/icons/footer/instagram.svg";
import IconFacebook from "@public/assets/images/icons/footer/facebook.svg";
import IconYoutube from "@public/assets/images/icons/footer/youtube.svg";
import IconLinkedin from "@public/assets/images/icons/footer/linkedin.svg";
import { Loading } from "@/containers/loading";

export const Contacts: React.FC = () => {
  const { fetchData } = useDB("contacts");
  const [formatPhoneNum, setFormatPhoneNum] = useState(null);

  useEffect(() => {
    if (fetchData !== null && fetchData.phone !== "") {
      setFormatPhoneNum(formatPhoneNumber(fetchData.phone));
    }
  }, [fetchData]);

  if (!fetchData) {
    return <Loading />;
  }

  return (
    <>
      {/* Footer Contacts */}
      <div className="footer__up-contacts contacts">
        {/* WhatsApp */}
        {fetchData.whatsapp && (
          <div className="contacts__wsp contacts-item">
            <p className="contacts-item__title">WhatsApp</p>
            <a
              className="list__link link link_metis link_metis_color_white"
              href={`https://wa.me/${fetchData.whatsapp}?text=Hola! Quiero inscribirme`}
            >
              {formatPhoneNum}
            </a>
          </div>
        )}

        {/* Phone */}
        {fetchData.phone && (
          <div className="contacts__tel contacts-item">
            <p className="contacts-item__title">Telefone</p>
            <a
              className="list__link link link_metis link_metis_color_white"
              href={`tel:+${fetchData.phone}`}
            >
              {formatPhoneNum}
            </a>
          </div>
        )}

        {/* Email */}
        {fetchData.email && (
          <div className="contacts__email contacts-item">
            <p className="contacts-item__title">Email</p>
            <a
              className="list__link link link_metis link_metis_color_white"
              href={`mailto:${fetchData.email}`}
            >
              {fetchData.email}
            </a>
          </div>
        )}
      </div>

      {/* Footer Social Media Links */}
      <div className="footer__up-sosial sosial">
        <ul className="sosial__list list-sosial">
          <li className="list-sosial__item">
            <a
              href={fetchData.instagram}
              className="list-sosial__link instagram-icon"
            >
              <IconInstagram />
            </a>
          </li>
          <li className="list-sosial__item">
            <a
              href={fetchData.facebook}
              className="list-sosial__link facebook-icon"
            >
              <IconFacebook />
            </a>
          </li>
          <li className="list-sosial__item">
            <a
              href={fetchData.youtube}
              className="list-sosial__link youtube-icon"
            >
              <IconYoutube />
            </a>
          </li>
          <li className="list-sosial__item">
            <a
              href={fetchData.linkedin}
              className="list-sosial__link linkedin-icon"
            >
              <IconLinkedin />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};
