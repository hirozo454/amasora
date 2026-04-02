"use client";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";
import { LegacyProductData } from "@/types/products";
import { useInView } from "@/hooks/useInView";

interface ProductCardProps {
  product: LegacyProductData;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const href = product.id ? `/products/${product.id}` : "/products";
  const { ref, inView } = useInView(0.12);

  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <div
        ref={ref}
        className={`fuji-product-card reveal${inView ? " is-visible" : ""}`}
        style={{
        background: "var(--fuji-surface)",
        border: "1px solid var(--fuji-gold-border)",
        overflow: "hidden",
        transition: "border-color 0.4s, transform 0.4s",
        cursor: "pointer",
      }}>
        {/* Image — clip-path reveal */}
        <div style={{ position: "relative", aspectRatio: "1 / 1.1", overflow: "hidden", background: "var(--fuji-dark)" }}>
          <div className={`reveal-clip${inView ? " is-visible" : ""}`} style={{ position: "absolute", inset: 0 }}>
            <Image
              src={`/${product.image}`}
              alt={product.name}
              fill
              className="fuji-product-img"
              style={{ objectFit: "cover", transition: "transform 0.6s ease, filter 0.4s" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          </div>
          {/* Gradient overlay at bottom */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background: "linear-gradient(to top, rgba(5,5,5,0.6), transparent)",
          }} />
        </div>

        {/* Info */}
        <div style={{ padding: "1.5rem 1.25rem 1.75rem" }}>
          <h3 style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 300,
            fontSize: "1rem",
            letterSpacing: "0.08em",
            color: "var(--fuji-white)",
            marginBottom: "0.5rem",
            lineHeight: 1.4,
          }}>
            {product.name}
          </h3>

          {product.description && (
            <p style={{
              fontFamily: "Inter",
              fontSize: "0.72rem",
              fontWeight: 300,
              color: "var(--fuji-gray)",
              letterSpacing: "0.04em",
              marginBottom: "1rem",
              lineHeight: 1.6,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {product.description}
            </p>
          )}

          {product.price && (
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontStyle: "italic",
              fontSize: "1.05rem",
              fontWeight: 300,
              color: "var(--fuji-gold)",
              letterSpacing: "0.08em",
            }}>
              {product.price}
            </p>
          )}
        </div>
      </div>

      <style jsx global>{`
        .fuji-product-card:hover {
          border-color: var(--fuji-gold-dim) !important;
          transform: translateY(-6px);
        }
        .fuji-product-card:hover .fuji-product-img {
          transform: scale(1.05) !important;
          filter: brightness(1.05) !important;
        }
      `}</style>
    </Link>
  );
};
