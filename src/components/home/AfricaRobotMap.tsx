/**
 * Hero graphic: the real Africa map (simplemaps, MIT — public/africa-map.svg)
 * used as a CSS mask so the robotic circuit figure lives inside the continent.
 *
 * Two layers share the same asset:
 *   1. `.africa-map__masked` — circuits + robot, clipped to the continent.
 *   2. `.africa-map__outline` — the map itself, brand-tinted, on top.
 *
 * Decorative only (aria-hidden). Pure CSS motion; no image download beyond
 * the one SVG, no scroll effects.
 */
export function AfricaRobotMap() {
  return (
    <div className="africa-map" aria-hidden="true">
      {/* Layer 1 — robot + circuits inside the continent silhouette */}
      <div className="africa-map__masked">
        <svg
          className="africa-map__inner"
          viewBox="0 0 1000 1001"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
        >
          <defs>
            <linearGradient id="robot-body" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#0a6ea8" />
              <stop offset="1" stopColor="#054163" />
            </linearGradient>
            <linearGradient id="scan-grad" x1="0" y1="0" x2="0" y2="1">
              <stop stopColor="#7fd0ff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#7fd0ff" stopOpacity="0.9" />
              <stop offset="1" stopColor="#7fd0ff" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Soft plate so the silhouette reads even where the robot does not reach */}
          <rect width="1000" height="1001" fill="#054163" fillOpacity="0.16" />

          {/* Circuit grid */}
          <g
            className="africa-map__circuits"
            stroke="#054163"
            strokeOpacity="0.4"
            strokeWidth="2"
          >
            <path d="M0 120 H1000 M0 250 H1000 M0 380 H1000 M0 510 H1000 M0 640 H1000 M0 770 H1000 M0 900 H1000" />
            <path d="M100 0 V1001 M250 0 V1001 M400 0 V1001 M550 0 V1001 M700 0 V1001 M850 0 V1001" />
          </g>

          {/* Traces */}
          <g
            className="africa-map__traces"
            stroke="#0277a9"
            strokeWidth="3"
            fill="none"
            strokeOpacity="0.75"
          >
            <path d="M80 420 H280 L340 360 H520 L580 420 H900" />
            <path d="M120 680 H320 L380 620 H620 L680 680 H940" />
            <path d="M500 80 V240 L560 300 V520 L500 580 V820" />
            <path d="M280 940 V760 L340 700 V480" />
            <path d="M760 200 V360 L820 420 V640" />
          </g>
          <g className="africa-map__nodes" fill="#0277a9">
            <circle cx="280" cy="420" r="8" />
            <circle cx="520" cy="360" r="8" />
            <circle cx="900" cy="420" r="8" />
            <circle cx="320" cy="680" r="8" />
            <circle cx="620" cy="620" r="8" />
            <circle cx="560" cy="300" r="8" />
            <circle cx="500" cy="580" r="8" />
            <circle cx="820" cy="420" r="8" />
            <circle cx="820" cy="640" r="8" />
            <circle cx="340" cy="700" r="8" />
          </g>

          {/* Robot bust — sized to sit fully inside the continent mask */}
          <g
            className="africa-map__robot"
            transform="translate(495 495) scale(1.28)"
            filter="url(#glow)"
          >
            <path
              d="M-90 130 C-90 96 -62 74 -34 68 H34 C62 74 90 96 90 130 L90 170 H-90 Z"
              fill="url(#robot-body)"
              opacity="0.94"
            />
            <rect x="-16" y="48" width="32" height="28" rx="6" fill="#054163" />
            <rect x="-58" y="-70" width="116" height="122" rx="22" fill="url(#robot-body)" />
            <rect
              x="-44"
              y="-48"
              width="88"
              height="70"
              rx="12"
              fill="#041c2c"
              opacity="0.88"
            />
            <g className="africa-map__eyes">
              <rect x="-32" y="-30" width="24" height="14" rx="7" fill="#7fd0ff" />
              <rect x="8" y="-30" width="24" height="14" rx="7" fill="#7fd0ff" />
            </g>
            <g stroke="#7fd0ff" strokeWidth="3" strokeLinecap="round" opacity="0.9">
              <line x1="-24" y1="6" x2="24" y2="6" />
              <line x1="-24" y1="16" x2="24" y2="16" />
              <line x1="-18" y1="26" x2="18" y2="26" />
            </g>
            <line x1="0" y1="-70" x2="0" y2="-104" stroke="#054163" strokeWidth="4" />
            <circle className="africa-map__antenna" cx="0" cy="-112" r="9" fill="#7fd0ff" />
            <rect x="-74" y="-34" width="18" height="40" rx="8" fill="#054163" />
            <rect x="56" y="-34" width="18" height="40" rx="8" fill="#054163" />
            <circle
              className="africa-map__core"
              cx="0"
              cy="118"
              r="16"
              fill="#7fd0ff"
              opacity="0.95"
            />
            <circle cx="0" cy="118" r="8" fill="#ffffff" opacity="0.75" />
          </g>

          {/* Scan line sweeps the silhouette */}
          <rect
            className="africa-map__scan"
            x="0"
            y="-100"
            width="1000"
            height="90"
            fill="url(#scan-grad)"
          />
        </svg>
      </div>

      {/* Layer 2 — the real map outline on top */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="africa-map__outline"
        src="/africa-map.svg"
        alt=""
        width={1000}
        height={1001}
        decoding="async"
      />
    </div>
  );
}
