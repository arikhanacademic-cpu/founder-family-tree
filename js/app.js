// Founder Family Tree — 3D scene, time-lapse, mafia mode, search, filters, sources.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const D = window.FFT_DATA;
const Q = new URLSearchParams(location.search);
const CAPTURE = Q.has('capture');
if (CAPTURE) document.body.classList.add('capture');

// ───────────────────────── constants ─────────────────────────
const Y0 = 2002, Y_END = 2026 + 9.5 / 12; // mid-Oct 2026
const PARENT_FOUNDED = { Meta: 2004, Google: 1998, DeepMind: 2010, PayPal: 1998, Stripe: 2010, Revolut: 2015 };
const C = {
  gold: new THREE.Color(0xffc94a), green: new THREE.Color(0x4cf2a6), blue: new THREE.Color(0x59adff),
  ember: new THREE.Color(0xff6a3d), trunk: new THREE.Color(0xc9dcff), branch: new THREE.Color(0x7d9bd6)
};
const CSSC = { gold: '#ffc94a', green: '#4cf2a6', blue: '#59adff', ember: '#ff6a3d' };
const R_RING = 62;
const Yh = y => 3 + (y - Y0) * 1.55;
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutBack = t => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
const hash = (s) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return ((h >>> 0) % 10000) / 10000; };
const fmt = v => v == null ? '—' : v >= 1e12 ? `$${(v / 1e12).toFixed(2)}T` : v >= 1e9 ? `$${(v / 1e9).toFixed(v >= 1e11 ? 0 : 1)}B` : `$${Math.round(v / 1e6)}M`;
const esc = s => String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
const $ = id => document.getElementById(id);

// ───────────────────────── data prep ─────────────────────────
const parents = D.parents.map((p, i) => {
  const a = -Math.PI / 2 + i * (Math.PI * 2 / D.parents.length);
  return { ...p, i, a, pos: new THREE.Vector3(Math.cos(a) * R_RING, 0, Math.sin(a) * R_RING), founded: PARENT_FOUNDED[p.id] };
});
const P = Object.fromEntries(parents.map(p => [p.id, p]));
const S = D.startups.map((s, i) => {
  const ps = [...new Set(s.founders.flatMap(f => f.p))].sort((a, b) => P[a].i - P[b].i);
  const ipo = s.events.find(e => e[1] === 'ipo');
  const goldYear = Math.min(ipo ? ipo[0] : Infinity, s.unicorn ? (s.valueYear ?? Infinity) : Infinity);
  return { ...s, i, id: s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), parents: ps, goldYear };
});
const byName = Object.fromEntries(S.map(s => [s.name, s]));
const isGoldFinal = s => s.goldYear !== Infinity;
const uniqueFounders = new Set(S.flatMap(s => s.founders.map(f => f.n)));

function valueSum(list) {
  const names = new Set(list.map(s => s.name));
  return list.filter(s => s.value && !(s.absorbedInto && names.has(s.absorbedInto))).reduce((a, s) => a + s.value, 0);
}

// ───────────────────────── renderer ─────────────────────────
const stage = $('stage');
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance', preserveDrawingBuffer: CAPTURE });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, CAPTURE ? 1 : 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
stage.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer({ element: $('labels') });

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03050a);
scene.fog = new THREE.FogExp2(0x03050a, 0.0052);

const camera = new THREE.PerspectiveCamera(42, 1, 0.5, 2000);
camera.position.set(150, 60, 150);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.06;
controls.minDistance = 12; controls.maxDistance = 330; controls.maxPolarAngle = Math.PI * 0.53;
controls.target.set(0, 20, 0);
controls.enabled = false;

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.85, 0.55, 0.42);
composer.addPass(bloom);
composer.addPass(new OutputPass());

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h); composer.setSize(w, h); labelRenderer.setSize(w, h);
  camera.aspect = w / h;
  camera.fov = w / h < 0.8 ? 58 : 42;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize); resize();

// ───────────────────────── textures ─────────────────────────
function canvasTex(size, draw) {
  const c = document.createElement('canvas'); c.width = c.height = size;
  draw(c.getContext('2d'), size); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const TEX_GLOW = canvasTex(128, (g, s) => {
  const r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(.18, 'rgba(255,255,255,.55)'); r.addColorStop(.45, 'rgba(255,255,255,.12)'); r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r; g.fillRect(0, 0, s, s);
});
const TEX_RING = canvasTex(128, (g, s) => {
  g.strokeStyle = '#fff'; g.lineWidth = 5; g.beginPath(); g.arc(s / 2, s / 2, s / 2 - 8, 0, Math.PI * 2); g.stroke();
});
const TEX_DOT = canvasTex(32, (g, s) => {
  const r = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = r; g.fillRect(0, 0, s, s);
});

// ───────────────────────── environment ─────────────────────────
{ // stars
  const n = 2600, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = Math.random(), v = Math.random(), th = u * Math.PI * 2, ph = Math.acos(2 * v - 1) * 0.62, r = 520 + Math.random() * 400;
    pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph) - 60, r * Math.sin(ph) * Math.sin(th)], i * 3);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const m = new THREE.PointsMaterial({ size: 1.6, sizeAttenuation: false, color: 0x9fb4ff, transparent: true, opacity: 0.65, fog: false, map: TEX_DOT, depthWrite: false });
  scene.add(new THREE.Points(g, m));
}
const dust = (() => {
  const n = 700, pos = new Float32Array(n * 3), seed = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const r = Math.sqrt(Math.random()) * 125, a = Math.random() * Math.PI * 2;
    pos.set([Math.cos(a) * r, Math.random() * 70, Math.sin(a) * r], i * 3); seed[i] = Math.random();
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const m = new THREE.PointsMaterial({ size: 0.45, color: 0x8fb0ff, transparent: true, opacity: 0.55, map: TEX_DOT, depthWrite: false, blending: THREE.AdditiveBlending });
  const p = new THREE.Points(g, m); scene.add(p); return { p, pos, seed, n };
})();
{ // ground: polar grid + glow pool
  const grid = new THREE.PolarGridHelper(132, 12, 9, 96, 0x2a3a5c, 0x1a2540);
  grid.material.transparent = true; grid.material.opacity = 0.35; grid.position.y = -0.05; scene.add(grid);
  const pool = new THREE.Mesh(new THREE.CircleGeometry(150, 64), new THREE.MeshBasicMaterial({ map: TEX_GLOW, color: 0x14203f, transparent: true, opacity: 0.4, depthWrite: false }));
  pool.rotation.x = -Math.PI / 2; pool.position.y = -0.1; scene.add(pool);
}

