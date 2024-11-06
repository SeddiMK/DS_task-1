import "./style.module.css";
import { useEffect, useRef, useState } from "react";
import { useDB } from "@/hooks/getDB";
import { HeaderType, Menu } from "@/types/db";
import IconSpinnerLoading from "@/assets/images/icons/general/spinner-one-third-svgrepo-com.svg";
import { IconComponent } from "@/containers/IconComponent";

export const Header: React.FC = () => {
  // const [menuData, setMenuData] = useState<Menu | null>(null);

  const { fetchData } = useDB("menu");

  // const iconlogo = useRef(fetchData.logo);
  console.log(fetchData);
  // useEffect(() => {

  //   // setMenuData(fetchData);
  // }, [fetchData]);

  // const [svgContent, setSvgContent] = useState<any>(null);

  // useEffect(() => {
  //   fetch(fetchData.logo)
  //     .then((response) => response.text())
  //     .then((svg) => setSvgContent(svg))
  //     .catch((error) => console.error("Ошибка при загрузке SVG:", error));
  // }, [fetchData.logo]);

  if (!fetchData) {
    return (
      <div className="loading">
        Loading...
        {/* <IconSpinnerLoading /> */}
      </div>
    );
  }
  console.log(fetchData.logo);

  return (
    <header className="header">
      <div id="header-cnt" className="container header-cnt">
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
              className={`header__button btn ${item.label
                .toLowerCase()
                .replace(/\s+/g, "_")}_bgc_active ${item.label
                .toLowerCase()
                .replace(/\s+/g, "_")}_bgc_hover`}
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
                  <svg
                    width="22"
                    height="24"
                    viewBox="0 0 22 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.93983 2.02384C8.8763 2.03317 8.66836 2.0632 8.47776 2.09055C7.66372 2.20745 6.69465 2.51585 5.91661 2.90566C3.35426 4.1894 1.63691 6.49181 1.0997 9.36361C1.00392 9.87545 0.967181 11.2486 1.03404 11.8163C1.39908 14.9162 3.27922 17.5516 6.06521 18.8683C8.97393 20.2431 12.4682 19.9188 15.034 18.036L15.3754 17.7855L17.4832 19.8927L19.591 22L20.2955 21.2956L21 20.5912L18.8903 18.4814L16.7807 16.3717L16.9206 16.1942C17.2146 15.8213 17.5987 15.1836 17.8562 14.6408C18.6944 12.8736 18.9236 10.9714 18.5292 9.05466C17.8924 5.95955 15.6423 3.42969 12.6479 2.44216C11.6134 2.10095 10.8958 1.99076 9.77277 2.0006C9.3782 2.00406 9.00337 2.01455 8.93983 2.02384ZM11.0192 4.05545C11.615 4.15225 12.463 4.44027 13.041 4.74207C14.9305 5.72877 16.2416 7.51362 16.6394 9.64083C16.7555 10.2617 16.7552 11.4957 16.6388 12.0879C16.0836 14.9124 14.0145 17.0119 11.1877 17.6193C10.5644 17.7532 9.26966 17.7653 8.63948 17.6431C7.24623 17.373 5.98343 16.7182 5.01875 15.7656C2.32554 13.1061 2.25762 8.81445 4.86576 6.09747C5.81953 5.10393 6.93618 4.46093 8.26312 4.14116C9.14573 3.92849 10.0625 3.89998 11.0192 4.05545Z"
                      fill="#1B1F21"
                    />
                  </svg>
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
                <svg
                  width="18"
                  height="24"
                  viewBox="0 0 18 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.63369 19.3663L2.26738 20L8.72816 13.5391L15.1889 7.07824L15.1889 13.2263L15.1889 19.3744L16.0945 19.3744L17 19.3744L16.9916 12.0082L16.9831 4.64197L16.8973 4.47736C16.8006 4.29202 16.5663 4.09442 16.3753 4.0372C16.2847 4.01004 14.2779 4 8.93839 4L1.62556 4L1.62556 4.90535L1.62556 5.81069L7.77349 5.81069L13.9214 5.81069L7.46071 12.2716L1 18.7326L1.63369 19.3663Z"
                    fill="#BEDB39"
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
