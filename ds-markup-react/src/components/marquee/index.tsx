import { MarqueeProps } from "@/types/general";
import "./style.css";

export const Marquee: React.FC<MarqueeProps> = ({
  tickerClass,
  tickerText,
  tickerColor,
}) => {
  console.log(tickerClass, tickerText, Boolean(tickerColor), tickerColor);

  return (
    <div
      className={`marquee-wrp marquee-${tickerClass}`}
      style={{ backgroundColor: tickerColor ? tickerColor : "#da3369" }}
    >
      <div className="marquee-items marquee">
        {Array(30)
          .fill("")
          .map((el: any, ind: number) => (
            <div key={el + ind} className="marquee-item">
              <span>{tickerText}</span>
              <svg
                width="40"
                height="58"
                viewBox="0 0 45 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.3204 10.6625L27.0718 25.6025L42.6668 29.2186L27.7268 34.97L24.1107 50.5651L18.3593 35.625L2.76427 32.0089L17.7043 26.2575L21.3204 10.6625Z"
                  fill="#1B1F21"
                />
              </svg>
            </div>
          ))}
      </div>
    </div>
  );
};