// ───────────────────────── trunks ─────────────────────────
const TRUNK_H = 46;
parents.forEach(p => {
  const pts = [];
  for (let k = 0; k <= 10; k++) {
    const y = -1 + (k / 10) * (TRUNK_H + 1), w = 0.9 * (1 - k / 14);
    pts.push(new THREE.Vector3(p.pos.x + Math.sin(k * 1.1 + p.i) * w, y, p.pos.z + Math.cos(k * 0.9 + p.i * 2) * w));
  }
  p.curve = new THREE.CatmullRomCurve3(pts);
  const mk = (rad, color, op, add) => {
    const g = new THREE.TubeGeometry(p.curve, 80, rad, 12, false);
    const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op, depthWrite: !add, blending: add ? THREE.AdditiveBlending : THREE.NormalBlending });
    const mesh = new THREE.Mesh(g, m); scene.add(mesh); return mesh;
  };
  p.core = mk(0.55, C.trunk.clone().multiplyScalar(0.62), 1, false);
  p.glow = mk(1.5, C.trunk.clone().multiplyScalar(0.18), 0.3, true);
  p.idxCount = p.core.geometry.index.count;
  // roots
  p.roots = [];
  for (let r = 0; r < 7; r++) {
    const a = p.a + (r - 3) * 0.55 + Math.PI * (r % 2 ? 0.0 : 1) * 0.08, len = 6 + hash(p.id + r) * 9;
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(p.pos.x, 1.4, p.pos.z),
      new THREE.Vector3(p.pos.x + Math.cos(a) * len * 0.4, 0.3, p.pos.z + Math.sin(a) * len * 0.4),
      new THREE.Vector3(p.pos.x + Math.cos(a + 0.2) * len, 0.05, p.pos.z + Math.sin(a + 0.2) * len)]);
    const m = new THREE.Mesh(new THREE.TubeGeometry(c, 20, 0.28, 6, false), new THREE.MeshBasicMaterial({ color: C.trunk.clone().multiplyScalar(0.35), transparent: true, opacity: 0.8 }));
    scene.add(m); p.roots.push(m);
  }
  // growing tip
  p.tip = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX_GLOW, color: 0xdfe9ff, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  p.tip.scale.setScalar(5); scene.add(p.tip);
  // label
  const el = document.createElement('div'); el.className = 'plabel';
  const n = S.filter(s => s.parents.includes(p.id)).length;
  el.innerHTML = `${esc(p.label)}<small>${n} STARTUPS</small>`;
  p.labelEl = el;
  p.label3d = new CSS2DObject(el); p.label3d.position.copy(p.pos.clone().multiplyScalar(1.16)).setY(-2); scene.add(p.label3d);
});

// ───────────────────────── leaves & branches ─────────────────────────
const SPHERE = new THREE.SphereGeometry(1, 32, 16);
// layout
parents.forEach(p => {
  const solo = S.filter(s => s.parents.length === 1 && s.parents[0] === p.id).sort((a, b) => a.year - b.year || a.name.localeCompare(b.name));
  solo.forEach((s, k) => {
    const n = solo.length, u = (k + 0.5) / n;
    const phi = p.a + (u - 0.5) * 2.5 + (hash(s.name) - 0.5) * 0.25;
    const r = 13 + ((k * 0.618 + hash(s.name + 'r')) % 1) * 13;
    s.leafPos = new THREE.Vector3(p.pos.x + Math.cos(phi) * r, Yh(s.year) + 3 + hash(s.name + 'y') * 4, p.pos.z + Math.sin(phi) * r);
  });
});
const groups = {};
S.filter(s => s.parents.length > 1).forEach(s => { (groups[s.parents.join('+')] ||= []).push(s); });
Object.values(groups).forEach(list => {
  list.sort((a, b) => a.year - b.year);
  list.forEach((s, k) => {
    const c = new THREE.Vector3(); s.parents.forEach(id => c.add(P[id].pos)); c.divideScalar(s.parents.length);
    const tang = new THREE.Vector3(-c.z, 0, c.x).normalize();
    const radial = c.clone().setY(0).normalize();
    const off = (k - (list.length - 1) / 2) * 7;
    s.leafPos = c.clone().addScaledVector(tang, off).addScaledVector(radial, 6 + hash(s.name) * 6).setY(Yh(s.year) + 9 + hash(s.name + 'y') * 3);
  });
});

