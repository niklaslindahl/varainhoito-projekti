import type { SVGProps } from "react";
import type { Impact, RiskLabel, WarningType } from "@/lib/types";

const baseProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function WarningGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 12 L8 3 L13 12" />
      <path d="M3 12 L13 12" strokeOpacity="0.25" />
    </svg>
  );
}

export function CompanyGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3.25" y="3.25" width="9.5" height="9.5" rx="0.5" />
      <path d="M3.25 8 L12.75 8" />
    </svg>
  );
}

export function SectorGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 13 L3 7 L6 7 L6 4 L10 4 L10 9 L13 9 L13 13 Z" />
    </svg>
  );
}

export function RegionGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="8" cy="8" r="5" />
      <path d="M3 8 L13 8" />
      <path d="M8 3 C 5.5 5, 5.5 11, 8 13" />
      <path d="M8 3 C 10.5 5, 10.5 11, 8 13" />
    </svg>
  );
}

export function RiskGlyph({
  level,
  ...props
}: SVGProps<SVGSVGElement> & { level: RiskLabel }) {
  const filled: Record<RiskLabel, number> = {
    varovainen: 1,
    maltillinen: 2,
    aktiivinen: 3,
    aggressiivinen: 4,
  };
  const n = filled[level];
  const bars = [
    { x: 2.5, h: 4 },
    { x: 5.5, h: 7 },
    { x: 8.5, h: 10 },
    { x: 11.5, h: 13 },
  ];
  return (
    <svg {...baseProps} {...props}>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={14 - b.h}
          width={2}
          height={b.h}
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
        />
      ))}
    </svg>
  );
}

export function ImpactGlyph({
  level,
  ...props
}: SVGProps<SVGSVGElement> & { level: Impact }) {
  const filledByLevel: Record<Impact, number> = {
    matala: 1,
    keskitaso: 2,
    korkea: 3,
  };
  const n = filledByLevel[level];
  const bars = [
    { y: 11, w: 5 },
    { y: 8, w: 9 },
    { y: 5, w: 13 },
  ];
  return (
    <svg {...baseProps} {...props}>
      {bars.map((b, i) => (
        <rect
          key={i}
          x={1}
          y={b.y}
          width={b.w}
          height={2.2}
          fill={i < n ? "currentColor" : "none"}
          stroke="currentColor"
        />
      ))}
    </svg>
  );
}

export function WarningTypeGlyph({
  type,
  ...props
}: SVGProps<SVGSVGElement> & { type: WarningType }) {
  if (type === "yhtio") return <CompanyGlyph {...props} />;
  if (type === "sektori") return <SectorGlyph {...props} />;
  return <RegionGlyph {...props} />;
}

export function Asterisk({ className }: { className?: string }) {
  return (
    <span aria-hidden className={className} style={{ fontFamily: "var(--font-serif)", fontWeight: 600 }}>
      *
    </span>
  );
}

export function DiagonalRule(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2 14 L14 2" />
    </svg>
  );
}
