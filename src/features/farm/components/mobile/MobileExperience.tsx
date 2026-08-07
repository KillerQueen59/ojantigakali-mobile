'use client'

import { useEffect, useState } from 'react'
import { CATALOG } from '../../data/cards'
import { WINDOW_CONTENT } from '../../data/content'
import { MOBILE_SCENES, SECTIONS, ZONE_ORDER, ZONES } from '../../data/zones'
import { farmActions, useFarm } from '../../state/farmStore'
import IconSymbols from '../art/IconSymbols'
import MobileBanner from '../art/MobileBanner'
import MobileFarmBase from '../art/MobileFarmBase'
import Meter from '../Meter'
import { HarvestModal, ShareModal, Toast } from '../Modals'
import TendBurst, { useZoneTend } from '../TendBurst'
import FarmPet from './FarmPet'

const title = 'var(--farm-font-title)'
const mono = 'var(--farm-font-mono)'
const body = 'var(--farm-font-body)'

const bevelOut = 'inset 2px 2px 0 #A9713C, inset -2px -2px 0 #4A2F18'

function Icon({ href, size }: { href: string; size: number }) {
  return (
    <svg width={size} height={size} shapeRendering="crispEdges" aria-hidden>
      <use href={href} />
    </svg>
  )
}

function useClock() {
  const [t, setT] = useState('00:00')
  useEffect(() => {
    const fmt = () => {
      const n = new Date()
      return `${String(n.getHours()).padStart(2, '0')}:${String(n.getMinutes()).padStart(2, '0')}`
    }
    setT(fmt())
    const id = setInterval(() => setT(fmt()), 30000)
    return () => clearInterval(id)
  }, [])
  return t
}

function StatusStrip() {
  const mScreen = useFarm((s) => s.mScreen)
  const clock = useClock()
  const ctx =
    mScreen === 'farm' ? 'THE FARM · SHARED WITH ALL VISITORS' : 'NEW CROP HARVESTED'
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#4A2F18', padding: '8px 14px', fontFamily: mono, fontSize: 10, color: '#F6E7C5', letterSpacing: '.08em' }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ color: '#F2C14E' }}>▶</span>
        {ctx}
      </span>
      <span style={{ color: '#D9C49A' }}>{clock}</span>
    </div>
  )
}

function Tile({ section, size, showLabel }: { section: (typeof SECTIONS)[number]; size: number; showLabel?: boolean }) {
  const locked = section.id === null
  return (
    <button
      type="button"
      className="farm-tile"
      onClick={() => (locked ? farmActions.lockedToast() : farmActions.openApp(section.id!))}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, border: 0, background: 'transparent', cursor: 'pointer', padding: 0 }}
    >
      <span style={{ width: size, height: size, display: 'grid', placeItems: 'center', background: locked ? '#5E3D1F' : '#6E4523', opacity: locked ? 0.75 : 1, boxShadow: bevelOut }}>
        <Icon href={section.icon} size={Math.round(size * 0.55)} />
      </span>
      {showLabel && (
        <span style={{ fontFamily: mono, fontSize: 9, color: '#6E4523', letterSpacing: '.1em' }}>
          {section.label}
        </span>
      )}
    </button>
  )
}

