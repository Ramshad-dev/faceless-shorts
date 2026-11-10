// THE 4 FLOORS OF THE DREAMCORE ELEVATOR: PS1 Liminal 3D Shot List
import * as THREE from 'three';
import { ctx, setCtx, W, H, clamp, lerp, seg, eo, eio, eob, rr } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import { Human } from './core/human.js';
import * as SETS from './core/sets3d.js';
import * as K from './core/kit.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z), lerpV = (a, b, k) => a.clone().lerp(b, k);
const NIGHT = { exposure: 1.2, bloom: 0.8, bloomThreshold: 0.55, vignette: 0.6, grain: 0.05, warm: 0 };

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.1);
  const cam = camera(34);

  const C = SETS.corridor();
  const PV = SETS.planetsVoid();
  const FC = SETS.fogCatwalk();

  const render = (scene, focusP, extra = {}) => {
    if (cam.fov !== (extra.fov || 34)) {
      cam.fov = extra.fov || 34;
      cam.updateProjectionMatrix();
    }
    E.render(scene, cam, { ...NIGHT, focus: cam.position.distanceTo(focusP), aperture: 0.0012, ...extra });
  };

  // 1 · HOOK: Fell asleep in elevator, stops on floor with no number
  add({ id: 'S01', at: 0, note: 'elevator doors closed, unnumbered indicator panel', draw(lt, d, t, blit) {
    C.update(t);
    cam.position.copy(lerpV(V3(0.0, 1.4, 0.5), V3(0.0, 1.35, -1.0), eio(lt / d)));
    cam.lookAt(0, 1.3, -5);
    render(C.scene, V3(0, 1.3, -4), { fov: 36 });
    blit();
    K.dateStamp('FLOOR: [ -- ]', '3:00 A.M. · ELEVATOR ACTIVE', clamp(lt / 1.5), 80, 300);
  } });
  cue(0.4, 'tock', { gain: 0.5 });

  // 2 · DOORS OPEN: Doors slide open, revealing 4 corridors
  { const st = cut(1);
    add({ id: 'S02', at: st, note: 'doors part, revealing 4 branches in mist', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.copy(lerpV(V3(0.0, 1.4, -1.0), V3(0.0, 1.4, -3.5), eio(lt / d)));
      cam.lookAt(0, 1.3, -12);
      render(C.scene, V3(0, 1.3, -8), { fov: 42 });
      blit();
      K.dateStamp('DOORS OPEN', 'FOUR PATHWAYS DETECTED', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 3 · FLOOR 1: Infinite poolrooms, warm water
  { const st = cut(2);
    add({ id: 'S03', at: st, note: 'cyan water poolroom perspective, tiled pillars', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.copy(lerpV(V3(0.3, 0.8, -4.0), V3(-0.2, 0.6, -8.0), eio(lt / d)));
      cam.lookAt(0, 0.5, -16);
      render(C.scene, V3(0, 0.5, -12), { fov: 40 });
      blit();
      K.dateStamp('FLOOR 01', 'INFINITE POOLROOMS · 82°F', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 4 · FLOOR 1 TWIST: Water rising 1 inch every hour
  { const st = cut(3);
    add({ id: 'S04', at: st, note: 'close pan on rising water surface', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.set(0.0, 0.45, lerp(-8.0, -11.0, eio(lt / d)));
      cam.lookAt(0, 0.35, -18);
      render(C.scene, V3(0, 0.35, -15), { exposure: 1.3 });
      blit();
      K.dateStamp('HYDROSTATIC ALERT', 'WATER LEVEL: +1 INCH/HR', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'slide', { dur: 0.4, gain: 0.4 });
  }

  // 5 · FLOOR 2: Carpeted play place from 1998
  { const st = cut(4);
    add({ id: 'S05', at: st, note: 'pastel playplace tunnels and primary colors', draw(lt, d, t, blit) {
      PV.update(t);
      cam.position.copy(lerpV(V3(-2.5, 4.0, -18.0), V3(-2.5, 3.5, -21.0), eio(lt / d)));
      cam.lookAt(-2.5, 3.5, -24);
      render(PV.scene, V3(-2.5, 3.5, -24), { fov: 38 });
      blit();
      K.dateStamp('FLOOR 02', 'PLAYPLACE · VINTAGE 1998', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 6 · FLOOR 2 TWIST: Birthday music, tunnels lead nowhere
  { const st = cut(5);
    add({ id: 'S06', at: st, note: 'slow orbit around yellow grid cube tunnel', draw(lt, d, t, blit) {
      PV.update(t);
      cam.position.set(-2.5 + Math.sin(lt * 0.9) * 2.5, 3.5, -21.0 + Math.cos(lt * 0.9) * 2.5);
      cam.lookAt(-2.5, 3.5, -24);
      render(PV.scene, V3(-2.5, 3.5, -24), { fov: 35 });
      blit();
      K.dateStamp('SPATIAL LOOP', 'ALL TUNNELS LEAD INWARD', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'tock', { gain: 0.3 });
  }

  // 7 · FLOOR 3: Rooftop wrapped in purple mist
  { const st = cut(6);
    add({ id: 'S07', at: st, note: 'open foggy sky, dusk gradient and purple mist', draw(lt, d, t, blit) {
      FC.update(t);
      cam.position.copy(lerpV(V3(0.0, 2.2, 0.0), V3(0.0, 2.0, -4.0), eio(lt / d)));
      cam.lookAt(0, 1.8, -16);
      render(FC.scene, V3(0, 1.8, -12), { fov: 45, exposure: 1.4 });
      blit();
      K.dateStamp('FLOOR 03', 'PURPLE ROOFTOP · ENDLESS SKY', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 8 · FLOOR 3 TWIST: No stairs down, no ground below
  { const st = cut(7);
    add({ id: 'S08', at: st, note: 'camera tilts down into infinite empty drop', draw(lt, d, t, blit) {
      FC.update(t);
      cam.position.set(0.0, 1.8, lerp(-4.0, -7.0, eio(lt / d)));
      cam.lookAt(0, -2.0, -12);
      render(FC.scene, V3(0, -2.0, -10), { fov: 50 });
      blit();
      K.dateStamp('VOID BELOW', 'GROUND: NON-EXISTENT', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'thud', { gain: 0.6 });
  }

  // 9 · FLOOR 4: White gallery with solitary door
  { const st = cut(8);
    add({ id: 'S09', at: st, note: 'monolithic corridor leading to single closed door', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.copy(lerpV(V3(0.0, 1.5, -6.0), V3(0.0, 1.45, -12.0), eio(lt / d)));
      cam.lookAt(0, 1.2, -18);
      render(C.scene, V3(0, 1.2, -18), { exposure: 1.5 });
      blit();
      K.dateStamp('FLOOR 04', 'WHITE GALLERY · SINGLE DOOR', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 10 · CLOSING HOOK: Elevator chimes, doors closing in 5 seconds
  { const st = cut(9);
    add({ id: 'S10', at: st, note: 'fast pull back into elevator as doors start closing', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.copy(lerpV(V3(0.0, 1.4, -2.0), V3(0.0, 1.4, 2.0), eio(lt / d)));
      cam.lookAt(0, 1.3, -8);
      render(C.scene, V3(0, 1.3, -6), { fov: 38 });
      blit();
      K.dateStamp('DOORS CLOSING IN 5', 'WHICH FLOOR DO YOU STEP ONTO?', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'slam', { gain: 0.7 });
  }

  return { shots: S, cues: CUES };
}
