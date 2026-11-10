// 4 PLANETS YOU MUST LIVE HERE: PS1 Liminal 3D Shot List
import * as THREE from 'three';
import { ctx, setCtx, W, H, clamp, lerp, seg, eo, eio, eob, rr } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import { Human } from './core/human.js';
import * as SETS from './core/sets3d.js';
import * as K from './core/kit.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z), lerpV = (a, b, k) => a.clone().lerp(b, k);
const NIGHT = { exposure: 1.25, bloom: 0.85, bloomThreshold: 0.55, vignette: 0.6, grain: 0.05, warm: 0 };

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.1);
  const cam = camera(34);

  const PV = SETS.planetsVoid();
  const C = SETS.corridor();
  const FC = SETS.fogCatwalk();

  const person = (kind) => {
    const h = new Human({ face: false });
    h.setAllMaterial(kind === 'subject' ? SETS.subjectMat() : SETS.witnessMat());
    return h;
  };
  const watcher = person('subject');
  FC.scene.add(watcher.group);

  const render = (scene, focusP, extra = {}) => {
    if (cam.fov !== (extra.fov || 34)) {
      cam.fov = extra.fov || 34;
      cam.updateProjectionMatrix();
    }
    E.render(scene, cam, { ...NIGHT, focus: cam.position.distanceTo(focusP), aperture: 0.0012, ...extra });
  };

  // 1 · HOOK: Earth has gone dark, choose one of four planets
  add({ id: 'S01', at: 0, note: 'pan across 4 planets in deep void', draw(lt, d, t, blit) {
    PV.update(t);
    cam.position.copy(lerpV(V3(-6.0, 3.5, 4.0), V3(4.0, 2.0, 2.0), eio(lt / d)));
    cam.lookAt(0, 1.0, -20);
    render(PV.scene, V3(0, 1.0, -20), { fov: 42 });
    blit();
    K.dateStamp('SYSTEM ALERT', 'SECTOR 04 · CHOOSE REALM', clamp(lt / 1.6), 80, 300);
  } });
  cue(0.3, 'whoosh', { gain: 0.5 });
  cue(0.8, 'tock', { gain: 0.4 });

  // 2 · PLANET 1: Pastel fields and clean oceans
  { const st = cut(1);
    add({ id: 'S02', at: st, note: 'close push-in to planet 1 (pastel eden)', draw(lt, d, t, blit) {
      PV.update(t);
      cam.position.copy(lerpV(V3(-8.0, 4.0, -6.0), V3(-8.0, 2.2, -11.0), eio(lt / d)));
      cam.lookAt(-8.0, 1.2, -18);
      render(PV.scene, V3(-8.0, 1.2, -18), { fov: 32 });
      blit();
      K.dateStamp('PLANET 01', 'PARADISE · FRESH OCEANS', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 3 · PLANET 1 TWIST: Sun never sets, people have no faces
  { const st = cut(2);
    add({ id: 'S03', at: st, note: 'orbit planet 1, frozen sun glare', draw(lt, d, t, blit) {
      PV.update(t);
      cam.position.set(-8.0 + Math.sin(lt * 0.8) * 4.0, 2.5, -12.0 + Math.cos(lt * 0.8) * 2.0);
      cam.lookAt(-8.0, 1.2, -18);
      render(PV.scene, V3(-8.0, 1.2, -18), { exposure: 1.45, fov: 36 });
      blit();
      K.dateStamp('ANOMALY DETECTED', 'INHABITANTS: FACELESS', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'slide', { dur: 0.4, gain: 0.4 });
  }

  // 4 · PLANET 2: Infinite indoor shopping mall
  { const st = cut(3);
    add({ id: 'S04', at: st, note: 'cut inside endless yellow corridor', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.copy(lerpV(V3(0.1, 1.55, 1.5), V3(0.0, 1.5, -2.5), eio(lt / d)));
      cam.lookAt(0, 1.3, -12);
      render(C.scene, V3(0, 1.3, -8));
      blit();
      K.dateStamp('PLANET 02', 'INDOOR FACILITY · INFINITE', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
    cue(st + 0.3, 'tock', { gain: 0.3 });
  }

  // 5 · PLANET 2 TWIST: Food and dry shelter, no exit
  { const st = cut(4);
    add({ id: 'S05', at: st, note: 'fast drift into endless corridor doors', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.copy(lerpV(V3(0.0, 1.5, -2.5), V3(0.0, 1.5, -7.5), eio(lt / d)));
      cam.lookAt(0, 1.3, -18);
      render(C.scene, V3(0, 1.3, -15));
      blit();
      K.dateStamp('WARNING', 'EXIT: NOT FOUND // LOOPING', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'slam', { gain: 0.5 });
  }

  // 6 · PLANET 3: Drowning in iron fog and rusted catwalks
  { const st = cut(5);
    add({ id: 'S06', at: st, note: 'Silent Hill rusted catwalk with swinging halogen lamp', draw(lt, d, t, blit) {
      FC.update(t);
      watcher.group.position.set(0.2, 0, -12);
      watcher.pose({ head: [5, 0, 0] });
      cam.position.copy(lerpV(V3(0.2, 1.6, 2.0), V3(0.1, 1.5, -1.0), eio(lt / d)));
      cam.lookAt(0, 1.2, -12);
      render(FC.scene, V3(0.2, 1.2, -12), { fov: 38 });
      blit();
      K.dateStamp('PLANET 03', 'RUST CATWALK · DENSE FOG', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 7 · PLANET 3 TWIST: Siren wails from the mist at midnight
  { const st = cut(6);
    add({ id: 'S07', at: st, note: 'slow zoom on watcher in fog, emergency siren pulse', draw(lt, d, t, blit) {
      FC.update(t);
      cam.position.copy(lerpV(V3(0.1, 1.5, -1.0), V3(0.05, 1.45, -5.5), eio(lt / d)));
      cam.lookAt(0.2, 1.2, -12);
      render(FC.scene, V3(0.2, 1.2, -12), { fov: 36, exposure: 1.4 + Math.sin(t * 8) * 0.4 });
      blit();
      K.dateStamp('AIR RAID ALERT', 'CYCLE IN PROGRESS // 00:00', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'alarm', { dur: 2.0, gain: 0.6 });
  }

  // 8 · PLANET 4: Zero gravity and shifting black monoliths
  { const st = cut(7);
    add({ id: 'S08', at: st, note: 'close orbit around black obelisk with red wireframe', draw(lt, d, t, blit) {
      PV.update(t);
      cam.position.copy(lerpV(V3(9.0, 4.5, -12.0), V3(9.0, 2.5, -16.0), eio(lt / d)));
      cam.lookAt(9.0, 2.0, -22);
      render(PV.scene, V3(9.0, 2.0, -22), { fov: 32 });
      blit();
      K.dateStamp('PLANET 04', 'ZERO GRAVITY · ANOMALY', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 9 · PLANET 4 TWIST: Never grow old, but forget every memory
  { const st = cut(8);
    add({ id: 'S09', at: st, note: 'tight push on obelisk, scanline glitch', draw(lt, d, t, blit) {
      PV.update(t);
      cam.position.copy(lerpV(V3(9.0, 2.5, -16.0), V3(9.0, 2.0, -18.5), eio(lt / d)));
      cam.lookAt(9.0, 2.0, -22);
      render(PV.scene, V3(9.0, 2.0, -22), { fov: 28, bloom: 1.2 });
      blit();
      K.dateStamp('CORRUPTED SAVE', 'MEMORY PURGE: 24 HOURS', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'tock', { gain: 0.4 });
  }

  // 10 · CLOSING HOOK: Which planet do you choose? Shuttle touches down
  { const st = cut(9);
    add({ id: 'S10', at: st, note: 'wide pull back to all 4 planets in fog', draw(lt, d, t, blit) {
      PV.update(t);
      cam.position.copy(lerpV(V3(0.0, 2.0, -2.0), V3(0.0, 4.0, 8.0), eio(lt / d)));
      cam.lookAt(0, 1.0, -20);
      render(PV.scene, V3(0, 1.0, -20), { fov: 46 });
      blit();
      K.dateStamp('FINAL SELECTION', 'SHUTTLE DOCKING IN PROGRESS', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'thud', { gain: 0.6 });
  }

  return { shots: S, cues: CUES };
}