const hitMeshes = [];
S.forEach(s => {
  s.mat = new THREE.MeshBasicMaterial({ color: C.green.clone(), transparent: true, opacity: 1 });
  s.core = new THREE.Mesh(SPHERE, s.mat); s.core.position.copy(s.leafPos); scene.add(s.core);
  s.halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX_GLOW, color: C.green.clone(), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  s.halo.position.copy(s.leafPos); scene.add(s.halo);
  s.ring = new THREE.Sprite(new THREE.SpriteMaterial({ map: TEX_RING, color: C.blue.clone(), transparent: true, opacity: 0, depthWrite: false }));
  s.ring.position.copy(s.leafPos); scene.add(s.ring);
  s.hit = new THREE.Mesh(SPHERE, new THREE.MeshBasicMaterial({ visible: false })); s.hit.position.copy(s.leafPos); s.hit.userData.s = s; scene.add(s.hit); hitMeshes.push(s.hit);
  // label
  const wrap = document.createElement('div'); const el = document.createElement('div'); el.className = 'llabel'; wrap.appendChild(el);
  el.innerHTML = `<span>${esc(s.name)}</span>`; s.labelEl = el;
  s.label3d = new CSS2DObject(wrap); s.label3d.position.copy(s.leafPos); scene.add(s.label3d);
  // branches, one per parent
  s.branches = s.parents.map(pid => {
    const p = P[pid];
    const T = p.curve.getPoint(clamp((Yh(s.year) + 1) / (TRUNK_H + 1), 0, 1));
    const L = s.leafPos;
    const out = L.clone().sub(T); out.y = 0;
    const m1 = T.clone().lerp(L, 0.33).add(new THREE.Vector3(0, 2.5 + out.length() * 0.06, 0));
    const m2 = T.clone().lerp(L, 0.7).add(new THREE.Vector3(0, 1.5, 0));
    const curve = new THREE.CatmullRomCurve3([T, m1, m2, L]);
    const rad = s.parents.length > 1 ? 0.24 : 0.2;
    const geo = new THREE.TubeGeometry(curve, 44, rad, 6, false);
    const mat = new THREE.MeshBasicMaterial({ color: C.branch.clone(), transparent: true, opacity: 0.9, depthWrite: false });
    const mesh = new THREE.Mesh(geo, mat); scene.add(mesh);
    return { mesh, mat, total: geo.index.count, curve, pid };
  });
  // embers for shutdowns
  if (s.status === 'shutdown') {
    const n = 46, g = new THREE.BufferGeometry(), pos = new Float32Array(n * 3);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    s.embers = { pts: new THREE.Points(g, new THREE.PointsMaterial({ size: 0.55, map: TEX_DOT, color: C.ember, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })), pos, n, seeds: Array.from({ length: n }, (_, i) => [hash(s.name + i), hash(s.name + 'b' + i), hash(s.name + 'c' + i)]) };
    scene.add(s.embers.pts);
  }
  s.r = 1; s.w = 1; s.wT = 1;
});

// ───────────────────────── app state ─────────────────────────
const state = {
  mode: 'title', year: Y_END, playing: false, sizeBy: 'funding', mafia: null, selected: null, hover: null,
  sectors: new Set(), countries: new Set(), autoOrbit: true, orbitA: 0.7, time: 0, tween: null, labelsAll: false
};

function targetRadius(s) {
  const v = state.sizeBy === 'funding' ? s.funding : s.value;
  return v ? 1.0 + 0.62 * Math.log10(v / 1e7) : 0.75;
}
function passesFilter(s) {
  if (state.sectors.size && !state.sectors.has(s.sector)) return false;
  if (state.countries.size && !state.countries.has(s.country)) return false;
  if (state.mafia && !s.parents.includes(state.mafia)) return false;
  return true;
}

function statusAt(s, t) {
  let last = null;
  for (const e of s.events) if (t >= e[0] + 0.3) last = e[1];
  const gold = t >= s.goldYear + 0.3;
  if (last === 'shut') return { col: 'ember', ring: null, gold: false, last };
  if (gold) return { col: 'gold', ring: last === 'acq' ? 'blue' : null, gold, last };
  if (last === 'acq') return { col: 'blue', ring: null, gold, last };
  return { col: 'green', ring: null, gold, last };
}
function statusLabel(s) {
  const st = statusAt(s, Y_END);
  const base = { active: 'Active', acquired: 'Acquired', ipo: 'Public', shutdown: 'Shut down' }[s.status];
  if (s.status === 'ipo') return 'IPO · Public';
  if (st.gold && s.status === 'acquired') return 'Unicorn · Acquired';
  if (st.gold) return 'Unicorn · ' + base;
  return base;
}

