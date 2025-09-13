import { useEffect, useState } from "react";

export function useNow(interval, enabled) {
  const [now, setNow] = useState();

  useEffect(() => {
    if (!enabled) {
      setNow(undefined);
      return;
    }

    const timer = setInterval(() => {
      setNow(Date.now());
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval, enabled]);

  return now;
}

export function useInterval(interval, enabled, cb) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const timer = setInterval(() => {
      cb();
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval, enabled]);
}
