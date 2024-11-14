import { useState, useEffect } from "react";
import { Header } from "@/containers/blocks/headerBlock";

export const SmartHeader = () => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  const showHeaderScrollTop = () => {
    const currentScroll = window.scrollY;
    if (currentScroll <= 0) {
      setIsHeaderScrolled(false);
    } else if (currentScroll > lastScrollTop) {
      setIsHeaderScrolled(true);
    } else if (currentScroll < lastScrollTop) {
      setIsHeaderScrolled(false);
    }
    setLastScrollTop(currentScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", showHeaderScrollTop);
    return () => {
      window.removeEventListener("scroll", showHeaderScrollTop);
    };
  }, [lastScrollTop]);

  return (
    <header className="header">
      <div
        id="header-cnt"
        className={`container header-cnt ${isHeaderScrolled ? "header_header-scroll" : ""}`}
      >
        <Header />
      </div>
    </header>
  );
};