// ───────────────────────── per-frame scene update ─────────────────────────
const tmpC = new THREE.Color();
function updateScene(dt) {
  const t = state.year;
  parents.forEach(p => {
    const vis = t >= p.founded;
    let h = p.founded <= Y0 ? Yh(t) + 6 : Math.min(Yh(t) + 6, (t - p.founded) * 14);
    h = clamp(h, 0, TRUNK_H);
    const frac = h / (TRUNK_H + 1);
    const cnt = Math.floor(frac * 80) * 12 * 6;
    p.core.geometry.setDrawRange(0, vis ? cnt : 0); p.glow.geometry.setDrawRange(0, vis ? cnt : 0);
    p.roots.forEach(r => r.visible = vis);
    p.tip.visible = vis && h > 0.5;
    p.tip.position.copy(p.curve.getPoint(clamp(frac, 0, 1)));
    p.tip.material.opacity = 0.6 + 0.4 * Math.sin(state.time * 2 + p.i);
    const dim = state.mafia && state.mafia !== p.id ? 0.18 : 1;
    p.dim = THREE.MathUtils.lerp(p.dim ?? 1, dim, 1 - Math.pow(0.002, dt));
    p.core.material.opacity = 0.2 + 0.8 * p.dim; p.glow.material.opacity = 0.3 * p.dim;
    p.labelEl.style.opacity = vis ? (0.35 + 0.65 * p.dim) : 0;
  });

  S.forEach(s => {
    const age = t - s.year;
    const vis = age >= 0;
    const grow = clamp(age / 0.7);
    s.wT = passesFilter(s) || state.selected === s ? 1 : 0.07;
    s.w = THREE.MathUtils.lerp(s.w, s.wT, 1 - Math.pow(0.001, dt));
    s.r = THREE.MathUtils.lerp(s.r, targetRadius(s), 1 - Math.pow(0.01, dt));
    const st = statusAt(s, t);
    const col = C[st.col];
    // bloom pulse at gold transition
    const dg = t - (s.goldYear + 0.3);
    const pulse = st.gold ? Math.exp(-Math.pow(dg * 4, 2)) : 0;
    const dEv = s.events.length ? Math.min(...s.events.map(e => Math.abs(t - (e[0] + 0.3)))) : 9;
    const evPulse = Math.exp(-Math.pow(dEv * 5, 2)) * 0.5;
    // fall for shutdowns
    let fall = 0, fallF = 0;
    if (st.col === 'ember') { const se = s.events.find(e => e[1] === 'shut')[0] + 0.3; fallF = clamp((t - se) / 1.4); fall = (ease(fallF)) * (s.leafPos.y - 0.8); }
    const scl = vis ? easeOutBack(grow) * s.r * (1 + pulse * 0.9 + evPulse) : 0.0001;
    const pos = s.leafPos.clone(); pos.y -= fall;
    if (fallF > 0) { pos.x += Math.sin(fallF * 6 + s.i) * fallF * 1.5; }
    s.core.position.copy(pos); s.halo.position.copy(pos); s.ring.position.copy(pos); s.label3d.position.copy(pos); s.hit.position.copy(pos);
    s.core.scale.setScalar(scl); s.hit.scale.setScalar(Math.max(scl * 1.7, vis ? 2.4 : 0.0001));
    const emberDim = st.col === 'ember' ? 0.45 : 1;
    const strength = (st.col === 'gold' ? 1.6 : 1.25) * emberDim;
    tmpC.copy(col).multiplyScalar(strength);
    s.mat.color.lerp(tmpC, 1 - Math.pow(0.0005, dt));
    s.mat.opacity = Math.pow(s.w, 1.4) * (vis ? 1 : 0) * (st.col === 'ember' ? 0.75 : 1);
    s.halo.material.color.copy(s.mat.color);
    s.halo.scale.setScalar(scl * (st.col === 'gold' ? 5.2 : 3.8) * (1 + pulse * 1.6));
    s.halo.material.opacity = s.w * s.w * (vis ? 0.7 : 0) * emberDim;
    s.ring.material.opacity = st.ring && vis ? 0.9 * s.w : 0;
    if (st.ring) s.ring.material.color.copy(C[st.ring]);
    s.ring.scale.setScalar(scl * 3.3);
    const sel = state.selected === s;
    if (sel) { s.ring.material.opacity = 1; s.ring.material.color.copy(C.trunk); s.ring.scale.setScalar(scl * (3.6 + Math.sin(state.time * 4) * 0.35)); }
    // branches
    s.branches.forEach(b => {
      const bp = clamp(age / 0.55);
      b.mesh.geometry.setDrawRange(0, vis ? Math.floor(bp * 44) * 6 * 6 : 0);
      tmpC.copy(C.branch).lerp(col, 0.4).multiplyScalar(s.parents.length > 1 ? 0.75 : 0.5);
      b.mat.color.copy(tmpC);
      b.mat.opacity = s.w * (st.col === 'ember' ? 0.18 : 0.85) * (state.mafia && b.pid !== state.mafia && s.wT === 1 ? 0.6 : 1);
    });
    // embers
    if (s.embers) {
      const e = s.embers, on = st.col === 'ember';
      e.pts.material.opacity = on ? clamp(1.2 - fallF * 0.7) * s.w : 0;
      for (let i = 0; i < e.n; i++) {
        const [a, b, c] = e.seeds[i];
        const life = (state.time * (0.25 + a * 0.35) + b) % 1;
        const spread = 1 + life * 5;
        e.pos[i * 3] = pos.x + Math.cos(a * 40) * spread * c;
        e.pos[i * 3 + 1] = pos.y + life * (6 + b * 6) - (on ? 0 : 999);
        e.pos[i * 3 + 2] = pos.z + Math.sin(b * 40) * spread * c;
      }
      e.pts.geometry.attributes.position.needsUpdate = true;
    }
    // labels
    const showLbl = vis && s.w > 0.5 && (state.labelsAll || sel || state.hover === s || (state.mafia && s.wT === 1) || (state.sectors.size + state.countries.size > 0 && s.wT === 1));
    s.labelEl.classList.toggle('on', showLbl);
    s.labelEl.style.color = CSSC[st.col];
  });

  // dust drift
  const dp = dust.pos;
  for (let i = 0; i < dust.n; i++) { dp[i * 3 + 1] += dt * (0.4 + dust.seed[i] * 0.8); if (dp[i * 3 + 1] > 72) dp[i * 3 + 1] = 0; }
  dust.p.geometry.attributes.position.needsUpdate = true;
}

// ───────────────────────── camera director ─────────────────────────
function flyTo(pos, target, dur = 2.2) {
  state.tween = { from: camera.position.clone(), fromT: controls.target.clone(), to: pos.clone(), toT: target.clone(), t: 0, dur };
  state.autoOrbit = false;
}
function overviewPose() {
  const mobile = innerWidth / innerHeight < 0.8;
  const r = mobile ? 300 : 215;
  return { pos: new THREE.Vector3(Math.cos(0.75) * r, mobile ? 150 : 105, Math.sin(0.75) * r), target: new THREE.Vector3(0, mobile ? 14 : 18, 0) };
}
let viewShift = 0;
function updateViewOffset(dt) {
  const desk = innerWidth > 760;
  const card = host.querySelector('.card:not(.out)');
  const target = desk && card ? Math.min(220, (card.offsetWidth + 24) / 2) : 0;
  viewShift = THREE.MathUtils.lerp(viewShift, target, 1 - Math.pow(0.02, dt));
  if (Math.abs(viewShift) < 0.5 && target === 0) { if (camera.view) camera.clearViewOffset(); return; }
  camera.setViewOffset(innerWidth, innerHeight, viewShift, 0, innerWidth, innerHeight);
}
function updateCamera(dt) {
  updateViewOffset(dt);
  if (state.tween) {
    const tw = state.tween; tw.t += dt / tw.dur; const k = ease(clamp(tw.t));
    // arc through a raised midpoint for a cinematic move
    const mid = tw.from.clone().lerp(tw.to, 0.5); mid.y += tw.from.distanceTo(tw.to) * 0.12;
    const a = tw.from.clone().lerp(mid, k), b = mid.clone().lerp(tw.to, k);
    camera.position.copy(a.lerp(b, k));
    controls.target.copy(tw.fromT.clone().lerp(tw.toT, k));
    if (tw.t >= 1) state.tween = null;
    camera.lookAt(controls.target);
    return;
  }
  if (state.mode === 'title') {
    const t = state.time;
    const a = 0.4 + t * 0.045, r = (innerWidth / innerHeight < 0.8 ? 260 : 185) + Math.sin(t * 0.11) * 24;
    camera.position.set(Math.cos(a) * r, 52 + Math.sin(t * 0.08) * 20, Math.sin(a) * r);
    controls.target.set(0, 22 + Math.sin(t * 0.07) * 4, 0);
    camera.lookAt(controls.target);
    return;
  }
  if (state.autoOrbit) {
    state.orbitA += dt * (state.playing ? 0.07 : 0.025);
    const mobile = innerWidth / innerHeight < 0.8;
    const r = mobile ? 280 : 190;
    const hy = Yh(state.year);
    camera.position.set(Math.cos(state.orbitA) * r, 60 + hy * 1.1, Math.sin(state.orbitA) * r);
    controls.target.lerp(new THREE.Vector3(0, 8 + hy * 0.42, 0), 1 - Math.pow(0.05, dt));
    camera.lookAt(controls.target);
    return;
  }
  controls.update();
}
controls.addEventListener('start', () => { state.autoOrbit = false; state.tween = null; });

