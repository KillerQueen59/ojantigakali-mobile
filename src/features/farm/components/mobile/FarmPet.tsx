'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import PixelSprite from '../PixelSprite'

// Side-view chicken (faces right; flipped for leftward walking). Authored with the
// pixel-art grid method — comb + beak + wattle on the right, tail on the left.
const CHICK_ROWS = [
  '.......R.R.R....',
  '.K.....RRRRR....',
  '.KK..KKKKKKKK...',
  '.KWKKKWWWWWWWWK.',
  '.KWWWWWWWWWWEWKO',
  '.KWWWWWWWWWWWWKR',
  '.KWWWWWWWWWWWWK.',
  '..KwWWWWWWWWwK..',
  '..KwWWWWWWWWwK..',
  '...KKKKKKKKKK...',
  '.....K....K.....',
  '.....O....O.....',
  '.....O....O.....',
  '...OOO....OOO...',
]
const CHICK_PALETTE: Record<string, string> = {
  '.': 'transparent',
  K: '#2b2028',
  W: '#ffffff',
  w: '#d6d6e0',
  R: '#e42217',
  O: '#ffa300',
  E: '#000000',
}

type Mode = 'idle' | 'walk' | 'hop'

// Tap reactions — hearts weighted highest.
const EMOTES = [
  { ch: '♥', color: '#e74c3c' },
  { ch: '♥', color: '#e74c3c' },
  { ch: '♪', color: '#3e6fa8' },
  { ch: '✦', color: '#f2c14e' },
]

/**
 * A Talk-Tom / Pou-style pet: wanders the farm on its own, faces where it's going,
 * and reacts to taps with a squash-hop and floating hearts. Lives as an absolute
 * overlay above the farm scene.
 */
export default function FarmPet({ pixel = 3 }: { pixel?: number }) {
  const [x, setX] = useState(28) // horizontal position, % of the lane
  const [facing, setFacing] = useState<1 | -1>(1)
  const [mode, setMode] = useState<Mode>('idle')
  const [dur, setDur] = useState(3) // seconds for the current stroll
  const [emotes, setEmotes] = useState<{ id: number; ch: string; color: string }[]>([])

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const heartId = useRef(0)
  const xRef = useRef(x)
  xRef.current = x
  const petting = useRef(false)

  const track = (t: ReturnType<typeof setTimeout>) => {
    timers.current.push(t)
    return t
  }

  // Autonomous wander loop: idle a beat, stroll to a new spot, repeat.
  useEffect(() => {
    let active = true
    const stroll = () => {
      if (!active) return
      setMode('idle')
      track(
        setTimeout(
          () => {
            if (!active || petting.current) {
              track(setTimeout(stroll, 600))
              return
            }
            const from = xRef.current
            const target = 8 + Math.random() * 76 // keep inside 8–84%
            const dist = Math.abs(target - from)
            setFacing(target >= from ? 1 : -1)
            setDur(Math.max(1.2, dist * 0.06))
            setX(target)
            setMode('walk')
            track(setTimeout(stroll, Math.max(1200, dist * 60)))
          },
          700 + Math.random() * 1700,
        ),
      )
    }
    stroll()
    return () => {
      active = false
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  const pet = useCallback(() => {
    petting.current = true
    setMode('hop')
    const id = ++heartId.current
    const emote = EMOTES[Math.floor(Math.random() * EMOTES.length)]
    setEmotes((e) => [...e, { id, ...emote }])
    track(setTimeout(() => setEmotes((e) => e.filter((v) => v.id !== id)), 900))
    track(
      setTimeout(() => {
        setMode((m) => (m === 'hop' ? 'idle' : m))
        petting.current = false
      }, 440),
    )
  }, [])

  const animation =
    mode === 'walk'
      ? 'farm-petWalk .5s ease-in-out infinite'
      : mode === 'hop'
        ? 'farm-petHop .44s ease-out'
        : 'farm-petIdle 2.4s ease-in-out infinite'

  return (
    <button
      type="button"
      aria-label="Pet the chicken"
      onClick={pet}
      style={{
        position: 'absolute',
        bottom: '7%',
        left: `${x}%`,
        transform: 'translateX(-50%)',
        transition: `left ${dur}s linear`,
        border: 0,
        background: 'transparent',
        padding: 10,
        margin: 0,
        cursor: 'pointer',
        lineHeight: 0,
        zIndex: 2,
      }}
    >
      <div style={{ position: 'relative' }}>
        {emotes.map((e) => (
          <span
            key={e.id}
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '100%',
              fontSize: 15,
              color: e.color,
              animation: 'farm-heartFloat .9s ease-out forwards',
              pointerEvents: 'none',
            }}
          >
            {e.ch}
          </span>
        ))}
        {/* facing flip on the outer layer, the mode animation on the inner, so they compose */}
        <div style={{ transform: `scaleX(${facing})`, transformOrigin: 'center bottom' }}>
          <div style={{ animation, transformOrigin: 'center bottom' }}>
            <PixelSprite rows={CHICK_ROWS} palette={CHICK_PALETTE} pixel={pixel} />
          </div>
        </div>
      </div>
    </button>
  )
}
