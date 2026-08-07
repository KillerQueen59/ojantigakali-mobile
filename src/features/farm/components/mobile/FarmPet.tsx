'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { ZoneId } from '../../data/cards'
import { PETS } from '../../data/pets'
import PixelSprite from '../PixelSprite'

type Mode = 'idle' | 'move' | 'hop'

const LABEL: Record<ZoneId, string> = {
  coop: 'chicken',
  barn: 'cow',
  crop: 'rabbit',
  orchard: 'butterfly',
}

/**
 * A Talk-Tom / Pou-style pet, one per farm place. Ground critters (chicken, cow,
 * rabbit) wander a lane and face where they're going; the orchard butterfly roams
 * in 2D. All idle/breathe and react to taps with a squash-hop + floating emote.
 * Give it a `key={zone}` so switching places gives a clean new critter.
 */
export default function FarmPet({ zone }: { zone: ZoneId }) {
  const pet = PETS[zone]
  const [x, setX] = useState(pet.flies ? 24 : 28) // % across the lane
  const [y, setY] = useState(30) // % up (flyers only)
  const [facing, setFacing] = useState<1 | -1>(1)
  const [mode, setMode] = useState<Mode>('idle')
  const [dur, setDur] = useState(3)
  const [emotes, setEmotes] = useState<{ id: number; ch: string; color: string }[]>([])

  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const emoteId = useRef(0)
  const xRef = useRef(x)
  xRef.current = x
  const busy = useRef(false)

  const track = (t: ReturnType<typeof setTimeout>) => {
    timers.current.push(t)
    return t
  }

  useEffect(() => {
    let active = true
    const stroll = () => {
      if (!active) return
      setMode('idle')
      track(
        setTimeout(
          () => {
            if (!active || busy.current) {
              track(setTimeout(stroll, 600))
              return
            }
            const from = xRef.current
            const target = (pet.flies ? 10 : 8) + Math.random() * (pet.flies ? 70 : 76)
            const dist = Math.abs(target - from)
            setFacing(target >= from ? 1 : -1)
            const seconds = Math.max(1, dist * pet.speed)
            setDur(seconds)
            setX(target)
            if (pet.flies) setY(18 + Math.random() * 40)
            setMode('move')
            track(setTimeout(stroll, Math.max(1100, seconds * 1000)))
          },
          600 + Math.random() * 1600,
        ),
      )
    }
    stroll()
    return () => {
      active = false
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [pet])

  const play = useCallback(() => {
    busy.current = true
    setMode('hop')
    const id = ++emoteId.current
    const e = pet.emotes[Math.floor(Math.random() * pet.emotes.length)]
    setEmotes((v) => [...v, { id, ...e }])
    track(setTimeout(() => setEmotes((v) => v.filter((k) => k.id !== id)), 900))
    track(
      setTimeout(() => {
        setMode((m) => (m === 'hop' ? 'idle' : m))
        busy.current = false
      }, 460),
    )
  }, [pet])

  const animation = pet.flies
    ? mode === 'hop'
      ? 'farm-petHop .44s ease-out'
      : 'farm-flutter 1.3s ease-in-out infinite'
    : mode === 'hop'
      ? 'farm-petHop .44s ease-out'
      : mode === 'move'
        ? pet.move === 'hop'
          ? 'farm-petHopLoop .6s ease-in-out infinite'
          : 'farm-petWalk .5s ease-in-out infinite'
        : 'farm-petIdle 2.4s ease-in-out infinite'

  return (
    <button
      type="button"
      aria-label={`Play with the ${LABEL[zone]}`}
      onClick={play}
      style={{
        position: 'absolute',
        bottom: pet.flies ? `${y}%` : `${pet.bottom}%`,
        left: `${x}%`,
        transform: 'translateX(-50%)',
        transition: pet.flies
          ? `left ${dur}s ease-in-out, bottom ${dur}s ease-in-out`
          : `left ${dur}s linear`,
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
        <div style={{ transform: `scaleX(${facing})`, transformOrigin: 'center bottom' }}>
          <div style={{ animation, transformOrigin: 'center bottom' }}>
            <PixelSprite rows={pet.rows} palette={pet.palette} pixel={pet.pixel} />
          </div>
        </div>
      </div>
    </button>
  )
}
