import React, { FC, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import stopwatch from "assets/svgs/stopwatch.svg";
import moment from "moment";

export interface TimerProps {
  /** Time to sec, in seconds, to start the timer with */
  startingTime: number;
  /** callback when time expires */
  onExpired: () => void;
}

/**
 * Given an end time, returns the remaining time in seconds
 * @param endTime Moment object of the end time
 * @returns number of seconds remaining
 */
const calculateTimeRemaining = (endTime: moment.Moment) => {
  const duration = moment.duration(endTime.diff(moment()));
  return duration.asSeconds();
};

export const Timer: FC<TimerProps> = ({ startingTime, onExpired }) => {
  const { t } = useTranslation();

  // create a state to store the end time
  const endTime = useMemo(() => moment().add(startingTime, "seconds"), [startingTime]);

  // Calculate the time remaining
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(endTime));

  React.useEffect(() => {
    let handle: ReturnType<typeof setInterval>;

    if (timeRemaining > 0) {
      handle = setTimeout(() => setTimeRemaining(calculateTimeRemaining(endTime)), 1000);
    } else {
      onExpired();
    }

    return () => {
      clearTimeout(handle);
    };
  });

  return (
    <div className="flex items-center text-white text-sm" data-chromatic="ignore">
      <img alt="Stopwatch Icon" className="block mr-1" src={stopwatch} style={{ width: 14 }} />
      {timeRemaining > 0 ? (
        <div>
          <span>{t("ticketing.component.timer.time-remaining")}:</span>
          <span className="ml-1">
            <span className="tabular-nums">{moment(timeRemaining * 1000).format("m:ss")}</span>
          </span>
        </div>
      ) : (
        <div>
          <span className="text-red">{t("ticketing.component.timer.expired")}</span>
        </div>
      )}
    </div>
  );
};

export default Timer;
Timer.displayName = "Timer";
