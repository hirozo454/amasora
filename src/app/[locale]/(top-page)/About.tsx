"use client";
import React from "react";
import { useInView } from "@/hooks/useInView";

interface TopicData {
  id: number;
  title: string;
  description: string;
  image?: string;
  bgColor?: string;
  productColor?: string;
  hasRings?: boolean;
}

interface AboutProps {
  topicsData: TopicData[];
}

const AboutSection: React.FC<AboutProps> = ({ topicsData }) => {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);
  const { ref: gridRef,   inView: gridInView }   = useInView(0.1);

  return (
    <section id="about" style={{ background: "var(--fuji-dark)", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Section Header */}
        <div
          ref={headerRef}
          className={`reveal${headerInView ? " is-visible" : ""}`}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <p style={{
            fontFamily: "Inter",
            fontSize: "0.62rem",
            fontWeight: 400,
            letterSpacing: "0.45em",
            color: "var(--fuji-gold)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            Our Philosophy
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 200,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            letterSpacing: "0.25em",
            color: "var(--fuji-white)",
            marginBottom: "1.5rem",
          }}>
            ABOUT
          </h2>
          <div className="fuji-rule" />
        </div>

        {/* Topics Grid */}
        <div
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2px",
          }}
        >
          {topicsData.map((topic, index) => (
            <div
              key={topic.id}
              className={`reveal reveal-delay-${index + 1}${gridInView ? " is-visible" : ""}`}
              style={{
                position: "relative",
                overflow: "hidden",
                background: "var(--fuji-surface)",
                borderLeft: "1px solid var(--fuji-gold-border)",
                borderRight: index === topicsData.length - 1 ? "1px solid var(--fuji-gold-border)" : "none",
                transition: "border-color 0.4s",
              }}
              className="fuji-about-card"
            >
              {/* Image */}
              {topic.image && (
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${topic.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.6s ease",
                    }}
                    className="fuji-about-img"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(5,5,5,0.45)" }} />
                </div>
              )}

              {/* No-image placeholder */}
              {!topic.image && (
                <div style={{
                  aspectRatio: "4/3",
                  background: `linear-gradient(135deg, var(--fuji-surface) 0%, var(--fuji-surface2) 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}>
                  <div style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "6rem",
                    fontWeight: 200,
                    color: "rgba(201,169,110,0.08)",
                    letterSpacing: "0.1em",
                    userSelect: "none",
                  }}>
                    天地
                  </div>
                </div>
              )}

              {/* Content */}
              <div style={{ padding: "2rem 1.75rem 2.5rem" }}>
                {/* Number */}
                <div style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  color: "var(--fuji-gold)",
                  letterSpacing: "0.15em",
                  marginBottom: "1rem",
                }}>
                  0{index + 1}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontWeight: 300,
                  fontSize: "1.25rem",
                  letterSpacing: "0.08em",
                  color: "var(--fuji-white)",
                  marginBottom: "1rem",
                  lineHeight: 1.4,
                }}>
                  {topic.title}
                </h3>

                {/* Thin rule */}
                <div style={{
                  width: "30px",
                  height: "1px",
                  background: "var(--fuji-gold-dim)",
                  marginBottom: "1rem",
                }} />

                {/* Description */}
                <p style={{
                  fontFamily: "Inter",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                  color: "var(--fuji-gray)",
                  lineHeight: 1.85,
                }}>
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .fuji-about-card:hover {
          border-color: var(--fuji-gold-dim) !important;
        }
        .fuji-about-card:hover .fuji-about-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
};

export const About = AboutSection;
