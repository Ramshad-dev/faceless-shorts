# 🎮 3D PS1 & Silent Hill Style: Liminal, Dreamcore & "Choose 4 Planets" Narration Guide

This guide details the complete narration style, script formulas, visual art direction, and audio setup for creating retro PS1 / Silent Hill-style faceless shorts (such as *"Choose 4 Planets: You Must Live Here"* or liminal dreamcore survival hooks).

---

## 🧭 Workflow Folders Overview

| Folder | Purpose |
|---|---|
| **`input_music/`** | 🎵 Put your background audio tracks (`.mp3`, `.wav`, ambient drones, Silent Hill trip-hop beds). The audio mixer (`mix.py`) automatically ducks music under the AI voice. |
| **`output_videos/`** | 🎬 Where finished renders (`.mp4`), QA contact sheets (`.jpg`), and compressed mobile share copies are exported. |
| **`styles/ps1-liminal/STYLE.md`** | 📜 Official engine and visual style specification for the PS1 Liminal 3D renderer. |

---

## 🎙️ Narration Delivery & Voice Persona

### 1. The Persona: "The Purgatory Dispatcher"
- **Tone**: Clinical, hypnotic, calm, and subtly chilling. The voice speaks like an automated terminal, an eerie weather emergency broadcast, or a mysterious guide in an abandoned PS1 game.
- **Do NOT**: Sound energetic, hyped, or shout like a standard gaming creator.
- **Do**: Sound calm, low-frequency, unhurried, and existential.

### 2. Kokoro Voice Configuration
- **Primary Voice**: `am_onyx` (Deep, gravelly, calm, ominous).
- **Speed**: `0.92x` to `0.95x` (slightly slowed down to emphasize eerie spaces).
- **Alternative Voices**:
  - `am_fenrir`: Cold, authoritative, militaristic emergency broadcast.
  - `af_sky`: Uncanny, calm automated flight-system PA or synthetic entity.
- **Pacing & Gaps**: Keep line `gap` at **`0.45` to `0.65` seconds**. In horror and liminal spaces, the silence, room hum, and radio static do 50% of the emotional work.

---

## 🪝 5 Viral Hook Templates

### Hook A: The Relocation Ultimatum ("Choose 4 Planets")
> *"Earth has gone dark. You have ten seconds to choose one of four planets to inhabit forever. Pick carefully... because once your pod lands, you can never leave."*

### Hook B: The Dreamcore Elevator Trap
> *"You fell asleep on the subway and woke up in an elevator moving sideways. When it stops, it opens onto four impossible worlds. Which door do you open?"*

### Hook C: The Silent Hill Emergency Siren
> *"The town siren just began its four-minute cycle. Dense fog is crawling under your door. Four emergency shelters remain open. Three of them are death traps."*

### Hook D: The PS1 Memory Card Glitch
> *"Your PlayStation memory card loaded a corrupted file from 1999. It contains four coordinates that do not exist in our universe. Which file do you run?"*

### Hook E: The 30-Day Survival Challenge
> *"If you survive thirty days on one of these four planets, you win ten million dollars. But ninety-nine percent of people fail before sunrise."*

---

## 📜 Complete Production Scripts

### Script 1: "Choose 4 Planets: You Must Live Here Forever"
**Voice**: `am_onyx` | **Music**: `input_music/ambient_fog.mp3` or `"tension"` | **Duration**: ~38s

```json
{
  "title": "4 PLANETS YOU MUST LIVE HERE",
  "style": "ps1-liminal",
  "voice": "am_onyx",
  "music": "../../input_music/ambient_fog.mp3",
  "sources": ["Liminal space aesthetics", "Retro survival horror"],
  "lines": [
    {
      "text": "Earth is gone, and you must choose one of four planets to live on for the rest of eternity.",
      "caps": "EARTH IS *GONE | CHOOSE *ONE | OF FOUR *PLANETS",
      "gap": 0.5
    },
    {
      "text": "Planet one has endless fields of purple grass and pure clean water.",
      "caps": "PLANET *ONE | PURPLE *GRASS | CLEAN *WATER",
      "gap": 0.4
    },
    {
      "text": "The temperature is always comfortable, but the sun never sets, and the people you meet have no faces.",
      "caps": "NO *SUNSET | PEOPLE HAVE *NO FACES",
      "gap": 0.5
    },
    {
      "text": "Planet two is an infinite indoor shopping mall lit by buzzing fluorescent bulbs.",
      "caps": "PLANET *TWO | ENDLESS *MALL | BUZZING *LIGHTS",
      "gap": 0.4
    },
    {
      "text": "Food and soft beds are everywhere, but every hallway leads to the same empty clothing store.",
      "caps": "FOOD IS *EVERYWHERE | NO *EXIT",
      "gap": 0.5
    },
    {
      "text": "Planet three is drowning in thick cold fog and rusted iron catwalks.",
      "caps": "PLANET *THREE | COLD *FOG | RUSTED *CATWALKS",
      "gap": 0.4
    },
    {
      "text": "It is completely quiet, except for a radio on the asphalt that plays static whenever something is watching you.",
      "caps": "COMPLETELY *QUIET | RADIO *STATIC",
      "gap": 0.5
    },
    {
      "text": "Planet four has zero gravity and floating black monoliths.",
      "caps": "PLANET *FOUR | ZERO *GRAVITY | BLACK *MONOLITHS",
      "gap": 0.4
    },
    {
      "text": "You will never age, but within twenty-four hours, you will forget your own name.",
      "caps": "NEVER *AGE | FORGET YOUR *NAME",
      "gap": 0.55
    },
    {
      "text": "Which planet are you choosing? Tell me in the comments, before your shuttle touches down.",
      "caps": "WHICH PLANET DO YOU *CHOOSE? | COMMENT *BELOW",
      "gap": 0.6
    }
  ]
}
```