// ───────────────────────── UI: title ─────────────────────────
const totalValue = valueSum(S);
const crossCount = S.filter(s => s.parents.length > 1).length;
const goldCount = S.filter(isGoldFinal).length;
$('asof-title').textContent = `· Data as of ${D.asOfLabel}`;
$('asof').textContent = `Data as of ${D.asOfLabel}`;
$('title-foot').textContent = `* Combined value = sum of the latest publicly reported valuation, exit price or market cap for each startup that has one. Dates vary (2006–2026), figures are not inflation-adjusted, and ${S.filter(s => !s.value).length} startups with no public figure are excluded. xAI and Twitter/X are counted inside SpaceX, Statsig inside OpenAI. Not an estimate of founder wealth.`;
const titleStats = [
  { n: S.length, l: 'Startups traced', f: v => Math.round(v) },
  { n: uniqueFounders.size, l: 'Founders sourced', f: v => Math.round(v) },
  { n: goldCount, l: 'Unicorns or IPOs', f: v => Math.round(v), gold: true },
  { n: totalValue, l: 'Combined reported value*', f: v => fmt(v) }
];
$('title-stats').innerHTML = titleStats.map((s, i) => `<div class="stat"><b id="ts${i}" class="${s.gold ? 'gold' : ''}">0</b><span>${s.l}</span></div>`).join('');
function countUp(el, to, f, dur = 1600, delay = 0) {
  const t0 = performance.now() + delay;
  const step = now => { const k = clamp((now - t0) / dur); el.textContent = f(to * ease(k)); if (k < 1) requestAnimationFrame(step); };
  requestAnimationFrame(step);
}
function runTitleCounters() { titleStats.forEach((s, i) => countUp($('ts' + i), s.n, s.f, 1700, 1500 + i * 120)); }
runTitleCounters();
$('labels').style.opacity = 0;

function enterApp(grow) {
  $('title').classList.add('out'); $('labels').style.opacity = 1;
  ['hud-top', 'families', 'timeline', 'legend'].forEach(id => $(id).hidden = false);
  state.mode = 'explore';
  const o = overviewPose();
  if (grow) { setYear(Y0); flyTo(o.pos, o.target, 2.4); setTimeout(() => { state.autoOrbit = true; play(true); }, 2400); }
  else { setYear(Y_END); flyTo(o.pos, o.target, 2.4); setTimeout(() => { controls.enabled = true; }, 2400); }
  controls.enabled = true;
}
$('btn-grow').onclick = () => enterApp(true);
$('btn-explore').onclick = () => enterApp(false);
$('brand').onclick = () => {
  closeCard(); setMafia(null); pause();
  $('title').classList.remove('out'); ['hud-top', 'families', 'timeline', 'legend', 'filters'].forEach(id => $(id).hidden = true);
  state.mode = 'title'; state.tween = null; setYear(Y_END); runTitleCounters(); $('labels').style.opacity = 0;
};

// ───────────────────────── UI: timeline ─────────────────────────
const range = $('tl-range');
range.min = Y0; range.max = Y_END.toFixed(2);
$('tl-ticks').innerHTML = [2002, 2006, 2010, 2014, 2018, 2022, 2026].map(y => `<span style="left:${((y - Y0) / (Y_END - Y0)) * 100}%">${y}</span>`).join('');
let prevTickYear = Y_END;
function setYear(y, fromPlay = false) {
  state.year = clamp(y, Y0, Y_END);
  range.value = state.year;
  range.style.setProperty('--p', ((state.year - Y0) / (Y_END - Y0) * 100) + '%');
  $('tl-year').textContent = Math.floor(state.year);
  const live = S.filter(s => state.year >= s.year);
  $('tl-count').textContent = `${live.length} startups · ${live.filter(s => statusAt(s, state.year).gold).length} gold`;
  if (fromPlay) emitTickers(prevTickYear, state.year);
  prevTickYear = state.year;
}
range.addEventListener('input', () => { pause(); setYear(parseFloat(range.value)); });
function play(fromStart) {
  if (fromStart || state.year >= Y_END - 0.01) setYear(Y0);
  state.playing = true; $('tl-play').textContent = '❚❚'; $('tl-play').setAttribute('aria-label', 'Pause');
  if (!state.tween && !state.mafia) state.autoOrbit = true;
}
function pause() { state.playing = false; $('tl-play').textContent = '▶'; $('tl-play').setAttribute('aria-label', 'Play time-lapse'); }
$('tl-play').onclick = () => state.playing ? pause() : play(false);
const YEARS_PER_SEC = 1 / 1.15;

// tickers
const ticker = $('ticker');
function pushTicker(year, title, sub, col) {
  const el = document.createElement('div'); el.className = 'tk'; el.style.setProperty('--tk', CSSC[col]);
  el.innerHTML = `<div class="tk-y">${year}</div><div class="tk-t">${esc(title)}<small>${esc(sub)}</small></div>`;
  ticker.appendChild(el);
  while (ticker.children.length > 4) ticker.firstElementChild.remove();
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 450); }, 3400);
}
function emitTickers(a, b) {
  if (b <= a || b - a > 1.5) return;
  const list = state.mafia ? S.filter(s => s.parents.includes(state.mafia)) : S;
  list.forEach(s => {
    if (a < s.year && s.year <= b) pushTicker(s.year, s.name, 'Founded by ex-' + s.parents.join(' + '), 'green');
    if (a < s.goldYear + 0.3 && s.goldYear + 0.3 <= b) {
      const ipo = s.events.find(e => e[1] === 'ipo' && e[0] === s.goldYear);
      pushTicker(s.goldYear, ipo ? `${s.name} goes public` : `${s.name} hits $1B+`, ipo ? s.statusDetail : s.valueLabel, 'gold');
    }
    s.events.forEach(e => {
      if (e[1] === 'ipo') return;
      if (e[1] === 'acq' && e[0] === s.goldYear && s.valueYear === e[0]) return; // already announced as the $1B+ exit
      if (a < e[0] + 0.3 && e[0] + 0.3 <= b) pushTicker(e[0], e[1] === 'acq' ? `${s.name} acquired` : `${s.name} shuts down`, s.statusDetail, e[1] === 'acq' ? 'blue' : 'ember');
    });
  });
}

