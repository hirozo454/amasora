"use client";

import { useState, useEffect } from "react";

const GEO_MESSAGES: Record<string, string> = {
  US: "21+ only. State restrictions apply.",
  CN: "Import duties & regulations apply.",
  AU: "Must be 18+ to purchase alcohol in Australia.",
  JP: "20歳未満の方への酒類の販売はできません。",
};
const DEFAULT_MSG = "Check your local alcohol laws before purchasing.";

export function GeoNotice() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const country: string = data.country_code ?? "OTHER";
        setMessage(GEO_MESSAGES[country] ?? DEFAULT_MSG);
      } catch {
        setMessage(DEFAULT_MSG);
      }
    })();
  }, []);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#111",
        color: "#ccc",
        fontSize: "11px",
        textAlign: "center",
        padding: "6px 16px",
        opacity: 0.88,
        zIndex: 9998,
        letterSpacing: "0.03em",
      }}
    >
      {message}
    </div>
  );
}
