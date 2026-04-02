"use client";
import React from "react";
import { LegacyProductData } from "@/types/products";
import { ProductCard } from "./ProductCard";
import { Link } from "@/i18n/routing";

interface ProductProps {
  productsData: LegacyProductData[];
}

export const Product: React.FC<ProductProps> = ({ productsData }) => {
  return (
    <section style={{ background: "var(--fuji-black)", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{
            fontFamily: "Inter",
            fontSize: "0.62rem",
            fontWeight: 400,
            letterSpacing: "0.45em",
            color: "var(--fuji-gold)",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            Premium Collection
          </p>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 200,
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            letterSpacing: "0.25em",
            color: "var(--fuji-white)",
            marginBottom: "1.5rem",
          }}>
            COLLECTION
          </h2>
          <div className="fuji-rule" />
        </div>

        {/* Products Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "1.5rem",
        }}>
          {productsData.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <Link
            href="/products"
            className="fuji-btn-outline"
            style={{ display: "inline-block", textDecoration: "none" }}
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};
