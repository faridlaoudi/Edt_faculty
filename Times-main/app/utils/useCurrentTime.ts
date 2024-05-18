// hooks/useCurrentTime.ts
"use client"
import { useEffect, useState } from 'react';

const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const dateString = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "2-digit",
      });

      const timeString = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      // Combine the date and time strings with a dash in between
      const formattedString = `${dateString} - ${timeString.toLowerCase()}`;
      setCurrentTime(formattedString);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return currentTime;
};

export default useCurrentTime;
