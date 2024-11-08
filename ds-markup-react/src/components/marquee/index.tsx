export const Marquee = ({
  tickerClass = "",
  tickerText = "",
  tickerColor = "",
}) => {
  return (
    <div
      className={`marquee-wrp marquee-${tickerClass}`}
      style={{ backgroundColor: tickerColor && "#da3369" }}
    >
      <div className="marquee-items marquee">
        <div className="marquee-item">
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
      </div>
    </div>
  );
};
