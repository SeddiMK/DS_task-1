// Меняем стили в зависимости от выбранного стиля карточек

export type CardStyle = "brazil" | "dylan" | "personas" | "icons" | "pixel-art";

// Функция для динамического применения стилей
export const styleGameForCards = (styleImg: CardStyle) => {
  switch (styleImg) {
    case "brazil":
      return "brazil";
    // {
    // card: {
    //   width: "200px",
    //   height: "200px",
    //   borderRadius: "8px",
    //   backgroundColor: "#fff",
    //   boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    //   margin: "10px",
    //   transition: "transform 0.3s ease",
    // },
    // };
    case "dylan":
      return {
        // card: {
        //   width: "220px",
        //   height: "220px",
        //   borderRadius: "16px",
        //   backgroundColor: "#f0f0f0",
        //   boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
        //   margin: "15px",
        //   transition: "transform 0.3s ease",
        // },
      };
    case "personas":
      return {
        // card: {
        //   width: "200px",
        //   height: "200px",
        //   borderRadius: "50px",
        //   backgroundColor: "#ffcc00",
        //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        //   margin: "12px",
        //   transition: "transform 0.3s ease",
        // },
      };
    case "icons":
      return {
        // card: {
        //   width: "200px",
        //   height: "200px",
        //   borderRadius: "50px",
        //   backgroundColor: "#ffcc00",
        //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        //   margin: "12px",
        //   transition: "transform 0.3s ease",
        // },
      };
    case "pixel-art":
      return {
        // card: {
        //   width: "200px",
        //   height: "200px",
        //   borderRadius: "50px",
        //   backgroundColor: "#ffcc00",
        //   boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        //   margin: "12px",
        //   transition: "transform 0.3s ease",
        // },
      };
    default:
      return {};
  }
};