function MobileHome() {
  const clock = useClock()
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative' }}>
      {/* sky banner → opens farm */}
      <button type="button" onClick={farmActions.openFarm} style={{ position: 'relative', border: 0, padding: 0, cursor: 'pointer', display: 'block', lineHeight: 0 }}>
        <MobileBanner style={{ display: 'block', width: '100%', height: 'auto' }} />
        <span style={{ position: 'absolute', top: 10, left: 12, background: '#4A2F18', color: '#F6E7C5', fontFamily: title, fontSize: 14, padding: '3px 10px', animation: 'farm-bob 1.6s ease-in-out infinite' }}>
          VISIT THE FARM ↓
        </span>
      </button>

      {/* hero widget — positioned above the banner so it overlaps cleanly */}
      <div style={{ position: 'relative', zIndex: 1, margin: '-42px 16px 0', background: '#8B5A2B', padding: 4, boxShadow: `3px 3px 0 rgba(0,0,0,.35), ${bevelOut}` }}>
        <div style={{ background: '#F6E7C5', padding: '12px 14px', boxShadow: 'inset 0 0 0 2px #D9C49A', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontFamily: title, fontSize: 38, color: '#3B2A1A', lineHeight: 1 }}>{clock}</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: '#6E4523', letterSpacing: '.15em', marginTop: 4 }}>BOGOR, INDONESIA</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontFamily: mono, fontSize: 10, color: '#3E7229' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5A9E3D' }} />
              OPEN TO WORK
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: title, fontSize: 16, color: '#3B2A1A' }}>OJAN</div>
            <div style={{ fontFamily: mono, fontSize: 9, color: '#8B5A2B', lineHeight: 1.4 }}>SOFTWARE ENGINEER<br />FULL-STACK · FINTECH</div>
          </div>
        </div>
      </div>

      {/* app grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px 12px', margin: '18px 16px 0' }}>
        {SECTIONS.map((s, i) => (
          <Tile key={i} section={s} size={62} showLabel />
        ))}
      </div>

      {/* farm preview card → opens farm */}
      <button type="button" onClick={farmActions.openFarm} style={{ margin: '18px 16px 0', border: 0, padding: 5, cursor: 'pointer', background: '#8B5A2B', boxShadow: `3px 3px 0 rgba(0,0,0,.35), ${bevelOut}`, display: 'block', flex: 1, minHeight: 96 }}>
        <div style={{ height: '100%', overflow: 'hidden', boxShadow: 'inset 0 0 0 2px #D9C49A' }}>
          <MobileFarmBase style={{ display: 'block', width: '100%', height: '100%' }}>
            {MOBILE_SCENES.barn.map((r, i) => (
              <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill={r[4]} />
            ))}
          </MobileFarmBase>
        </div>
      </button>

      {/* dock */}
      <div style={{ display: 'flex', justifyContent: 'space-around', background: '#8B5A2B', borderTop: '3px solid #4A2F18', boxShadow: 'inset 2px 2px 0 #A9713C', padding: '10px 24px', marginTop: 16 }}>
        {(['contact', 'resume', 'github'] as const).map((id) => {
          const s = SECTIONS.find((x) => x.id === id)!
          return (
            <button key={id} type="button" className="farm-tile" onClick={() => farmActions.openApp(id)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, border: 0, background: 'transparent', cursor: 'pointer' }}>
              <span style={{ width: 48, height: 48, display: 'grid', placeItems: 'center', background: '#6E4523', boxShadow: bevelOut }}>
                <Icon href={s.icon} size={26} />
              </span>
              <span style={{ fontFamily: mono, fontSize: 9, color: '#F6E7C5' }}>{s.label}</span>
            </button>
          )
        })}
      </div>

      {/* footer strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', background: '#4A2F18', padding: '6px 16px 9px', fontFamily: mono, fontSize: 9, color: '#D9C49A' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F2C14E' }} />
          SELECT
        </span>
        <span>OJAN.FARM v2.0</span>
      </div>
    </div>
  )
}

function MobileFarm() {
  const farmPage = useFarm((s) => s.farmPage)
  const zone = ZONES[farmPage]
  const value = useFarm((s) => s.meters[zone.id])
  const tended = useFarm((s) => !!s.tended[zone.id])
  const helped = useFarm((s) => s.helped)
  const pulse = useZoneTend(zone.id)
  const full = value >= 50
  const chipBg = full ? '#F2C14E' : tended ? '#D9C49A' : zone.chip
  const chipFg = full || tended ? '#3B2A1A' : '#FFF'
  const chipLabel = full ? '⭐ HARVEST!' : tended ? '✓ TENDED · COME BACK LATER' : `${zone.action} +1`
  const copy = full
    ? 'The meter is full! Tap harvest to claim what everyone grew together.'
    : `${50 - value} more and it’s ready. Every visitor’s action counts — this place is shared by everyone who stops by.`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#8B5A2B', padding: '10px 14px', boxShadow: bevelOut }}>
        <button type="button" onClick={farmActions.goHome} style={{ border: 0, background: 'transparent', cursor: 'pointer', fontFamily: title, fontSize: 17, color: '#F6E7C5' }}>‹ THE FARM</button>
        <span style={{ fontFamily: mono, fontSize: 9, color: '#D9C49A' }}>{farmPage + 1} OF 4</span>
      </div>

      {/* scene + wandering pet */}
      <div style={{ position: 'relative', lineHeight: 0 }}>
        <MobileFarmBase style={{ display: 'block', width: '100%', height: 'auto' }}>
          {MOBILE_SCENES[zone.id].map((r, i) => (
            <rect key={i} x={r[0]} y={r[1]} width={r[2]} height={r[3]} fill={r[4]} />
          ))}
        </MobileFarmBase>
        <FarmPet key={zone.id} zone={zone.id} />
      </div>

      {/* page dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '10px 0' }}>
        {ZONES.map((_, i) => (
          <button key={i} type="button" onClick={() => farmActions.setFarmPage(i)} aria-label={`place ${i + 1}`} style={{ width: 10, height: 10, border: 0, cursor: 'pointer', background: i === farmPage ? '#4A2F18' : '#D9C49A' }} />
        ))}
      </div>

      {/* prev / next */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 14px', fontFamily: title, fontSize: 10, color: '#8B5A2B' }}>
        <button type="button" onClick={farmActions.prevPlace} style={{ border: 0, background: 'transparent', cursor: 'pointer', color: '#8B5A2B', fontFamily: title, fontSize: 10 }}>‹ {ZONE_ORDER[(farmPage + 3) % 4]}</button>
        <button type="button" onClick={farmActions.nextPlace} style={{ border: 0, background: 'transparent', cursor: 'pointer', color: '#8B5A2B', fontFamily: title, fontSize: 10 }}>{ZONE_ORDER[(farmPage + 1) % 4]} ›</button>
      </div>

      {/* zone panel */}
      <div style={{ margin: '12px 16px 0', background: '#8B5A2B', padding: 4, boxShadow: `3px 3px 0 rgba(0,0,0,.35), ${bevelOut}` }}>
        <div style={{ position: 'relative', background: '#F6E7C5', padding: '14px 16px', boxShadow: 'inset 0 0 0 2px #D9C49A' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: title, fontSize: 22, color: '#3B2A1A' }}>{zone.name}</span>
            <span style={{ fontFamily: mono, fontSize: 12, color: '#6E4523' }}>{value}/50</span>
          </div>
          <div style={{ fontFamily: mono, fontSize: 11, color: '#6E4523', margin: '2px 0 10px' }}>{zone.sub}</div>
          <div key={pulse} style={{ transformOrigin: 'left center', animation: pulse ? 'farm-tendPulse .32s ease-out' : undefined }}>
            <Meter value={value} color={full ? '#F2C14E' : zone.chip} />
          </div>
          <p style={{ fontFamily: body, fontSize: 14, lineHeight: 1.5, color: '#3B2A1A', margin: '10px 0 0' }}>{copy}</p>
          <TendBurst zone={zone.id} />
        </div>
      </div>

      {/* action */}
      <button type="button" className="farm-action" onClick={() => farmActions.tend(zone.id, zone.name)} style={{ margin: '16px 16px 0', minHeight: 48, border: 0, cursor: 'pointer', background: chipBg, color: chipFg, fontFamily: title, fontSize: 20, padding: 14, boxShadow: '3px 3px 0 rgba(0,0,0,.3)', animation: full ? 'farm-bob 1s ease-in-out infinite' : undefined }}>
        {chipLabel}
      </button>

      <div style={{ textAlign: 'center', fontFamily: mono, fontSize: 10, color: '#8B5A2B', padding: '10px 0' }}>{helped} VISITORS HELPED TODAY</div>

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', background: '#4A2F18', padding: '6px 16px 9px', fontFamily: mono, fontSize: 9, color: '#D9C49A' }}>
        <span>TAP ARROWS TO CHANGE PLACE</span>
        <button type="button" onClick={farmActions.goHome} style={{ border: 0, background: 'transparent', cursor: 'pointer', color: '#D9C49A', fontFamily: mono, fontSize: 9 }}>HOME ✕</button>
      </div>
    </div>
  )
}

