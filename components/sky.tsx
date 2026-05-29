"use client";

import { motion } from "framer-motion";

/* ─── Cloud SVG shapes ─────────────────────────────────────────── */

function CloudA({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 340 130" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <g fill={color}>
        {/* base ellipse — rounds the bottom */}
        <ellipse cx="170" cy="108" rx="152" ry="26" />
        {/* bumps */}
        <circle cx="62"  cy="90"  r="40" />
        <circle cx="118" cy="64"  r="56" />
        <circle cx="190" cy="54"  r="62" />
        <circle cx="262" cy="66"  r="52" />
        <circle cx="308" cy="86"  r="36" />
        {/* fill gaps between bumps */}
        <circle cx="90"  cy="88"  r="28" />
        <circle cx="152" cy="78"  r="32" />
        <circle cx="228" cy="82"  r="30" />
        <circle cx="284" cy="92"  r="24" />
      </g>
    </svg>
  );
}

function CloudB({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <g fill={color}>
        <ellipse cx="150" cy="100" rx="136" ry="24" />
        <circle cx="52"  cy="80"  r="36" />
        <circle cx="106" cy="56"  r="52" />
        <circle cx="168" cy="46"  r="58" />
        <circle cx="232" cy="58"  r="46" />
        <circle cx="272" cy="76"  r="30" />
        <circle cx="80"  cy="80"  r="26" />
        <circle cx="140" cy="72"  r="30" />
        <circle cx="202" cy="76"  r="28" />
        <circle cx="252" cy="84"  r="22" />
      </g>
    </svg>
  );
}

function CloudC({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 260 112" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
      <g fill={color}>
        <ellipse cx="130" cy="94" rx="118" ry="22" />
        <circle cx="44"  cy="72"  r="30" />
        <circle cx="90"  cy="50"  r="44" />
        <circle cx="148" cy="42"  r="50" />
        <circle cx="204" cy="54"  r="38" />
        <circle cx="238" cy="70"  r="24" />
        <circle cx="68"  cy="74"  r="22" />
        <circle cx="122" cy="68"  r="28" />
        <circle cx="178" cy="72"  r="26" />
        <circle cx="220" cy="78"  r="18" />
      </g>
    </svg>
  );
}

/* ─── Single animated cloud ────────────────────────────────────── */
interface CloudProps {
  /* horizontal start as vw offset (can be negative = off-screen left) */
  startVw: number;
  y: string;
  width: number;
  opacity?: number;
  blur?: number;
  color?: string;
  /* how long to drift from startVw to (startVw + travelVw) — then loops */
  driftDuration?: number;
  /* vertical float */
  floatDuration?: number;
  floatY?: number;
  delay?: number;
  flip?: boolean;
  shape?: "A" | "B" | "C";
}

export function Cloud({
  startVw, y, width,
  opacity = 1,
  blur = 0,
  color = "white",
  driftDuration = 80,
  floatDuration = 18,
  floatY = 20,
  delay = 0,
  flip = false,
  shape = "A",
}: CloudProps) {
  const Shape = shape === "A" ? CloudA : shape === "B" ? CloudB : CloudC;

  /* drift: translate from 0vw to enough that the cloud exits the right edge */
  const travelVw = 140 - startVw; /* guarantees it exits screen regardless of start */

  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${startVw}vw`,
        top: y,
        width,
        pointerEvents: "none",
        scaleX: flip ? -1 : 1,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        opacity,
      }}
      animate={{
        x: ["0vw", `${travelVw}vw`],
        y: [0, -floatY, floatY * 0.5, -floatY * 0.3, 0],
      }}
      transition={{
        x: {
          duration: driftDuration,
          repeat: Infinity,
          ease: "linear",
          delay,
        },
        y: {
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay % floatDuration,
          times: [0, 0.25, 0.55, 0.8, 1],
        },
      }}
    >
      <Shape color={color} />
    </motion.div>
  );
}

/* ─── Sky background with layered clouds ─────────────────────── */
export function Sky() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        /* rich sky-blue gradient */
        background: `linear-gradient(
          180deg,
          #2d82c8 0%,
          #4a9fdf 10%,
          #6ab6ed 22%,
          #8ecdf5 36%,
          #aeddf9 52%,
          #caeafb 66%,
          #e0f3fd 80%,
          #f2f9ff 100%
        )`,
      }}
    >
      {/* ── Far/back layer: blurry, slow, semi-transparent ── */}
      <Cloud startVw={-40} y="0%"  width={700} opacity={0.40} blur={8} color="#d6eeff" driftDuration={160} floatDuration={30} floatY={10} delay={0}   shape="A" />
      <Cloud startVw={25}  y="4%"  width={620} opacity={0.38} blur={8} color="#cce8ff" driftDuration={175} floatDuration={34} floatY={8}  delay={55}  shape="B" flip />
      <Cloud startVw={-70} y="7%"  width={580} opacity={0.35} blur={9} color="#e0f2ff" driftDuration={190} floatDuration={28} floatY={7}  delay={90}  shape="C" />
      <Cloud startVw={55}  y="2%"  width={540} opacity={0.36} blur={8} color="#d0eaff" driftDuration={180} floatDuration={32} floatY={9}  delay={130} shape="A" flip />

      {/* ── Mid layer ── */}
      <Cloud startVw={-30} y="13%" width={560} opacity={0.72} blur={3} color="#ffffff" driftDuration={110} floatDuration={20} floatY={22} delay={8}   shape="B" />
      <Cloud startVw={40}  y="9%"  width={520} opacity={0.68} blur={3} color="#f0f9ff" driftDuration={125} floatDuration={22} floatY={18} delay={45}  shape="A" flip />
      <Cloud startVw={-60} y="18%" width={500} opacity={0.70} blur={4} color="#eaf5ff" driftDuration={135} floatDuration={25} floatY={16} delay={25}  shape="C" />
      <Cloud startVw={70}  y="22%" width={460} opacity={0.65} blur={3} color="#f5fbff" driftDuration={120} floatDuration={21} floatY={20} delay={70}  shape="B" flip />
      <Cloud startVw={-50} y="30%" width={480} opacity={0.75} blur={2} color="#ffffff" driftDuration={100} floatDuration={18} floatY={24} delay={40}  shape="A" />

      {/* ── Close/front layer: crisp, fast, fully opaque ── */}
      <Cloud startVw={-20} y="28%" width={420} opacity={0.90} blur={1} color="#ffffff" driftDuration={80}  floatDuration={15} floatY={30} delay={5}   shape="C" />
      <Cloud startVw={55}  y="34%" width={380} opacity={0.88} blur={0} color="#f8fcff" driftDuration={88}  floatDuration={16} floatY={26} delay={30}  shape="A" flip />
      <Cloud startVw={-65} y="42%" width={360} opacity={0.85} blur={1} color="#ffffff" driftDuration={75}  floatDuration={14} floatY={28} delay={18}  shape="B" />
      <Cloud startVw={30}  y="50%" width={340} opacity={0.88} blur={0} color="#f0f8ff" driftDuration={92}  floatDuration={17} floatY={24} delay={60}  shape="C" flip />
      <Cloud startVw={-40} y="58%" width={320} opacity={0.82} blur={0} color="#ffffff" driftDuration={70}  floatDuration={13} floatY={26} delay={12}  shape="A" />
      <Cloud startVw={65}  y="65%" width={300} opacity={0.80} blur={0} color="#f5fbff" driftDuration={78}  floatDuration={15} floatY={22} delay={50}  shape="B" flip />
    </div>
  );
}