// ───────────────────────── UI: families (mafia mode) ─────────────────────────
$('families').innerHTML = `<div class="fam-all">Families</div>` + parents.map(p => {
  const n = S.filter(s => s.parents.includes(p.id)).length;
  return `<button class="fam" type="button" data-p="${p.id}" aria-pressed="false"><span class="fn"></span><span class="ft">${esc(p.label)}</span><span class="fc">${n} STARTUPS</span></button>`;
}).join('');
$('families').addEventListener('click', e => {
  const b = e.target.closest('.fam'); if (!b) return;
  setMafia(state.mafia === b.dataset.p ? null : b.dataset.p);
});
function setMafia(pid) {
  state.mafia = pid;
  document.querySelectorAll('.fam').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.p === pid)));
  if (!pid) { closeCard(); const o = overviewPose(); if (state.mode !== 'title') flyTo(o.pos, o.target, 2); return; }
  const p = P[pid];
  const dir = p.pos.clone().normalize();
  const side = new THREE.Vector3(-dir.z, 0, dir.x);
  const mobile = innerWidth / innerHeight < 0.8;
  const pos = p.pos.clone().addScaledVector(dir, mobile ? 125 : 92).addScaledVector(side, 18).setY(mobile ? 62 : 46);
  const target = p.pos.clone().multiplyScalar(0.62).setY(mobile ? 18 : 22);
  if (state.mode !== 'title') flyTo(pos, target, 2.4);
  showMafiaCard(pid);
  if (location.hash.slice(1) !== pid.toLowerCase() && !CAPTURE) history.replaceState(null, '', '#' + pid.toLowerCase());
}

// ───────────────────────── cards ─────────────────────────
const host = $('card-host');
function mountCard(html, accent) {
  const old = host.querySelector('.card');
  if (old) { old.classList.add('out'); setTimeout(() => old.remove(), 380); }
  const el = document.createElement('article'); el.className = 'card'; el.style.setProperty('--accent', accent);
  el.innerHTML = html; host.appendChild(el);
  el.querySelector('.card-close')?.addEventListener('click', () => { if (state.selected) { state.selected = null; if (state.mafia) showMafiaCard(state.mafia); else closeCard(); } else { setMafia(null); } });
  return el;
}
function closeCard() {
  state.selected = null;
  const old = host.querySelector('.card'); if (old) { old.classList.add('out'); setTimeout(() => old.remove(), 380); }
  if (location.hash && !CAPTURE) history.replaceState(null, '', location.pathname + location.search);
}
function showMafiaCard(pid) {
  const p = P[pid];
  const list = S.filter(s => s.parents.includes(pid)).sort((a, b) => (b.value || 0) - (a.value || 0));
  const v = valueSum(list);
  const founders = new Set(list.flatMap(s => s.founders.filter(f => f.p.includes(pid)).map(f => f.n)));
  const name = pid === 'PayPal' ? 'The PayPal Mafia' : `The ${p.label.charAt(0) + p.label.slice(1).toLowerCase()} family`;
  const excluded = list.filter(s => s.absorbedInto && list.some(o => o.name === s.absorbedInto)).map(s => s.name);
  const undisclosed = list.filter(s => !s.value).length;
  const el = mountCard(`
    <div class="card-top"><div class="card-tag">${esc(p.label)} · Family</div><button class="x card-close" type="button" aria-label="Close">×</button></div>
    <div class="card-body">
      <h3>${esc(name)}</h3>
      <div><div class="mafia-n" id="mafia-n">$0</div><div class="k">Combined publicly reported value*</div></div>
      <dl class="kv">
        <div><dt>Startups</dt><dd>${list.length}</dd></div>
        <div><dt>Unicorns / IPOs</dt><dd>${list.filter(isGoldFinal).length}</dd></div>
        <div><dt>Founders from ${esc(p.label)}</dt><dd>${founders.size}</dd></div>
        <div><dt>Co-founded with other families</dt><dd>${list.filter(s => s.parents.length > 1).length}</dd></div>
      </dl>
      <div class="mlist">${list.map(s => `<button type="button" data-s="${esc(s.name)}"><i class="dot ${statusAt(s, Y_END).col}"></i>${esc(s.name)}</button>`).join('')}</div>
      <p class="note">* Sum of each startup's latest publicly reported valuation, exit price or market cap. Dates vary; not inflation-adjusted.${undisclosed ? ` ${undisclosed} with no public figure excluded.` : ''}${excluded.length ? ` ${excluded.join(', ')} counted inside ${[...new Set(list.filter(s => excluded.includes(s.name)).map(s => s.absorbedInto))].join(', ')}.` : ''} ${esc(p.note || '')}</p>
    </div>`, CSSC.gold);
  el.querySelectorAll('.mlist button').forEach(b => b.onclick = () => selectStartup(byName[b.dataset.s]));
  countUp(el.querySelector('#mafia-n'), v, fmt, 1600, 350);
}
function showStartupCard(s) {
  const st = statusAt(s, Y_END);
  const srcLinks = [];
  if (s.fundingSrc) srcLinks.push(`<a href="${esc(s.fundingSrc)}" target="_blank" rel="noopener">Funding: ${esc(new URL(s.fundingSrc).hostname.replace('www.', ''))} ↗</a>`);
  if (s.valueSrc) srcLinks.push(`<a href="${esc(s.valueSrc)}" target="_blank" rel="noopener">Value: ${esc(new URL(s.valueSrc).hostname.replace('www.', ''))} ↗</a>`);
  mountCard(`
    <div class="card-top"><div class="card-tag">${esc(statusLabel(s))}</div><button class="x card-close" type="button" aria-label="Close">×</button></div>
    <div class="card-body">
      <h3>${esc(s.name)}</h3>
      <p class="dek">${esc(s.desc)}</p>
      <dl class="kv">
        <div><dt>Founded</dt><dd>${s.year}${s.yearNote ? `<small>${esc(s.yearNote)}</small>` : ''}</dd></div>
        <div><dt>HQ · Sector</dt><dd>${esc(s.country)}<small>${esc(s.sector)}</small></dd></div>
        <div><dt>Funding raised</dt><dd>${s.funding ? fmt(s.funding) : 'Not public'}${s.fundingLabel ? `<small>${esc(s.fundingLabel)}</small>` : ''}</dd></div>
        <div><dt>Valuation / exit</dt><dd>${s.value ? fmt(s.value) : 'Not public'}${s.valueLabel ? `<small>${esc(s.valueLabel)}</small>` : ''}</dd></div>
        <div class="full"><dt>Status</dt><dd><span class="st-pill"><i class="dot ${st.col}"></i>${esc(statusLabel(s))}</span><small>${esc(s.statusDetail)}${s.statusChecked ? ` · last confirmed ${esc(s.statusChecked)}` : ''}</small></dd></div>
      </dl>
      <div><div class="k">Founders with a sourced link</div>
      <div class="founders">${s.founders.map(f => `
        <div class="fd"><b>${esc(f.n)}</b><div class="pp">${f.p.map(x => `<span>${esc(P[x].label)}</span>`).join('')}</div>
        <div class="rl">${esc(f.r)}<br><a href="${esc(f.s)}" target="_blank" rel="noopener">${esc(f.st)} ↗</a></div></div>`).join('')}</div></div>
      ${srcLinks.length ? `<div class="srcs">${srcLinks.join('')}</div>` : ''}
    </div>`, CSSC[st.col]);
}
function selectStartup(s, fly = true) {
  if (!s) return;
  if (state.mafia && !s.parents.includes(state.mafia)) { state.mafia = null; document.querySelectorAll('.fam').forEach(b => b.setAttribute('aria-pressed', 'false')); }
  state.selected = s;
  if (state.year < s.year + 0.8) setYear(Math.min(Y_END, Math.max(state.year, s.year + 0.8)));
  showStartupCard(s);
  if (fly && state.mode !== 'title') {
    const L = s.leafPos;
    const out = L.clone().setY(0); if (out.length() < 1) out.set(1, 0, 0); out.normalize();
    const mobile = innerWidth / innerHeight < 0.8;
    const side = new THREE.Vector3(-out.z, 0, out.x);
    const pos = L.clone().addScaledVector(out, mobile ? 56 : 40).addScaledVector(side, mobile ? 0 : 8).add(new THREE.Vector3(0, 10, 0));
    const tgt = L.clone(); if (mobile) tgt.y -= 9;
    flyTo(pos, tgt, 1.9);
  }
}