---

### Script 2: "The 4 Shelters of Silent Hill"
**Voice**: `am_onyx` | **Music**: `input_music/radio_drone.mp3` | **Duration**: ~35s

```json
{
  "title": "THE 4 SHELTERS OF SILENT HILL",
  "style": "ps1-liminal",
  "voice": "am_onyx",
  "music": "../../input_music/radio_drone.mp3",
  "sources": ["Silent Hill PS1 lore", "Psychological analog horror"],
  "lines": [
    {
      "text": "The air raid siren is blaring across town, and the fog is getting too thick to breathe.",
      "caps": "AIR RAID *SIREN | THICK *FOG",
      "gap": 0.5
    },
    {
      "text": "You have thirty seconds to pick one of four shelters to lock yourself inside.",
      "caps": "THIRTY *SECONDS | PICK *ONE SHELTER",
      "gap": 0.45
    },
    {
      "text": "Shelter one is an abandoned subway station with warm halogen lights and steel doors.",
      "caps": "SHELTER *ONE | SUBWAY *STATION | STEEL *DOORS",
      "gap": 0.4
    },
    {
      "text": "The doors lock securely, but footsteps keep pacing on the tracks right outside.",
      "caps": "DOORS *LOCK | PACING ON *TRACKS",
      "gap": 0.5
    },
    {
      "text": "Shelter two is a vacant hotel room on the fifth floor.",
      "caps": "SHELTER *TWO | VACANT *HOTEL | FIFTH *FLOOR",
      "gap": 0.4
    },
    {
      "text": "The television only shows white static, and every mirror reflects a room that is slightly different from yours.",
      "caps": "WHITE *STATIC | CORRUPTED *MIRRORS",
      "gap": 0.5
    },
    {
      "text": "Shelter three is an underground boiler room with steam pipes and industrial fans.",
      "caps": "SHELTER *THREE | BOILER *ROOM | STEAM *PIPES",
      "gap": 0.4
    },
    {
      "text": "Nothing can get in, but the heat rises by five degrees every twenty minutes.",
      "caps": "NOTHING GETS *IN | HEAT IS *RISING",
      "gap": 0.5
    },
    {
      "text": "Shelter four is an old diner with windows completely boarded with plywood.",
      "caps": "SHELTER *FOUR | BOARDED *DINER",
      "gap": 0.4
    },
    {
      "text": "The radio on the counter whispers your childhood secrets one by one.",
      "caps": "RADIO *WHISPERS | YOUR *SECRETS",
      "gap": 0.55
    },
    {
      "text": "The siren is about to stop. Which door are you locking behind you?",
      "caps": "SIREN IS *STOPPING | WHICH DOOR DO YOU *PICK?",
      "gap": 0.6
    }
  ]
}
```

---

## 🎨 PS1 & Silent Hill Visual Art Direction

When rendering 3D scenes in code (via Three.js canvas or custom shaders):

1. **Resolution & Pixelation**:
   - Render the 3D scene at low internal resolution (`360x640` or `270x480`), then blit to `1080x1920` using `imageSmoothingEnabled = false` (nearest-neighbor).
   - This produces authentic, crisp PS1 chunky pixels without blurry modern antialiasing.

2. **Affine Texture Warping & Vertex Snapping**:
   - Classic PS1 GPUs lacked perspective-correct texture mapping and floating-point vertex precision.
   - Snapping vertex positions to a grid in the vertex shader (`pos.xy = floor(pos.xy * 120.0) / 120.0`) creates that iconic nostalgic vertex "jitter" as the camera pans.

3. **Volumetric Distance Fog**:
   - Set Three.js fog: `scene.fog = new THREE.FogExp2('#5C6062', 0.08)`.
   - Distant walls and structures emerge slowly from the gray mist, creating mystery and hiding draw distances.

4. **Color Dithering**:
   - Apply an 8x8 Bayer matrix dither filter in post-processing to reduce 24-bit gradients down to crunchy 15-bit retro console color bands.

5. **Scanlines & CRT Curve**:
   - A subtle horizontal scanline overlay with faint RGB chromatic aberration at the extreme screen edges.

---

## 🎵 External Audio Integration (`input_music/`)

1. **Adding Your Track**:
   Drop your audio file into `c:\Others\faceless-shorts\input_music\`:
   - e.g., `input_music/silent_hill_theme.mp3` or `input_music/liminal_mallsoft.wav`.
2. **Referencing in Script**:
   ```json
   "music": "../../input_music/silent_hill_theme.mp3"
   ```
3. **Automated Audio Mixing**:
   Run the mixer script inside your project:
   ```bash
   python tools/mix.py .
   ```
   The mixer automatically:
   - Detects the spoken voice track (`data/narration.wav`).
   - Ducks the background music by **55%** during speech.
   - Normalizes audio to **-1 dBFS** true peak without clipping.
   - Smoothly fades out the music over the final 1.5 seconds.

---

## 🚀 How to Prompt opencode for This Style

Simply type:

```text
Make a ps1-liminal short: Choose 4 planets you must live on forever
Voice: am_onyx
Music: input_music/silent_fog.mp3
```

or for a liminal space / backrooms mystery:

```text
Make a ps1-liminal short: The 4 levels of the infinite poolrooms
Voice: am_onyx
Length: ~35 s
```
