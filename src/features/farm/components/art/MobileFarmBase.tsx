import type { CSSProperties, ReactNode } from 'react'

// Hand-authored from the prototype farm scene (390×220) with motion: drifting
// cloud + twinkling sun. `children` holds the per-place pixel-art group.
export default function MobileFarmBase({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <svg viewBox="0 0 390 220" shapeRendering="crispEdges" preserveAspectRatio="xMidYMid slice" className={className} style={style}>
      <rect width="390" height="220" fill="#86C5E8" />
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'farm-sunPulse 4.5s ease-in-out infinite' }}>
        <rect x="300" y="20" width="34" height="34" fill="#F2C14E" />
        <rect x="306" y="26" width="22" height="22" fill="#F8D77E" />
      </g>
      <g style={{ animation: 'farm-cloudDriftM 30s linear infinite' }}>
        <rect x="26" y="28" width="70" height="16" fill="#FFF" />
        <rect x="42" y="18" width="40" height="12" fill="#FFF" />
      </g>
      <polygon points="0,180 0,140 120,116 260,150 390,124 390,180" fill="#6FAE4E" />
      <rect x="0" y="172" width="390" height="48" fill="#5A9E3D" />
      {/* birds drifting high in the sky — clear of the ground props */}
      <g transform="translate(58 58)">
        <g style={{ animation: 'farm-flutter 7s ease-in-out infinite' }}>
          <rect x="0" y="2" width="3" height="2" fill="#3B2A1A" />
          <rect x="2" y="0" width="3" height="2" fill="#3B2A1A" />
          <rect x="4" y="2" width="3" height="2" fill="#3B2A1A" />
        </g>
      </g>
      <g transform="translate(98 78)">
        <g style={{ animation: 'farm-flutter 7s ease-in-out infinite', animationDelay: '-3.5s' }}>
          <rect x="0" y="2" width="2" height="2" fill="#3B2A1A" />
          <rect x="1" y="0" width="2" height="2" fill="#3B2A1A" />
          <rect x="3" y="2" width="2" height="2" fill="#3B2A1A" />
        </g>
      </g>
      {children}
    </svg>
  )
}