// ───────────────────────── picking ─────────────────────────
const ray = new THREE.Raycaster(), mouse = new THREE.Vector2();
let downAt = null;
function pick(ev) {
  const r = renderer.domElement.getBoundingClientRect();
  mouse.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(mouse, camera);
  const hits = ray.intersectObjects(hitMeshes.filter(h => h.userData.s.w > 0.4 && state.year >= h.userData.s.year), false);
  return hits.length ? hits[0].object.userData.s : null;
}
renderer.domElement.addEventListener('pointerdown', e => { downAt = [e.clientX, e.clientY]; });
renderer.domElement.addEventListener('pointerup', e => {
  if (!downAt || state.mode === 'title') return;
  if (Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
  const s = pick(e); if (s) selectStartup(s);
});
renderer.domElement.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse' || state.mode === 'title') return;
  const s = pick(e); state.hover = s; renderer.domElement.style.cursor = s ? 'pointer' : '';
});

// ───────────────────────── search ─────────────────────────
const q = $('q'), qr = $('q-results');
const index = [
  ...parents.map(p => ({ k: p.id.toLowerCase(), label: p.label.charAt(0) + p.label.slice(1).toLowerCase(), sub: 'Family tree', go: () => setMafia(p.id) })),
  ...S.map(s => ({ k: s.name.toLowerCase(), label: s.name, sub: `${s.year} · ex-${s.parents.join('/')}`, go: () => selectStartup(s) })),
  ...S.flatMap(s => s.founders.map(f => ({ k: f.n.toLowerCase(), label: f.n, sub: `Founder · ${s.name}`, go: () => selectStartup(s) })))
];
let qSel = 0, qList = [];
function renderQ() {
  const v = q.value.trim().toLowerCase();
  if (!v) { qr.hidden = true; return; }
  qList = index.filter(x => x.k.includes(v)).sort((a, b) => a.k.indexOf(v) - b.k.indexOf(v)).slice(0, 9);
  qSel = 0;
  qr.innerHTML = qList.length ? qList.map((x, i) => `<li role="option" aria-selected="${i === qSel}" data-i="${i}">${esc(x.label)}<small>${esc(x.sub)}</small></li>`).join('') : `<li aria-disabled="true">No match in this dataset<small>Not every startup is traced</small></li>`;
  qr.hidden = false;
}
q.addEventListener('input', renderQ);
q.addEventListener('keydown', e => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); qSel = (qSel + (e.key === 'ArrowDown' ? 1 : -1) + qList.length) % Math.max(1, qList.length); [...qr.children].forEach((li, i) => li.setAttribute('aria-selected', String(i === qSel))); }
  if (e.key === 'Enter' && qList[qSel]) { qList[qSel].go(); q.blur(); qr.hidden = true; }
  if (e.key === 'Escape') { qr.hidden = true; q.blur(); }
});
qr.addEventListener('click', e => { const li = e.target.closest('li[data-i]'); if (!li) return; qList[+li.dataset.i].go(); qr.hidden = true; q.value = ''; });
document.addEventListener('pointerdown', e => { if (!e.target.closest('.search')) qr.hidden = true; });

