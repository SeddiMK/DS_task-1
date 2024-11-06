import { useState, useEffect } from "react";

export const IconComponent = ({ iconUrl = "", className = "" }) => {
  const [svgContent, setSvgContent] = useState(null);

  useEffect(() => {
    fetch(iconUrl)
      .then((response) => response.text())
      .then((svg) => setSvgContent(svg))
      .catch((error) => console.error("Ошибка при загрузке SVG:", error));
  }, [iconUrl]);

  return (
    <div
      className={`icon-cmpt ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
