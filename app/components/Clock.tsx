"use client";

import { useEffect, useState } from "react";

/** Live local time in Bangalore. Renders a placeholder until mounted. */
export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 15_000);
    return () => clearInterval(t);
  }, []);

  return <span className="tabular-nums">{time ?? "--:--"} IST</span>;
}
