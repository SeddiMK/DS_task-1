import "./style.css";
import { useDB } from "@/hooks/getDB";
import { HeaderType } from "@/types/db";
import IconSpinnerLoading from "@public/assets/images/icons/general/spinner-one-third-svgrepo-com.svg";
import Arrow from "@public/assets/images/icons/header/arrow.svg";
import IconSearch from "@public/assets/images/icons/header/search.svg";
import { IconComponent } from "@/containers/IconComponent";

export const Header: React.FC = () => {
  const { fetchData } = useDB("menu");

  if (!fetchData) {
    return (
      <div className="loading">
        <IconSpinnerLoading />
      </div>
    );
  }

  return (
    <>
      <div className="header__logo logo">
        <a href="#" className="logo__link logo_color_active logo_color_hover">
          <IconComponent iconUrl={fetchData?.logo} className="icon-logo" />
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
                <IconSearch />
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
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </>
  );
};
