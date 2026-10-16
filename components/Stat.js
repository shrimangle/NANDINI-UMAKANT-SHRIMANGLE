"use client";
import { useEffect, useState } from "react";
import { useInView } from "./hooks";

export default function Stat({ value, label }) {
  const [ref, shown] = useInView();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!shown) return undefined;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= value) clearInterval(timer);
    }, 120);
    return () => clearInterval(timer);
  }, [shown, value]);

  return (
    <div ref={ref} className="stat">
      <h3>{n}</h3>
      <p>{label}</p>
    </div>
  );
}
