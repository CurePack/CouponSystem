import { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {
  let timerID: any = null;
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="Clock">
      <span>
        {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
      </span>
    </div>
  );
}

export default Clock;
