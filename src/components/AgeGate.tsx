"use client";

import { useState, useEffect } from "react";

export function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("ageVerified") === "true";
    if (!verified) setVisible(true);
  }, []);

  if (!visible) return null;

  const handleEnter = () => {
    localStorage.setItem("ageVerified", "true");
    setVisible(false);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "var(--fuji-black)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99999,
      flexDirection: "column",
      textAlign: "center",
      padding: "2rem",
    }}>

      {/* Mt. Fuji SVG silhouette */}
      <svg
        width="180"
        height="60"
        viewBox="0 0 180 60"
        fill="none"
        style={{ marginBottom: "2.5rem", opacity: 0.35 }}
      >
        <path
          d="M0 60 L60 20 L75 35 L90 5 L105 35 L120 20 L180 60 Z"
          fill="var(--fuji-gold)"
        />
      </svg>

      {/* Brand */}
      <div style={{
        fontFamily: "var(--font-cormorant)",
        fontWeight: 200,
        fontSize: "clamp(2rem, 6vw, 3.5rem)",
        letterSpacing: "0.3em",
        color: "var(--fuji-white)",
        marginBottom: "0.5rem",
      }}>
        天地星空
      </div>
      <div style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "0.6rem",
        fontWeight: 300,
        letterSpacing: "0.45em",
        color: "var(--fuji-gold)",
        textTransform: "uppercase",
        marginBottom: "3rem",
      }}>
        Amachi Hoshisora
      </div>

      {/* Gold rule */}
      <div style={{ width: "60px", height: "1px", background: "var(--fuji-gold-dim)", marginBottom: "2.5rem" }} />

      {/* Message */}
      <p style={{
        fontFamily: "var(--font-cormorant)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
        letterSpacing: "0.1em",
        color: "var(--fuji-gray-lt)",
        marginBottom: "0.75rem",
        maxWidth: "400px",
      }}>
        ENTER THE WORLD OF MT. FUJI SAKE
      </p>
      <p style={{
        fontFamily: "Inter",
        fontSize: "0.7rem",
        fontWeight: 300,
        letterSpacing: "0.1em",
        color: "var(--fuji-gray)",
        marginBottom: "3rem",
      }}>
        You must be of legal drinking age to enter.
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        <button
          onClick={handleEnter}
          className="fuji-btn-primary"
          style={{ minWidth: "200px" }}
        >
          ENTER
        </button>
        <button
          onClick={handleExit}
          style={{
            fontFamily: "Inter",
            fontSize: "0.6rem",
            fontWeight: 300,
            letterSpacing: "0.2em",
            color: "rgba(136,136,128,0.4)",
            background: "none",
            border: "none",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "color 0.3s",
          }}
        >
          EXIT
        </button>
      </div>
    </div>
  );
}
