import React, { useMemo, useState, useEffect } from "react";
import { differenceInMinutes, differenceInSeconds, differenceInHours, parseISO } from "date-fns";

const TimeAgoCounter = ({ createdAt }: { createdAt: string }) => {
  const createdAtDate = useMemo(() => parseISO(createdAt), [createdAt]);
  const [now, setNow] = useState(new Date());

  const secondsAgo = differenceInSeconds(now, createdAtDate);
  const minutesAgo = differenceInMinutes(now, createdAtDate);
  const hoursAgo = differenceInHours(now, createdAtDate);

  useEffect(() => {
    const isLessThanMinute = secondsAgo < 60;
    const intervalDelay = isLessThanMinute ? 1_000 : 60_000;

    const intervalId = setInterval(() => {
      setNow(new Date());
    }, intervalDelay);

    return () => clearInterval(intervalId);
  }, [secondsAgo < 60]);

  if (hoursAgo > 0) {
    return <p className="text-muted-foreground text-xs">{hoursAgo}h ago</p>;
  }

  if (secondsAgo < 60) {
    const displaySeconds = Math.max(0, secondsAgo);
    return (
      <p className="text-muted-foreground text-xs">{displaySeconds}s ago</p>
    );
  }

  return <p className="text-muted-foreground text-xs">{minutesAgo}m ago</p>;
};

export { TimeAgoCounter };
