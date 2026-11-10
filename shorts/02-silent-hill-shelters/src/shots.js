// THE 4 SHELTERS OF SILENT HILL: PS1 Liminal 3D Shot List
import * as THREE from 'three';
import { ctx, setCtx, W, H, clamp, lerp, seg, eo, eio, eob, rr } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import { camera } from './core/engine.js';
import { Human } from './core/human.js';
import * as SETS from './core/sets3d.js';
import * as K from './core/kit.js';

const V3 = (x, y, z) => new THREE.Vector3(x, y, z), lerpV = (a, b, k) => a.clone().lerp(b, k);
const NIGHT = { exposure: 1.3, bloom: 0.9, bloomThreshold: 0.5, vignette: 0.65, grain: 0.06, warm: 0 };

export function buildShots(E) {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.1);
  const cam = camera(34);

  const C = SETS.corridor();
  const FC = SETS.fogCatwalk();
  const HN = SETS.houseNight();

  const person = (kind) => {
    const h = new Human({ face: false });
    h.setAllMaterial(kind === 'subject' ? SETS.subjectMat() : SETS.witnessMat());
    return h;
  };
  const runner = person('subject');
  FC.scene.add(runner.group);

  const render = (scene, focusP, extra = {}) => {
    if (cam.fov !== (extra.fov || 34)) {
      cam.fov = extra.fov || 34;
      cam.updateProjectionMatrix();
    }
    E.render(scene, cam, { ...NIGHT, focus: cam.position.distanceTo(focusP), aperture: 0.0012, ...extra });
  };

  // 1 · HOOK: Siren begins four-minute cycle, fog under door
  add({ id: 'S01', at: 0, note: 'dark foggy catwalk, emergency red strobe', draw(lt, d, t, blit) {
    FC.update(t);
    cam.position.copy(lerpV(V3(0.0, 1.65, 3.0), V3(0.0, 1.55, 0.0), eio(lt / d)));
    cam.lookAt(0, 1.2, -10);
    render(FC.scene, V3(0, 1.2, -8), { fov: 42, exposure: 1.4 + Math.sin(t * 10) * 0.4 });
    blit();
    K.dateStamp('DISTRICT EMERGENCY', 'AIR RAID SIREN ACTIVE', clamp(lt / 1.5), 80, 300);
  } });
  cue(0.3, 'alarm', { dur: 2.2, gain: 0.7 });

  // 2 · RUN: 30 seconds to run to one shelter
  { const st = cut(1);
    add({ id: 'S02', at: st, note: 'subject runs down dark catwalk into fog', draw(lt, d, t, blit) {
      FC.update(t);
      runner.group.position.set(0, 0, lerp(0, -8, lt / d));
      runner.group.rotation.y = Math.PI;
      runner.walk(lt * 6, 0.9);
      cam.position.copy(lerpV(V3(0.3, 1.55, 2.0), V3(0.1, 1.5, -3.0), eio(lt / d)));
      cam.lookAt(0, 1.2, -12);
      render(FC.scene, runner.group.position.clone().add(V3(0, 1.2, 0)), { fov: 36 });
      blit();
      K.dateStamp('TIME REMAINING', '00:30 // LOCATE BUNKER', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 3 · SHELTER 1: Abandoned subway terminal
  { const st = cut(2);
    add({ id: 'S03', at: st, note: 'subway corridor with iron gate shadow', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.copy(lerpV(V3(0.2, 1.5, 2.0), V3(0.0, 1.4, -2.0), eio(lt / d)));
      cam.lookAt(0, 1.2, -10);
      render(C.scene, V3(0, 1.2, -6));
      blit();
      K.dateStamp('SHELTER 01', 'SUBWAY TERMINAL · STEEL GATE', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 4 · SHELTER 1 TWIST: Footsteps pacing on tracks below
  { const st = cut(3);
    add({ id: 'S04', at: st, note: 'tight zoom down dark tunnel tracks', draw(lt, d, t, blit) {
      C.update(t);
      cam.position.set(0.0, 1.2, lerp(-2.0, -6.0, eio(lt / d)));
      cam.lookAt(0, 0.6, -16);
      render(C.scene, V3(0, 0.6, -14), { aperture: 0.005 });
      blit();
      K.dateStamp('AUDIO CONTACT', 'FOOTSTEPS DETECTED ON RAILS', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'tock', { gain: 0.4 });
    cue(st + 0.4, 'tock', { gain: 0.4 });
  }

  // 5 · SHELTER 2: Empty hotel room on 5th floor
  { const st = cut(4);
    add({ id: 'S05', at: st, note: 'exterior lit window of hotel', draw(lt, d, t, blit) {
      HN.update();
      cam.position.copy(lerpV(V3(-2.0, 2.0, 8.0), V3(-1.0, 2.1, 4.0), eio(lt / d)));
      cam.lookAt(1.3, 1.7, -3.4);
      render(HN.scene, V3(1.3, 1.7, -3.4));
      blit();
      K.dateStamp('SHELTER 02', 'HOTEL ROOM 502', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 6 · SHELTER 2 TWIST: TV static and corrupted mirror
  { const st = cut(5);
    add({ id: 'S06', at: st, note: 'creepy drift in dark room with flicker', draw(lt, d, t, blit) {
      HN.update();
      cam.position.set(0.8, 1.7, lerp(-1.0, -3.0, eio(lt / d)));
      cam.lookAt(1.3, 1.7, -6);
      render(HN.scene, V3(1.3, 1.7, -4), { exposure: 1.1 + Math.sin(t * 18) * 0.25 });
      blit();
      K.dateStamp('ANOMALY', 'CORRUPTED REFLECTION', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'slide', { dur: 0.5, gain: 0.4 });
  }

  // 7 · SHELTER 3: Boiler bunker with steam pipes
  { const st = cut(6);
    add({ id: 'S07', at: st, note: 'industrial rusted room with steam and red light', draw(lt, d, t, blit) {
      FC.update(t);
      cam.position.copy(lerpV(V3(0.4, 1.4, -4.0), V3(0.0, 1.2, -8.0), eio(lt / d)));
      cam.lookAt(0, 1.0, -14);
      render(FC.scene, V3(0, 1.0, -12), { exposure: 1.5 });
      blit();
      K.dateStamp('SHELTER 03', 'BOILER BUNKER · STEAM PIPES', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 8 · SHELTER 3 TWIST: Temperature rising 5 degrees every 10 minutes
  { const st = cut(7);
    add({ id: 'S08', at: st, note: 'intense amber haze, steam glow', draw(lt, d, t, blit) {
      FC.update(t);
      cam.position.set(0.0, 1.2, lerp(-8.0, -11.0, eio(lt / d)));
      cam.lookAt(0, 1.0, -16);
      render(FC.scene, V3(0, 1.0, -14), { exposure: 1.7, bloom: 1.1 });
      blit();
      K.dateStamp('THERMAL ALERT', 'TEMP RISING // NO RELEASE', clamp(lt / 1.0), 80, 300);
    } });
    cue(st, 'thud', { gain: 0.5 });
  }

  // 9 · SHELTER 4: Boarded roadside diner
  { const st = cut(8);
    add({ id: 'S09', at: st, note: 'dark abandoned room, solitary phone silhouette', draw(lt, d, t, blit) {
      HN.update();
      cam.position.copy(lerpV(V3(-0.5, 1.5, 0.0), V3(0.2, 1.4, -2.5), eio(lt / d)));
      cam.lookAt(0, 1.0, -6);
      render(HN.scene, V3(0, 1.0, -4));
      blit();
      K.dateStamp('SHELTER 04', 'BOARDED DINER · ROTARY PHONE', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'whoosh', { gain: 0.5 });
  }

  // 10 · CLOSING HOOK: Phone whispers secrets, which door do you lock?
  { const st = cut(9);
    add({ id: 'S10', at: st, note: 'emergency countdown reaches zero', draw(lt, d, t, blit) {
      FC.update(t);
      cam.position.copy(lerpV(V3(0.0, 1.5, 0.0), V3(0.0, 1.8, 5.0), eio(lt / d)));
      cam.lookAt(0, 1.2, -8);
      render(FC.scene, V3(0, 1.2, -8), { fov: 46 });
      blit();
      K.dateStamp('SIREN SILENCED', 'WHICH DOOR DO YOU LOCK?', clamp(lt / 1.2), 80, 300);
    } });
    cue(st, 'slam', { gain: 0.7 });
  }

  return { shots: S, cues: CUES };
}
