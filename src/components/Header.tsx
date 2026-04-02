"use client";

import { Link } from "@/i18n/routing";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "./LanguageSelector";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalQuantity } = useCart();
  const t = useTranslations("navigation");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuItems = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("product") },
    { href: "/q&a", label: t("qa") },
  ];

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.5s, border-color 0.5s, backdrop-filter 0.5s",
          background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(201,169,110,0.12)"
            : "1px solid transparent",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          {/* PC Nav — Left */}
          <nav
            style={{ display: "flex", gap: "2.5rem" }}
            className="hidden lg:flex"
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 400,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--fuji-gray-lt)",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: "2px",
                  transition: "color 0.3s",
                }}
                className="header-nav-link"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--fuji-white)",
              padding: "8px",
            }}
          >
            <Menu size={20} />
          </button>

          {/* Center Logo */}
          <Link
            href="/"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              textDecoration: "none",
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                fontWeight: 200,
                letterSpacing: "0.3em",
                color: "var(--fuji-white)",
              }}
            >
              天地星空
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.55rem",
                fontWeight: 300,
                letterSpacing: "0.35em",
                color: "var(--fuji-gold)",
                textTransform: "uppercase",
                marginTop: "3px",
              }}
            >
              Amachi Hoshisora
            </div>
          </Link>

          {/* Right — Language + Cart */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="hidden lg:block">
              <LanguageSelector variant="desktop" />
            </span>
            <Link
              href="/cart"
              style={{
                position: "relative",
                color: "var(--fuji-gray-lt)",
                padding: "6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ShoppingCart size={18} />
              {getTotalQuantity() > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-4px",
                    background: "var(--fuji-gold)",
                    color: "#000",
                    fontSize: "0.6rem",
                    fontWeight: 600,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getTotalQuantity()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
          }}
        >
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.75)",
            }}
          />

          {/* Drawer */}
          <div
            style={{
              position: "relative",
              width: "300px",
              background: "var(--fuji-dark)",
              borderRight: "1px solid var(--fuji-gold-border)",
              display: "flex",
              flexDirection: "column",
              padding: "2rem",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--fuji-gray)",
                alignSelf: "flex-end",
                marginBottom: "2rem",
              }}
            >
              <X size={20} />
            </button>

            {/* Brand */}
            <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.8rem",
                  fontWeight: 200,
                  letterSpacing: "0.25em",
                  color: "var(--fuji-white)",
                }}
              >
                天地星空
              </div>
              <div
                style={{
                  fontFamily: "Inter",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  color: "var(--fuji-gold)",
                  marginTop: "4px",
                }}
              >
                AMACHI HOSHISORA
              </div>
            </div>

            {/* Gold rule */}
            <div
              style={{
                height: "1px",
                background: "var(--fuji-gold-border)",
                marginBottom: "2rem",
              }}
            />

            {/* Nav */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--fuji-gray-lt)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Language selector mobile */}
            <div style={{ marginTop: "2.5rem" }}>
              <LanguageSelector variant="mobile" onLanguageChange={() => setIsOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .header-nav-link:hover {
          color: var(--fuji-gold) !important;
        }
        .header-nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--fuji-gold);
          transition: width 0.3s ease;
        }
        .header-nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  );
};
