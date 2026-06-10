'use client'

import { useEffect, useRef } from 'react'

/**
 * Water on paper.
 *
 * Not a ripple ring (those read as hard CSS rings and break the spell) but a
 * damp stain: a drop lands, the warmth of the ink soaks outward, blooms, then
 * slowly dries. Softness is guaranteed structurally — the field is drawn into a
 * deliberately low-resolution buffer and scaled up, so every edge is already
 * blurred before CSS adds a little more. Ink-tinted, very low alpha: wet paper
 * is darker paper.
 */

interface Drop {
  x: number       // 0..1 of width
  y: number       // 0..1 of height
  born: number    // ms
  life: number    // ms
  maxR: number    // px (in buffer space)
  seal: boolean   // a rare cinnabar drop
  squash: number  // slight ellipticity, so no blob is a perfect circle
  tilt: number    // rotation of the ellipse
}

const INK = '24, 20, 17'        // warm ink, matches --foreground
const SEAL = '198, 63, 44'      // cinnabar, matches --seal

export default function RippleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // Low-res backing buffer — the source of the softness. Capped small.
    const SCALE = 0.34
    let w = 0
    let h = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width * SCALE))
      h = Math.max(1, Math.round(rect.height * SCALE))
      canvas.width = w
      canvas.height = h
    }
    resize()

    const drops: Drop[] = []

    const spawn = (t: number, seedX?: number, seedY?: number) => {
      const minDim = Math.min(w, h)
      drops.push({
        x: seedX ?? Math.random(),
        y: seedY ?? Math.random(),
        born: t,
        life: 9000 + Math.random() * 7000,
        maxR: minDim * (0.34 + Math.random() * 0.42),
        seal: Math.random() < 0.14,
        squash: 0.78 + Math.random() * 0.4,
        tilt: Math.random() * Math.PI,
      })
    }

    // easeOutCubic — water spreads quickly, then settles.
    const easeOut = (p: number) => 1 - Math.pow(1 - p, 3)

    const paint = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const d of drops) {
        const p = (now - d.born) / d.life
        if (p < 0 || p > 1) continue

        const r = d.maxR * easeOut(p)
        if (r <= 0) continue

        // Bloom in, then a long dry-down. Peak alpha is deliberately tiny.
        const env = Math.pow(Math.sin(Math.PI * p), 1.1)
        const peak = d.seal ? 0.085 : 0.065
        const a = peak * env
        if (a < 0.001) continue

        ctx.save()
        ctx.translate(d.x * w, d.y * h)
        ctx.rotate(d.tilt)
        ctx.scale(1, d.squash)

        const tint = d.seal ? SEAL : INK
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r)
        // Denser at the heart, dissolving to nothing — a filled stain, no ring.
        g.addColorStop(0, `rgba(${tint}, ${a})`)
        g.addColorStop(0.45, `rgba(${tint}, ${a * 0.45})`)
        g.addColorStop(1, `rgba(${tint}, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(0, 0, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      // Retire finished drops.
      for (let i = drops.length - 1; i >= 0; i--) {
        if ((now - drops[i].born) / drops[i].life > 1) drops.splice(i, 1)
      }
    }

    let raf = 0
    let last = performance.now()
    let nextSpawn = last + 600

    if (reduce) {
      // Hold a few still stains — the bloom is implied, not animated.
      const t = performance.now()
      spawn(t - 5000, 0.28, 0.34)
      spawn(t - 8000, 0.7, 0.62)
      spawn(t - 3000, 0.52, 0.2)
      paint(t)
    } else {
      // A gentle starting state so the first paint isn't empty.
      const t0 = performance.now()
      spawn(t0 - 4000, 0.3, 0.4)
      spawn(t0 - 7000, 0.68, 0.6)

      const loop = (now: number) => {
        if (now >= nextSpawn) {
          spawn(now)
          nextSpawn = now + 2400 + Math.random() * 2600
        }
        paint(now)
        last = now
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ filter: 'blur(5px)', opacity: 0.92 }}
    />
  )
}
