// Procedural stone imagery — realistic marble veining + granite speckle using
// SVG turbulence filters. Self-contained (no external photos), scalable, and
// rasterized by the browser when used in <img>. Swap for real product photos
// anytime by keeping the same filenames in /public/stone.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const out = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public/stone')
mkdirSync(out, { recursive: true })

const W = 1600
const H = 1200

// ── Marble: sparse organic veins composited over a clean base ────────────
// Low-frequency fractal noise, displaced for an organic flow, then a steep
// threshold extracts thin branching veins (not dense streaks).
function marble({ base, vein, bx = 0.011, by = 0.016, octaves = 4, seed = 1, alpha = -3.4, offset = 1.7 }) {
  return `
  <filter id="f" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="${seed * 3}" result="warp"/>
    <feTurbulence type="fractalNoise" baseFrequency="${bx} ${by}" numOctaves="${octaves}" seed="${seed}" result="n"/>
    <feDisplacementMap in="n" in2="warp" scale="120" xChannelSelector="R" yChannelSelector="G" result="dn"/>
    <feColorMatrix in="dn" type="matrix"
      values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${alpha} ${offset}" result="a"/>
    <feGaussianBlur in="a" stdDeviation="0.6" result="ab"/>
    <feFlood flood-color="${vein}" result="vc"/>
    <feComposite in="vc" in2="ab" operator="in" result="veins"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="veins"/></feMerge>
  </filter>`
}

// ── Granite / stone speckle: fine fractal noise overlay ──────────────────
function speckle({ seed = 1, freq = 0.85, octaves = 4 }) {
  return `
  <filter id="f" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${octaves}" seed="${seed}" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0" result="g"/>
    <feComponentTransfer in="g" result="c">
      <feFuncA type="linear" slope="0.5" intercept="-0.05"/>
    </feComponentTransfer>
    <feComposite in="c" in2="SourceGraphic" operator="over"/>
  </filter>`
}

// ── Travertine: soft horizontal banding ──────────────────────────────────
function banded({ seed = 1 }) {
  return `
  <filter id="f" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.004 0.09" numOctaves="5" seed="${seed}" result="n"/>
    <feColorMatrix in="n" type="matrix"
      values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.8 -0.1" result="a"/>
    <feFlood flood-color="#9d8f72" result="vc"/>
    <feComposite in="vc" in2="a" operator="in" result="bands"/>
    <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="bands"/></feMerge>
  </filter>`
}

// finish overlay: polished adds a faint diagonal sheen, raw adds a matte veil
function finishOverlay(finish) {
  if (finish === 'polished') {
    return `<rect width="${W}" height="${H}" fill="url(#sheen)"/>`
  }
  if (finish === 'raw') {
    return `<rect width="${W}" height="${H}" fill="#8a8a86" opacity="0.22"/>
            <rect width="${W}" height="${H}" fill="#000" opacity="0.05"/>`
  }
  return ''
}

function svg(base, filterDef, finish = 'slab') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    ${filterDef}
    <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="0.45" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.07"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${base}" filter="url(#f)"/>
  ${finishOverlay(finish)}
</svg>`
}

// Material catalogue ------------------------------------------------------
const materials = {
  carrara:    { base: '#F1F0EC', build: (s) => marble({ base: '#F1F0EC', vein: '#8f8f8b', seed: s }) },
  calacatta:  { base: '#EFEBE2', build: (s) => marble({ base: '#EFEBE2', vein: '#8c7d5c', bx: 0.009, by: 0.013, seed: s }) },
  nero:       { base: '#161616', build: (s) => marble({ base: '#161616', vein: '#7a7468', alpha: 3.0, offset: -1.0, seed: s }) },
  graphite:   { base: '#3b3c3f', build: (s) => speckle({ seed: s, freq: 0.8 }) },
  silver:     { base: '#b7b8b4', build: (s) => speckle({ seed: s, freq: 0.9 }) },
  basalt:     { base: '#26262a', build: (s) => speckle({ seed: s, freq: 1.1, octaves: 3 }) },
  travertine: { base: '#cabfa6', build: (s) => banded({ seed: s }) },
}

// before/after pairs (raw → polished) for the gallery
let count = 0
for (const [name, m] of Object.entries(materials)) {
  writeFileSync(resolve(out, `${name}-raw.svg`), svg(m.base, m.build(count + 1), 'raw'))
  writeFileSync(resolve(out, `${name}-polished.svg`), svg(m.base, m.build(count + 21), 'polished'))
  writeFileSync(resolve(out, `${name}.svg`), svg(m.base, m.build(count + 41), 'slab'))
  count++
}

// Hero slab
writeFileSync(resolve(out, 'hero.svg'), svg('#EFEBE2', marble({ base: '#EFEBE2', vein: '#7d7158', bx: 0.008, by: 0.012, seed: 7 }), 'polished'))

console.log(`Generated ${Object.keys(materials).length * 3 + 1} stone images in public/stone`)
