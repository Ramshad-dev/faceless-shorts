# 🎬 Prepared PS1 Liminal Shorts Projects

This directory contains 3 fully prepared, ready-to-render vertical faceless short projects in the **`ps1-liminal`** (Silent Hill / Dreamcore) style.

---

## 📁 Prepared Shorts

### 1. [`shorts/01-four-planets/`](file:///c:/Others/faceless-shorts/shorts/01-four-planets/)
* **Title**: *"4 Planets You Must Live Here"*
* **Hook**: The Planetary Relocation Ultimatum
* **Duration**: ~61 seconds (or ~38s with sped up voice delivery)
* **Visuals**: Low-poly 3D celestial void, Pastel Eden with rings, glowing yellow backrooms cube, iron rusted fog moon with rotating beacon, glitched black pyramidal obelisk.
* **Voice**: `am_onyx` (deep, calm dread)

### 2. [`shorts/02-silent-hill-shelters/`](file:///c:/Others/faceless-shorts/shorts/02-silent-hill-shelters/)
* **Title**: *"The 4 Shelters of Silent Hill"*
* **Hook**: 30-Second Air Raid Siren Countdown
* **Duration**: ~58 seconds
* **Visuals**: Dense gray-green volumetric distance fog, emergency rotating beacon, abandoned subway station, flickering hotel room 502, industrial steam boiler bunker, boarded roadside diner.
* **Voice**: `am_onyx`

### 3. [`shorts/03-dreamcore-elevator/`](file:///c:/Others/faceless-shorts/shorts/03-dreamcore-elevator/)
* **Title**: *"The 4 Floors of the Dreamcore Elevator"*
* **Hook**: The Unnumbered Liminal Elevator
* **Duration**: ~63 seconds
* **Visuals**: Retro elevator cabin, infinite cyan poolrooms with rising water, carpeted 1998 play place, endless purple sunset rooftop with no ground below, silent white gallery.
* **Voice**: `am_onyx`

---

## 🚀 How to Run and Render

### Step 1: Preview in Your Browser
Inside any short directory (e.g. `shorts/01-four-planets/`):
```bash
node tools/capture.mjs preview
```
Open the printed local URL (`http://127.0.0.1:8765/`) in Chrome or Edge to watch the full 3D animation, camera moves, and captions in real-time.

### Step 2: Render to Output MP4
Render directly to your [`output_videos/`](file:///c:/Others/faceless-shorts/output_videos/) folder:
```bash
node tools/capture.mjs video ../../output_videos/01-four-planets.mp4
```

### Step 3: Add Custom Background Music (Optional)
Drop an ambient track or drone into [`input_music/`](file:///c:/Others/faceless-shorts/input_music/) (e.g. `input_music/silent_fog.mp3`), update `script.json` `"music": "../../input_music/silent_fog.mp3"`, and run:
```bash
python tools/mix.py .
```
The music will automatically duck by 55% during voice lines and fade out at the end.