// ───────────────────────── filters ─────────────────────────
const count = key => S.reduce((m, s) => (m[s[key]] = (m[s[key]] || 0) + 1, m), {});
function chips(elId, key, set) {
  const c = count(key);
  $(elId).innerHTML = Object.keys(c).sort((a, b) => c[b] - c[a]).map(v => `<button class="f-chip" type="button" aria-pressed="false" data-v="${esc(v)}">${esc(v)}<small>${c[v]}</small></button>`).join('');
  $(elId).addEventListener('click', e => {
    const b = e.target.closest('.f-chip'); if (!b) return;
    const v = b.dataset.v; set.has(v) ? set.delete(v) : set.add(v); b.setAttribute('aria-pressed', String(set.has(v)));
  });
}
chips('f-sector', 'sector', state.sectors); chips('f-country', 'country', state.countries);
$('btn-filter').onclick = () => { const f = $('filters'); f.hidden = !f.hidden; $('btn-filter').setAttribute('aria-expanded', String(!f.hidden)); };
$('f-close').onclick = () => { $('filters').hidden = true; $('btn-filter').setAttribute('aria-expanded', 'false'); };
$('f-reset').onclick = () => { state.sectors.clear(); state.countries.clear(); document.querySelectorAll('.f-chip').forEach(b => b.setAttribute('aria-pressed', 'false')); };
document.querySelectorAll('.seg button').forEach(b => b.onclick = () => {
  state.sizeBy = b.dataset.size;
  document.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-checked', String(x === b)));
  $('lg-size').textContent = state.sizeBy === 'funding' ? 'Size = funding raised' : 'Size = valuation / exit';
});

// ───────────────────────── sources panel ─────────────────────────
$('src-asof').textContent = `DATA AS OF ${D.asOfLabel.toUpperCase()} · ${S.length} STARTUPS · ${uniqueFounders.size} FOUNDERS · ${new Set(S.flatMap(s => [...s.founders.map(f => f.s), s.fundingSrc, s.valueSrc]).filter(Boolean)).size} UNIQUE SOURCE URLS`;
$('method').innerHTML = [
  ['What counts as a link', 'A founder appears only when a public page (company site, founder bio, reputable press, or Wikipedia where nothing better was reachable) states they worked at the parent before founding. No inferred links. Internships were dropped.'],
  ['Value figures', 'Latest publicly reported valuation, acquisition price or market cap, with its date in the label. Market caps are as of Oct 2026. Currency conversions are marked as estimates.'],
  ['Funding figures', 'Total funding where a source states it. "Sum of announced rounds" means we added the publicly announced rounds. Blank means no reliable public total.'],
  ['Colours & time-lapse', 'Gold = IPO, or a sourced $1B+ valuation or exit. It blooms in the IPO year or the year of that sourced figure, which can be later than the first $1B round. Blue = acquired. Ember = shut down.'],
  ['Known gaps', 'This is a curated sample, not a census. Stripe and Revolut alumni lists are short because fewer links could be verified. Status for some smaller startups was last confirmed earlier; the card says when.'],
  ['No logos', 'Names and text only. Company names are used for identification; no affiliation or endorsement is implied.']
].map(([h, p]) => `<div><h4>${h}</h4><p>${p}</p></div>`).join('');
$('src-list').innerHTML = [...S].sort((a, b) => a.name.localeCompare(b.name)).map(s => `
  <div class="src-item"><h5><i class="dot ${statusAt(s, Y_END).col}"></i>${esc(s.name)}</h5><ul>
  ${s.founders.map(f => `<li><b>${esc(f.n)}</b> → ${f.p.map(esc).join(' + ')}: <a href="${esc(f.s)}" target="_blank" rel="noopener">${esc(f.st)}</a></li>`).join('')}
  ${s.fundingSrc ? `<li><b>Funding</b> ${fmt(s.funding)} (${esc(s.fundingLabel || '')}): <a href="${esc(s.fundingSrc)}" target="_blank" rel="noopener">${esc(s.fundingSrc)}</a></li>` : ''}
  ${s.valueSrc ? `<li><b>Value</b> ${esc(s.valueLabel)}: <a href="${esc(s.valueSrc)}" target="_blank" rel="noopener">${esc(s.valueSrc)}</a></li>` : ''}
  </ul></div>`).join('');
$('btn-sources').onclick = () => { $('sources').hidden = false; };
$('src-close').onclick = () => { $('sources').hidden = true; };

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (!$('sources').hidden) { $('sources').hidden = true; return; }
  if (state.selected) { state.selected = null; state.mafia ? showMafiaCard(state.mafia) : closeCard(); return; }
  if (state.mafia) setMafia(null);
});

// ───────────────────────── loop ─────────────────────────
const clock = new THREE.Clock();
function frame(dt, render = true) {
  state.time += dt;
  if (state.playing) {
    const ny = state.year + dt * YEARS_PER_SEC;
    if (ny >= Y_END) { setYear(Y_END, true); pause(); } else setYear(ny, true);
  }
  updateCamera(dt);
  updateScene(dt);
  if (!render) return;
  composer.render();
  labelRenderer.render(scene, camera);
}
if (!CAPTURE) {
  renderer.setAnimationLoop(() => frame(Math.min(clock.getDelta(), 0.05)));
}

// deep link: #paypal etc.
const h = location.hash.slice(1).toLowerCase();
if (h && !CAPTURE) { const p = parents.find(x => x.id.toLowerCase() === h); if (p) { enterApp(false); setTimeout(() => setMafia(p.id), 300); } }

// ───────────────────────── capture API (video) ─────────────────────────
window.FFT = {
  state, S, P, parents, camera, controls, setYear, flyTo, setMafia, selectStartup, closeCard, enterApp, play, pause, overviewPose, pushTicker, showMafiaCard,
  step(dt) { frame(dt); },
  advance(sec, dt = 1 / 30) { for (let t = 0; t < sec; t += dt) frame(dt, false); frame(0.0001); },
  THREE
};
window.FFT_READY = true;
