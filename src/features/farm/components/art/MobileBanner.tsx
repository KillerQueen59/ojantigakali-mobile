import type { CSSProperties, ReactNode } from 'react'

// Hand-authored from the prototype banner (390×120) with motion added: the sun
// twinkles and the cloud drifts. Elements match the original rects.
export default function MobileBanner({
  className,
  style,
  children,
}: {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <svg viewBox="0 0 390 120" shapeRendering="crispEdges" preserveAspectRatio="xMidYMid meet" className={className} style={style}>
      <rect x="0" y="0" width="390" height="120" fill="#86C5E8" />
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'farm-sunPulse 4.5s ease-in-out infinite' }}>
        <rect x="310" y="18" width="34" height="34" fill="#F2C14E" />
        <rect x="316" y="24" width="22" height="22" fill="#F8D77E" />
      </g>
      <g style={{ animation: 'farm-cloudDriftM 26s linear infinite' }}>
        <rect x="20" y="30" width="70" height="16" fill="#FFF" />
        <rect x="36" y="20" width="40" height="12" fill="#FFF" />
      </g>
      <polygon points="0,120 0,86 90,64 190,92 280,70 390,96 390,120" fill="#6FAE4E" />
      <rect x="0" y="104" width="390" height="16" fill="#5A9E3D" />
      {/* a bird drifting past */}
      <g transform="translate(120 40)">
        <g style={{ animation: 'farm-flutter 7s ease-in-out infinite' }}>
          <rect x="0" y="2" width="3" height="2" fill="#3B2A1A" />
          <rect x="2" y="0" width="3" height="2" fill="#3B2A1A" />
          <rect x="4" y="2" width="3" height="2" fill="#3B2A1A" />
        </g>
      </g>
      {children}
    </svg>
  )
}
