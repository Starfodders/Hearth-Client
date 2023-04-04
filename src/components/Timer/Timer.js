import "./Timer.scss";
import { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Timer = ({ timer, animate, pause }) => {
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <>
        <p className="timer__value">
          {`${minutes}:${seconds.toString().padStart(2, "0")}`}
        </p>
      </>
    );
  };

  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    if (animate) {
      setPlayState(true);
    } else if (pause) {
      setPlayState(false);
    }
  }, [pause, animate]);

  return (
    <div className="circle__element">
      <CountdownCircleTimer
        isPlaying={playState}
        duration={timer * 60}
        colors={["#52b69a"]}
        strokeWidth={18}
        trailStrokeWidth={18}
        strokeLinecap={"square"}
        trailColor={"#061825"}
        onComplete={() => {
          console.log("done");
        }}
      >
        {children}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
