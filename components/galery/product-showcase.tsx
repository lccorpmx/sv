"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { ProductDisplay } from "@/actions/products";
import { Sky } from "@/components/sky";

const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif';

const C = {
  text: "#1D1D1F",
  secondary: "#6E6E73",
  separator: "#F2F2F7",
  dotActive: "#1D1D1F",
  dotIdle: "#D1D1D6",
  blue: "#0071E3",
};

const EASE = [0.23, 1, 0.32, 1] as const;

type Product = ProductDisplay;


/* ─── Product Detail Modal ───────────────────────────────────── */
function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const paginate = (d: 1 | -1) => {
    setDir(d);
    setImgIdx((prev) => (prev + d + product.images.length) % product.images.length);
  };

  const imgVariants = {
    enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: EASE } },
    exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.25, ease: EASE } }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-white/80 backdrop-blur-2xl"
        style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.18)", fontFamily: SF }}
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.42, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 backdrop-blur-sm"
          style={{ color: C.text }}
          aria-label="Cerrar"
        >
          <X size={16} strokeWidth={2} />
        </button>

        {/* Image carousel */}
        <div className="relative bg-white/50 overflow-hidden" style={{ height: 280 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.img
              key={`modal-${product.id}-${imgIdx}`}
              custom={dir}
              variants={imgVariants}
              initial="enter"
              animate="center"
              exit="exit"
              src={product.images[imgIdx]}
              alt={product.name}
              draggable={false}
              className="absolute inset-0 w-full h-full object-contain p-8 select-none"
              style={{ filter: "drop-shadow(0 12px 28px rgba(0,0,0,0.12))" }}
            />
          </AnimatePresence>

          {product.images.length > 1 && (
            <>
              <button
                onClick={() => paginate(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm"
                style={{ color: C.text }}
                aria-label="Anterior"
              >
                <ChevronLeft size={18} strokeWidth={1.8} />
              </button>
              <button
                onClick={() => paginate(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm"
                style={{ color: C.text }}
                aria-label="Siguiente"
              >
                <ChevronRight size={18} strokeWidth={1.8} />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {product.images.length > 1 && (
          <div className="flex items-center justify-center gap-[6px] pt-3">
            {product.images.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => { setDir(i > imgIdx ? 1 : -1); setImgIdx(i); }}
                animate={{ width: i === imgIdx ? 18 : 6, backgroundColor: i === imgIdx ? C.dotActive : C.dotIdle }}
                transition={{ duration: 0.22 }}
                className="h-[6px] rounded-full"
                aria-label={`Imagen ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Info */}
        <div className="px-6 pt-4 pb-7">
          <div style={{ height: 1, backgroundColor: C.separator, marginBottom: 16 }} />
          <div className="flex items-baseline justify-between gap-2 mb-3">
            <h2 className="text-[22px] font-semibold tracking-tight" style={{ color: C.text }}>
              {product.name}
            </h2>
            <span className="text-[18px] font-semibold shrink-0" style={{ color: C.blue }}>
              {product.price}
            </span>
          </div>
          <p className="text-[14px] leading-[1.6]" style={{ color: C.secondary }}>
            {product.description}
          </p>
          <a
            href={`https://instagram.com/${product.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center gap-2 w-fit"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#E1306C" }}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
            <span className="text-[13px] font-medium" style={{ color: "#E1306C" }}>
              @{product.instagram}
            </span>
          </a>
          {product.buyUrl && (
            <a
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center w-full rounded-full text-[14px] font-semibold text-white"
              style={{ backgroundColor: C.blue, paddingTop: 11, paddingBottom: 11 }}
            >
              Comprar
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── ProductCard ─────────────────────────────────────────────── */
function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <div
      className="rounded-3xl overflow-hidden backdrop-blur-xl bg-white/60 flex flex-col"
      style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.07)", fontFamily: SF }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.images[0]}
        alt={product.name}
        draggable={false}
        className="w-full object-contain bg-white/40 p-4"
        style={{ height: 160, filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.10))" }}
      />
      <div className="px-4 pt-3 pb-4 flex flex-col gap-3">
        <p className="text-[14px] font-semibold truncate" style={{ color: C.text }}>
          {product.name}
        </p>
        <button
          onClick={onOpen}
          className="w-full rounded-full text-[13px] font-semibold text-white"
          style={{ backgroundColor: C.blue, paddingTop: 10, paddingBottom: 10 }}
        >
          Ver
        </button>
      </div>
    </div>
  );
}

/* ─── ProductShowcase ─────────────────────────────────────────── */
export function ProductShowcase({ products }: { products: Product[] }) {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <div className="relative min-h-screen" style={{ fontFamily: SF }}>
      <Sky />

      <div className="relative z-10 px-4 pt-12 pb-16 max-w-xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 mb-6 text-[13px] font-medium"
          style={{ color: C.secondary }}
        >
          <ArrowLeft size={15} strokeWidth={2} />
          Inicio
        </Link>
        <h1 className="text-[28px] font-semibold tracking-tight mb-1 text-center text-black">
          Arte de Vidrio Soplado
        </h1>
        <p className="text-[13px] text-center mb-8 text-black">
          Escaparate para artistas mexicanos
        </p>

        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProductModal product={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
