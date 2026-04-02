"use client";
import Image from "next/image";
import React from "react";
import { Link } from "@/i18n/routing";

interface HeroData {
  title: string[];
  subtitle: string;
  productName: string;
  heroImage: string;
  productGif?: string;
}

interface HeroProps {
  heroData: HeroData;
}

export const Hero: React.FC<HeroProps> = ({ heroData }) => {
  return (
    <section style={{ position: "relative", minHeight: "100svh", width: "100%", overflow: "hidden", background: "var(--fuji-black)" }}>

      {/* Background Image — Ken Burns */}
      {heroData.heroImage && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <Image
            src={heroData.heroImage}
            alt="Mt. Fuji"
            fill
            className="object-cover object-center hero-kenburns"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Multi-layer overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.3) 40%, rgba(5,5,5,0.75) 80%, rgba(5,5,5,1) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,5,0.2) 0%, transparent 50%, rgba(5,5,5,0.2) 100%)" }} />

      {/* Center Content */}
      <div style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "6rem 2rem 4rem",
      }}>

        {/* Eyebrow label */}
        <div
          className="animate-fuji-in"
          style={{ opacity: 0, animationDelay: "0.2s", marginBottom: "1.5rem" }}
        >
          <span style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.62rem",
            fontWeight: 400,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "var(--fuji-gold)",
          }}>
            Fujinishiki Brewery · Est. 1688
          </span>
        </div>

        {/* Gold rule */}
        <div
          className="animate-fuji-line"
          style={{ height: "1px", background: "var(--fuji-gold)", marginBottom: "2rem", animationDelay: "0.4s" }}
        />

        {/* Main Heading */}
        <h1
          className="animate-fuji-up"
          style={{
            opacity: 0,
            animationDelay: "0.5s",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(2rem, 5vw, 4.2rem)",
            letterSpacing: "0.03em",
            color: "var(--fuji-white)",
            lineHeight: 1.25,
            marginBottom: "2rem",
            maxWidth: "820px",
            textShadow: "0 2px 40px rgba(0,0,0,0.6)",
          }}
        >
          {heroData.title.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < heroData.title.length - 1 && <br />}
            </React.Fragment>
          ))}
        </h1>

        {/* Gold rule */}
        <div
          className="animate-fuji-line"
          style={{ height: "1px", background: "var(--fuji-gold)", marginBottom: "2rem", animationDelay: "0.9s" }}
        />

        {/* Sub info */}
        <div
          className="animate-fuji-in"
          style={{ opacity: 0, animationDelay: "1s", marginBottom: "0.75rem" }}
        >
          <p style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.7rem",
            fontWeight: 300,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--fuji-gold)",
          }}>
            {heroData.subtitle}
          </p>
        </div>
        <div
          className="animate-fuji-in"
          style={{ opacity: 0, animationDelay: "1.1s", marginBottom: "3rem" }}
        >
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(0.95rem, 2vw, 1.25rem)",
            letterSpacing: "0.08em",
            color: "var(--fuji-gray-lt)",
          }}>
            {heroData.productName}
          </p>
        </div>

        {/* CTA */}
        <div
          className="animate-fuji-in"
          style={{ opacity: 0, animationDelay: "1.3s" }}
        >
          <Link href="/products" className="fuji-btn-primary" style={{ display: "inline-block", textDecoration: "none" }}>
            Explore Collection
          </Link>
        </div>

        {/* Product Bottle (small, decorative) */}
        {heroData.productGif && (
          <div
            className="animate-fuji-in"
            style={{
              opacity: 0,
              animationDelay: "0.8s",
              position: "absolute",
              right: "5%",
              bottom: "12%",
              width: "clamp(80px, 12vw, 160px)",
            }}
          >
            <Image
              src={heroData.productGif}
              alt={heroData.productName}
              width={160}
              height={320}
              style={{ objectFit: "contain", filter: "drop-shadow(0 8px 32px rgba(201,169,110,0.25))" }}
              unoptimized={heroData.productGif.toLowerCase().includes(".gif")}
            />
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: "2.5rem",
        left: "50%",
        animation: "fuji-scroll-bounce 2s ease-in-out infinite",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "6px",
      }}>
        <span style={{
          fontFamily: "Inter",
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
          color: "var(--fuji-gold-dim)",
          textTransform: "uppercase",
        }}>Scroll</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--fuji-gold-dim), transparent)" }} />
      </div>

    </section>
  );
};