function MobileApp() {
  const win = useFarm((s) => s.win)
  if (!win) return null
  const { title: winTitle, body: winBody } = WINDOW_CONTENT[win]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#8B5A2B', padding: '10px 14px', boxShadow: bevelOut }}>
        <button type="button" onClick={farmActions.goHome} style={{ border: 0, background: 'transparent', cursor: 'pointer', fontFamily: title, fontSize: 17, color: '#F6E7C5' }}>‹ {winTitle}</button>
        <button type="button" onClick={farmActions.goHome} style={{ border: 0, background: 'transparent', cursor: 'pointer', fontFamily: title, fontSize: 17, color: '#F6E7C5' }}>✕</button>
      </div>
      <div style={{ padding: 16, fontFamily: body, fontSize: 15, lineHeight: 1.6, color: '#3B2A1A', overflow: 'auto', flex: 1 }}>
        {winBody}
      </div>
    </div>
  )
}

export default function MobileExperience() {
  const mScreen = useFarm((s) => s.mScreen)
  const win = useFarm((s) => s.win)
  const screen = mScreen === 'farm' ? 'farm' : mScreen === 'app' && win ? 'app' : 'home'
  return (
    <div style={{ background: '#2A2118', minHeight: '100dvh', display: 'flex', justifyContent: 'center' }}>
      <IconSymbols />
      <div style={{ width: '100%', maxWidth: 440, minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: '#F6E7C5', overflow: 'hidden', position: 'relative' }}>
        <StatusStrip />
        {screen === 'home' && <MobileHome />}
        {screen === 'farm' && <MobileFarm />}
        {screen === 'app' && <MobileApp />}
      </div>
      <HarvestModal />
      <ShareModal />
      <Toast />
    </div>
  )
}
