"use client";
import { Instagram } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import React from "react";
import { products } from "@/data";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const tNav = useTranslations("navigation");
  const featuredProducts = products.slice(0, 4);

  return (
    <footer style={{ background: "var(--fuji-dark)", borderTop: "1px solid var(--fuji-gold-border)" }}>

      {/* Main Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "5rem 2rem 4rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
          alignItems: "start",
        }}
        className="footer-grid"
        >
          {/* Brand Column */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 200,
                fontSize: "1.8rem",
                letterSpacing: "0.3em",
                color: "var(--fuji-white)",
                marginBottom: "4px",
              }}>
                天地星空
              </div>
              <div style={{
                fontFamily: "Inter",
                fontSize: "0.58rem",
                fontWeight: 300,
                letterSpacing: "0.35em",
                color: "var(--fuji-gold)",
                textTransform: "uppercase",
              }}>
                Amachi Hoshisora
              </div>
            </div>

            <div style={{ width: "40px", height: "1px", background: "var(--fuji-gold-dim)", marginBottom: "1.5rem" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {[t("footer.address.postalCode"), t("footer.address.street"), t("footer.address.phone")].map((line, i) => (
                <p key={i} style={{
                  fontFamily: "Inter",
                  fontSize: "0.72rem",
                  fontWeight: 300,
                  color: "var(--fuji-gray)",
                  letterSpacing: "0.04em",
                  lineHeight: 1.7,
                }}>
                  {line}
                </p>
              ))}
            </div>

            {/* Instagram */}
            <div style={{ marginTop: "2rem" }}>
              <a
                href="https://www.instagram.com/amasora_mtfuji3776/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--fuji-gray)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}
                className="fuji-footer-link"
              >
                <Instagram size={15} />
                <span style={{ fontFamily: "Inter", fontSize: "0.65rem", letterSpacing: "0.12em" }}>Instagram</span>
              </a>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 style={{
              fontFamily: "Inter",
              fontSize: "0.62rem",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--fuji-gold)",
              marginBottom: "1.5rem",
            }}>
              {t("footer.sections.products.title")}
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {featuredProducts.map((p) => (
                <li key={p.id}>
                  <Link href={`/products/${p.id}`} className="fuji-footer-link" style={{
                    fontFamily: "Inter",
                    fontSize: "0.72rem",
                    fontWeight: 300,
                    letterSpacing: "0.04em",
                    color: "var(--fuji-gray)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}>
                    {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="fuji-footer-link" style={{
                  fontFamily: "Inter",
                  fontSize: "0.72rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  color: "var(--fuji-gold-dim)",
                  textDecoration: "none",
                  transition: "color 0.3s",
                }}>
                  {t("footer.sections.products.viewAll")} →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 style={{
              fontFamily: "Inter",
              fontSize: "0.62rem",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--fuji-gold)",
              marginBottom: "1.5rem",
            }}>
              {t("footer.sections.company.title")}
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[{ href: "/", label: tNav("home") }, { href: "/q&a", label: tNav("qa") }, { href: "/products", label: tNav("product") }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="fuji-footer-link" style={{
                    fontFamily: "Inter",
                    fontSize: "0.72rem",
                    fontWeight: 300,
                    letterSpacing: "0.04em",
                    color: "var(--fuji-gray)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 style={{
              fontFamily: "Inter",
              fontSize: "0.62rem",
              fontWeight: 400,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--fuji-gold)",
              marginBottom: "1.5rem",
            }}>
              {t("footer.sections.contact.title")}
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <li>
                <a
                  href="https://www.mtfuji-sake.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fuji-footer-link"
                  style={{
                    fontFamily: "Inter",
                    fontSize: "0.72rem",
                    fontWeight: 300,
                    letterSpacing: "0.04em",
                    color: "var(--fuji-gray)",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                >
                  {t("footer.sections.contact.officialSite")}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: "1px solid rgba(201,169,110,0.08)" }}>
        <div style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.75rem",
        }}>
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { href: "/privacy", label: t("footer.legal.privacyPolicy") },
              { href: "/terms", label: t("footer.legal.termsOfService") },
              { href: "/commerce", label: t("footer.legal.commerceLaw") },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="fuji-footer-link" style={{
                fontFamily: "Inter",
                fontSize: "0.62rem",
                fontWeight: 300,
                letterSpacing: "0.1em",
                color: "var(--fuji-gray)",
                textDecoration: "none",
                opacity: 0.7,
                transition: "opacity 0.3s, color 0.3s",
              }}>
                {item.label}
              </Link>
            ))}
          </div>

          <p style={{
            fontFamily: "Inter",
            fontSize: "0.6rem",
            fontWeight: 300,
            color: "var(--fuji-gray)",
            letterSpacing: "0.12em",
            opacity: 0.5,
          }}>
            {t("footer.legal.copyright")}
          </p>

          <p style={{
            fontFamily: "Inter",
            fontSize: "0.6rem",
            fontWeight: 300,
            color: "var(--fuji-gray)",
            letterSpacing: "0.08em",
            opacity: 0.4,
          }}>
            {t("footer.ageVerification.drinking")} &nbsp;·&nbsp; {t("footer.ageVerification.driving")}
          </p>
        </div>
      </div>

      <style jsx global>{`
        .fuji-footer-link:hover {
          color: var(--fuji-gold-lt) !important;
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
};
