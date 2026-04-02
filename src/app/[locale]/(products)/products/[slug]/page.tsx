// src/app/[locale]/(products)/products/[slug]/page.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ShoppingCart, ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { useCart } from "@/store/cart";
import { getProducts, formatPrice, getProductDetails, getProductById } from "@/data/utils";
import { useTranslations } from "next-intl";
import { useInView } from "@/hooks/useInView";

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const locale = params.locale as string;
  const t = useTranslations("productDetail");

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const { ref: imgRef, inView: imgInView } = useInView(0.1);
  const { ref: infoRef, inView: infoInView } = useInView(0.1);

  const productId = parseInt(params.slug as string);
  const product = getProductById(productId, locale);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--fuji-black)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.5rem", color: "var(--fuji-white)", marginBottom: "2rem" }}>
            {t("productNotFound")}
          </p>
          <button
            onClick={() => router.push(`/${locale}/products`)}
            className="fuji-btn-outline"
          >
            {t("backToProducts")}
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 500);
  };

  const handleQuantityChange = (increment: boolean) => {
    if (increment) setQuantity((p) => p + 1);
    else setQuantity((p) => Math.max(p - 1, 1));
  };

  const productDetails = getProductDetails(product, locale);

  return (
    <div style={{ minHeight: "100vh", background: "var(--fuji-black)", paddingTop: "72px" }}>

      {/* Breadcrumb */}
      <div style={{ borderBottom: "1px solid var(--fuji-gold-border)", padding: "1rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
          <button
            onClick={() => router.push(`/${locale}/products`)}
            style={{
              fontFamily: "Inter",
              fontSize: "0.65rem",
              fontWeight: 300,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--fuji-gray)",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.3s",
            }}
            className="fuji-back-btn"
          >
            <ArrowLeft size={14} />
            {t("productList")}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem 2rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="product-detail-grid"
        >
          {/* Left: Image */}
          <div ref={imgRef} style={{ position: "sticky", top: "100px" }}>
            <div style={{
              position: "relative",
              aspectRatio: "1",
              background: "var(--fuji-surface)",
              overflow: "hidden",
              border: "1px solid var(--fuji-gold-border)",
            }}>
              <div className={`reveal-clip${imgInView ? " is-visible" : ""}`} style={{ position: "absolute", inset: 0 }}>
              <Image
                src={product.image.url}
                alt={product.image.alt}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
              </div>
              {product.originalPrice && (
                <div style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "1.5rem",
                  background: "var(--fuji-gold)",
                  color: "var(--fuji-black)",
                  fontFamily: "Inter",
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                }}>
                  {t("onSale")}
                </div>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div
            ref={infoRef}
            className={`reveal reveal-delay-2${infoInView ? " is-visible" : ""}`}
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >

            {/* Category / Label */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <span style={{
                fontFamily: "Inter",
                fontSize: "0.6rem",
                fontWeight: 300,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fuji-gray)",
                border: "1px solid var(--fuji-gold-border)",
                padding: "3px 10px",
              }}>
                {product.category}
              </span>
              <span style={{
                fontFamily: "Inter",
                fontSize: "0.6rem",
                fontWeight: 300,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--fuji-gold-dim)",
                border: "1px solid var(--fuji-gold-border)",
                padding: "3px 10px",
              }}>
                {product.label}
              </span>
            </div>

            {/* Product Name */}
            <div>
              <h1 style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 200,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                letterSpacing: "0.12em",
                color: "var(--fuji-white)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}>
                {product.name}
              </h1>
              <div style={{ width: "40px", height: "1px", background: "var(--fuji-gold)" }} />
            </div>

            {/* Description */}
            <p style={{
              fontFamily: "Inter",
              fontWeight: 300,
              fontSize: "0.82rem",
              letterSpacing: "0.06em",
              color: "var(--fuji-gray-lt)",
              lineHeight: 1.9,
            }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
              <span style={{
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: "2rem",
                color: "var(--fuji-gold)",
                letterSpacing: "0.08em",
              }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.2rem",
                  color: "var(--fuji-gray)",
                  textDecoration: "line-through",
                  opacity: 0.6,
                }}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Quantity */}
            <div>
              <p style={{
                fontFamily: "Inter",
                fontSize: "0.62rem",
                fontWeight: 400,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--fuji-gold)",
                marginBottom: "0.75rem",
              }}>
                {t("quantity")}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid var(--fuji-gold-border)",
                }}>
                  <button
                    onClick={() => handleQuantityChange(false)}
                    disabled={quantity <= 1}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "none",
                      border: "none",
                      cursor: quantity <= 1 ? "not-allowed" : "pointer",
                      color: quantity <= 1 ? "var(--fuji-surface2)" : "var(--fuji-gray)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.3s",
                    }}
                  >
                    <Minus size={14} />
                  </button>
                  <span style={{
                    width: "48px",
                    textAlign: "center",
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.2rem",
                    fontWeight: 300,
                    color: "var(--fuji-white)",
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(true)}
                    style={{
                      width: "40px",
                      height: "40px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--fuji-gray)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "color 0.3s",
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: "1rem",
                  color: "var(--fuji-gray)",
                }}>
                  {t("subtotal")}: {formatPrice(product.price * quantity)}
                </span>
              </div>
            </div>

            {/* Age Confirmation */}
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              cursor: "pointer",
            }}>
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "var(--fuji-gold)",
                  cursor: "pointer",
                }}
              />
              <span style={{
                fontFamily: "Inter",
                fontSize: "0.7rem",
                fontWeight: 300,
                letterSpacing: "0.06em",
                color: "var(--fuji-gray)",
              }}>
                I confirm I am of legal drinking age.
              </span>
            </label>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || !ageConfirmed}
              style={{
                fontFamily: "Inter",
                fontSize: "0.7rem",
                fontWeight: 400,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                padding: "1rem 0",
                border: "1px solid",
                cursor: isAdding || !ageConfirmed ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                transition: "all 0.3s",
                background: justAdded
                  ? "rgba(100,160,100,0.15)"
                  : ageConfirmed
                    ? "var(--fuji-gold)"
                    : "transparent",
                color: justAdded
                  ? "#6aaf6a"
                  : ageConfirmed
                    ? "var(--fuji-black)"
                    : "var(--fuji-surface2)",
                borderColor: justAdded
                  ? "#6aaf6a"
                  : ageConfirmed
                    ? "var(--fuji-gold)"
                    : "var(--fuji-surface2)",
                opacity: isAdding ? 0.7 : 1,
              }}
            >
              {isAdding ? (
                <>
                  <div style={{ width: "14px", height: "14px", border: "1px solid currentColor", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  Adding...
                </>
              ) : justAdded ? (
                <>
                  <Check size={14} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  {t("addToCart")}
                </>
              )}
            </button>

            {/* Product Details Table */}
            <div style={{ borderTop: "1px solid var(--fuji-gold-border)", paddingTop: "2rem" }}>
              <p style={{
                fontFamily: "Inter",
                fontSize: "0.62rem",
                fontWeight: 400,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--fuji-gold)",
                marginBottom: "1.5rem",
              }}>
                {t("productDetails")}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {productDetails.map((detail, i) => (
                  <div key={i} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(201,169,110,0.06)",
                  }}>
                    <span style={{ fontFamily: "Inter", fontSize: "0.72rem", fontWeight: 300, color: "var(--fuji-gray)", letterSpacing: "0.06em" }}>
                      {detail.label}
                    </span>
                    <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "0.95rem", fontWeight: 300, color: "var(--fuji-white)", letterSpacing: "0.06em" }}>
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div style={{ marginTop: "7rem", borderTop: "1px solid var(--fuji-gold-border)", paddingTop: "5rem" }}>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 200,
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            letterSpacing: "0.25em",
            color: "var(--fuji-white)",
            marginBottom: "3rem",
            textAlign: "center",
          }}>
            {t("relatedProducts")}
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}>
            {getProducts(locale)
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((rp) => (
                <div
                  key={rp.id}
                  onClick={() => router.push(`/${locale}/products/${rp.id}`)}
                  className="fuji-card"
                  style={{ cursor: "pointer", overflow: "hidden" }}
                >
                  <div style={{ position: "relative", aspectRatio: "1", background: "var(--fuji-dark)", overflow: "hidden" }}>
                    <Image src={rp.image.url} alt={rp.image.alt} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <h3 style={{ fontFamily: "var(--font-cormorant)", fontWeight: 300, fontSize: "0.95rem", color: "var(--fuji-white)", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                      {rp.name}
                    </h3>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "0.9rem", color: "var(--fuji-gold)" }}>
                      {formatPrice(rp.price)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .fuji-back-btn:hover { color: var(--fuji-gold) !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .product-detail-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
