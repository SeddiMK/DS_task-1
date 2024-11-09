import { useDB } from "@/hooks/getDB";
import { HeaderType } from "@/types/db";
import Arrow from "@public/assets/images/icons/header/arrow.svg";
import IconSearch from "@public/assets/images/icons/header/search.svg";
import { ImageComponent } from "@/containers/imageComponent";
import { Loading } from "../loading";
import "./style.css";

export const Header: React.FC = () => {
  const { fetchData } = useDB("menu");

  if (!fetchData) {
    return <Loading />;
  }

  return (
    <>
      <div className="header__logo logo">
        <a href="#" className="logo__link logo_color_active logo_color_hover">
          <ImageComponent iconUrl={fetchData?.logo} className="icon-logo" />
        </a>
      </div>
      <nav className="header__nav">
        {fetchData.header.map((item: HeaderType, ind: number) => (
          <a
            key={ind}
            href={item.url}
            data-color-btn={ind}
            className={`header__button btn`}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <div className="header__right-search-block">
        <div className="header__search-icon">
          <form className="header__search-form">
            <button className="header__search-btn">
              <span className="icon icon-search">
                {/* <IconSearch /> */}
                svg
              </span>
            </button>
          </form>
        </div>
        <div className="header__transition transition-header">
          <a
            href="/"
            className="transition-header__name link link_metis link_metis_color_grass"
          >
            <span className="transition-header__text">EBAC</span>
            <span className="transition-header__icon icon icon-arrow">
              svg
              {/* <Arrow /> */}
            </span>
          </a>
        </div>
      </div>
    </>
  );
};
