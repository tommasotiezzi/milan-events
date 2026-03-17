import React, { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { className?: string };

// ── Utility ───────────────────────────────────────────────────────────────────

function Icon({ children, className, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

// ── Navigation ────────────────────────────────────────────────────────────────

export function ArrowLeftIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </Icon>
  );
}

// ── UI ────────────────────────────────────────────────────────────────────────

export function StarIcon({ className, filled }: IconProps & { filled?: boolean }) {
  return (
    <Icon className={className} fill={filled ? "currentColor" : "none"}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </Icon>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  );
}

export function CalendarIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Icon>
  );
}

export function LocationPinIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

export function EnvelopeIcon({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </Icon>
  );
}

// ── App logo mark ─────────────────────────────────────────────────────────────

export function LogoMark({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Calendar base */}
      <rect x="4" y="7" width="24" height="21" rx="3" fill="white" fillOpacity="0.15" />
      <rect x="4" y="7" width="24" height="21" rx="3" stroke="white" strokeWidth="1.5" />
      {/* Header band */}
      <rect x="4" y="7" width="24" height="7" rx="3" fill="white" fillOpacity="0.2" />
      <rect x="4" y="11" width="24" height="3" fill="white" fillOpacity="0.2" />
      {/* Rings */}
      <line x1="10" y1="4" x2="10" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="4" x2="22" y2="10" stroke="white" strokeWidth="2" strokeLinecap="round" />
      {/* Grid dots */}
      <circle cx="10" cy="19" r="1.5" fill="white" />
      <circle cx="16" cy="19" r="1.5" fill="white" />
      <circle cx="22" cy="19" r="1.5" fill="white" />
      <circle cx="10" cy="24" r="1.5" fill="white" />
      <circle cx="16" cy="24" r="1.5" fill="white" />
    </svg>
  );
}

// ── Category illustrations ─────────────────────────────────────────────────────

export function MusicIllustration({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.25}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </Icon>
  );
}

export function FoodIllustration({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.25}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 2v20M15 2c3.314 0 6 1.343 6 3v3c0 1.657-2.686 3-6 3s-6-1.343-6-3V5c0-1.657 2.686-3 6-3z" />
    </Icon>
  );
}

export function ArtIllustration({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.25}>
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" stroke="none" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </Icon>
  );
}

export function SportIllustration({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.25}>
      <circle cx="12" cy="12" r="10" />
      <path d="M4.93 4.93 19.07 19.07" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <path d="M2 12h20" />
    </Icon>
  );
}

export function CultureIllustration({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.25}>
      <path d="M2 22h20M12 2 2 7h20zM6 7v15M10 7v15M14 7v15M18 7v15" />
    </Icon>
  );
}

export function OtherIllustration({ className }: IconProps) {
  return (
    <Icon className={className} strokeWidth={1.25}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeWidth={2} />
    </Icon>
  );
}

// Category map
const categoryIllustrations: Record<string, (props: IconProps) => React.ReactElement> = {
  music: MusicIllustration,
  food: FoodIllustration,
  art: ArtIllustration,
  sport: SportIllustration,
  culture: CultureIllustration,
  other: OtherIllustration,
};

export function CategoryIllustration({ category, className }: { category: string; className?: string }) {
  const Component = categoryIllustrations[category] ?? OtherIllustration;
  return <Component className={className} />;
}


// ── Empty-state illustration ──────────────────────────────────────────────────

export function EmptyCalendarIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* shadow */}
      <ellipse cx="60" cy="108" rx="32" ry="6" fill="#e5e7eb" />
      {/* calendar body */}
      <rect x="18" y="22" width="84" height="78" rx="10" fill="white" stroke="#e5e7eb" strokeWidth="2" />
      {/* header */}
      <rect x="18" y="22" width="84" height="26" rx="10" fill="#f3f4f6" />
      <rect x="18" y="36" width="84" height="12" fill="#f3f4f6" />
      {/* rings */}
      <rect x="38" y="14" width="6" height="18" rx="3" fill="#9ca3af" />
      <rect x="76" y="14" width="6" height="18" rx="3" fill="#9ca3af" />
      {/* weekday labels */}
      <rect x="26" y="56" width="10" height="4" rx="2" fill="#e5e7eb" />
      <rect x="42" y="56" width="10" height="4" rx="2" fill="#e5e7eb" />
      <rect x="58" y="56" width="10" height="4" rx="2" fill="#e5e7eb" />
      <rect x="74" y="56" width="10" height="4" rx="2" fill="#e5e7eb" />
      <rect x="90" y="56" width="6" height="4" rx="2" fill="#e5e7eb" />
      {/* date cells */}
      {[
        [26, 68], [42, 68], [58, 68], [74, 68], [90, 68],
        [26, 80], [42, 80],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="10" height="10" rx="3" fill="#f3f4f6" />
      ))}
      {/* highlighted "no events" X */}
      <circle cx="84" cy="82" r="12" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1.5" />
      <path d="M80 78l8 8M88 78l-8 8" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Newsletter illustration ───────────────────────────────────────────────────

export function NewsletterIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 96 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* shadow */}
      <ellipse cx="48" cy="76" rx="28" ry="4" fill="#e5e7eb" />
      {/* envelope body */}
      <rect x="8" y="16" width="80" height="56" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
      {/* flap fold lines */}
      <path d="M8 24 48 48 88 24" stroke="#e5e7eb" strokeWidth="1.5" />
      {/* lines of "text" */}
      <rect x="24" y="34" width="32" height="3" rx="1.5" fill="#f3f4f6" />
      <rect x="24" y="41" width="48" height="3" rx="1.5" fill="#f3f4f6" />
      <rect x="24" y="48" width="40" height="3" rx="1.5" fill="#f3f4f6" />
      {/* stamp */}
      <rect x="66" y="22" width="14" height="16" rx="2" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="1" />
      <rect x="69" y="25" width="8" height="8" rx="1" fill="#e5e7eb" />
      {/* sparkle dots */}
      <circle cx="14" cy="12" r="2.5" fill="#d1d5db" />
      <circle cx="80" cy="8" r="2" fill="#e5e7eb" />
      <circle cx="88" cy="16" r="1.5" fill="#d1d5db" />
      <circle cx="6" cy="20" r="1.5" fill="#e5e7eb" />
    </svg>
  );
}
