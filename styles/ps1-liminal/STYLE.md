# PS1 Liminal 3D: Silent Hill, Dreamcore & "Choose 4 Planets" Survival Hooks (9:16)

Low-poly retro 3D horror, dreamcore surrealism, and liminal dilemmas. Atmospheric distance fog (Silent Hill), affine texture jitter, CRT scanline grain, uncanny lighting, and quiet existential dread. 
Primary format: **"Choose 4 Planets / Realms: You Must Live Here Forever"** and liminal survival what-ifs.

---

## 1. Visual Rules & Aesthetic Look
- **PS1 Hardware Emulation**:
  - Chunky low-polygon models, flat or gouraud-shaded faces, affine texture warping (no perspective correction jitter on camera moves).
  - Internal render scaled to 360x640 with nearest-neighbor upscaling, subtle scanlines, and 15-bit color dithering.
  - Heavy distance fog (Silent Hill volumetric wall): everything falls into dense mist at 12–18 units distance.
- **Color Palette & Worlds**:
  - **The Rust & Fog World (Silent Hill)**: Dense grimy gray fog `#7A7D7B`, oxidized steel rust `#8C3A27`, emergency halogen amber `#D48817`, siren crimson `#A81C1C`.
  - **The Liminal Dreamcore World**: Pale fluorescent cyan `#76D7C4`, eerie pastel lavender `#D2B4DE`, empty tile turquoise `#48C9B0`, vacant room yellow `#F9E79F`.
  - **The Glitched Void**: Deep black `#0B0C10`, CRT phosphor green `#39FF14`, vertex glitch magenta `#FF007F`.
- **Lighting**:
  - Exactly one flashlight beam or swinging halogen lamp per shot with a visible dust/fog cone (`lightCone`).
  - Distant silhouettes in the fog; unblinking low-poly figures that never move while the camera faces them.
- **Captions & UI**:
  - Monospace or retro bitmap typewriter font (`FreeMono`, `VT323`, or PS1 memory card UI style).
  - Placement: bottom center (`y: 1540`) or retro dialogue box.
  - Text color: Pale mist green `#A2D9CE` or CRT amber `#FAD7A0`, with the active spoken word highlighted in warning crimson `#E74C3C` or glitch cyan.
  - Planet labels / countdown pills: Top-left retro HUD cards (`PLANET 01 // ORBIT 94`, `HAZARD LEVEL: CRITICAL`).

---

## 2. Audio & Narration Direction
- **Voice Persona**:
  - **The Automated Emergency Broadcast / Purgatory Dispatcher**: Emotionless, hypnotic, clinical, calm yet unsettling. Never screaming, never upbeat.
  - Recommended AI Voice: `am_onyx` at speed `0.92x` - `0.95x` (deep, slow, quiet authority) or `am_fenrir` / `af_sky` at `0.88x` (uncanny automated terminal PA).
  - Voice Gaps: Deliberate pauses (`gap: 0.45` to `0.65` seconds) between lines so the background hum, radio static, and industrial silence create tension.
- **Background Music**:
  - Set in `script.json`: `"music": "../../input_music/your_ambient_track.mp3"` or built-in `"tension"`.
  - Recommended style: Detuned acoustic strings, industrial drone (55 Hz hum), distant air raid siren reverberation, vinyl crackle, slow tape warble.
- **Sound Effects (Cue Types)**:
  - Radio static burst (`whoosh` / `zip` with high-pass filter) at every scene cut.
  - Heavy metal bulkhead latch (`slam`).
  - Low resonant church bell or sub-bass drop (`thud`).
  - Geiger counter or clock tick (`tock`).
  - Distant warning klaxon (`alarm`).

---

## 3. Story Shape: The "Choose 4 Planets" Formula
Duration: **35–45 seconds** (10–13 cuts, ~95–115 words).

| Timestamp | Story Beat | Visual Shot (PS1 / Liminal) | Narration Goal |
|---|---|---|---|
| **0:00 - 0:05** | **The Hook / Trap** | Low-poly terminal screen or fog-covered highway sign; radio static. | Present the impossible choice: "Earth is gone. You are forced to relocate to one of four planets." |
| **0:05 - 0:13** | **Planet 1: The False Haven** | Pastel skies, infinite quiet fields or calm pink ocean, frozen low-poly sun. | Appears peaceful, but has an uncanny, psychological catch ("No night, and everyone speaks in familiar voices"). |
| **0:13 - 0:21** | **Planet 2: The Liminal Facility** | Infinite empty fluorescent-lit mall corridors, damp carpets, yellowed tiled pools. | Dry and safe with food, but infinite and impossible to navigate ("You can walk for centuries and never find an exit"). |
| **0:21 - 0:29** | **Planet 3: The Silent Hill World** | Heavy gray fog, rusted catwalks, flickering sodium lamp, distant radio on sidewalk. | Pure psychological horror ("Breathable air, but the static screams whenever you are not looking"). |
| **0:29 - 0:37** | **Planet 4: The Glitched Void** | Inverted black skies, vertex-jittering geometric monoliths, floating polygonal fragments. | Forbidden cosmic anomaly ("No gravity, no physics, and anyone who lands here forgets their own identity in seconds"). |
| **0:37 - 0:42** | **The Closing Loop** | Rapid cut between all 4 planet glyphs; countdown timer reaches 00:01. | "Which planet are you choosing? Leave your answer below... your shuttle is already descending." (Seamless loop). |

---

## 4. Viral Hook Library

Use any of these proven hooks to start your video:

### Hook 1: The Planetary Relocation Protocol (Core "Choose 4 Planets")
> *"Earth has officially been decommissioned. You must choose one of four uncharted planets to live on for the rest of eternity. Pick carefully... because once your shuttle doors open, there is no coming back."*

### Hook 2: The Dreamcore Elevator
> *"You fell asleep in an empty elevator at 3 AM. When the bell rings, the doors open to four impossible floors. You have ten seconds to step into one."*

### Hook 3: The Silent Hill Siren Broadcast
> *"If you can hear this broadcast, the fog has officially swallowed your town. There are four remaining shelters in the district. Three of them are death traps. One is safe."*

### Hook 4: The 4 Liminal Levels
> *"You noclipped out of reality into the backrooms of the universe. Four levels lie ahead. Each one comes with a survival rule you cannot break."*

### Hook 5: The PS1 Memory Card Corrupted Save
> *"Your memory card just loaded a forgotten save file from 1999. It contains four coordinates that do not exist on any map. Which one do you boot?"*

---

## 5. Complete Sample `script.json`

This is a production-ready script formatted for the faceless-shorts pipeline:

```json
{
  "title": "CHOOSE 4 PLANETS: YOU MUST LIVE HERE",
  "style": "ps1-liminal",
  "voice": "am_onyx",
  "music": "../../input_music/silent_fog.mp3",
  "sources": [
    "Liminal space psychological studies",
    "Analog horror aesthetic guidelines"
  ],
  "lines": [
    {
      "text": "Earth is gone, and you must choose one of four planets to survive on forever.",
      "caps": "EARTH IS *GONE | CHOOSE *ONE | OF FOUR *PLANETS",
      "gap": 0.5
    },
    {
      "text": "Planet one is called Solitude. The air is warm and the oceans are fresh water.",
      "caps": "PLANET *ONE: SOLITUDE | WARM *AIR | FRESH *WATER",
      "gap": 0.4
    },
    {
      "text": "But the sun never sets, and the shadows on the ground do not belong to you.",
      "caps": "THE SUN NEVER *SETS | UNKNOWN *SHADOWS",
      "gap": 0.5
    },
    {
      "text": "Planet two is an endless indoor city of empty fluorescent hallways and warm carpet.",
      "caps": "PLANET *TWO: INDOOR *CITY | EMPTY *HALLWAYS",
      "gap": 0.4
    },
    {
      "text": "There is plenty of food and clean water, but every hallway looks identical, and you can never find an exit.",
      "caps": "PLENTY OF *FOOD | NO *EXIT",
      "gap": 0.5
    },
    {
      "text": "Planet three is covered in dense iron fog and abandoned rusty catwalks.",
      "caps": "PLANET *THREE: IRON *FOG | RUSTY *CATWALKS",
      "gap": 0.4
    },
    {
      "text": "It is completely quiet, until an air raid siren echoes across the mist at midnight.",
      "caps": "COMPLETELY *QUIET | SIREN AT *MIDNIGHT",
      "gap": 0.5
    },
    {
      "text": "Planet four has zero gravity and shifting black geometric pyramids.",
      "caps": "PLANET *FOUR: ZERO *GRAVITY | SHIFTING *PYRAMIDS",
      "gap": 0.4
    },
    {
      "text": "It grants you eternal life, but within three days, you will forget every memory you ever had.",
      "caps": "ETERNAL *LIFE | FORGET ALL *MEMORIES",
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

## 6. QA Checklist for PS1 Liminal Shorts
Before delivering your video, verify:
- [ ] **Fog Density**: Distant geometry fades gracefully into fog; no abrupt clipping planes.
- [ ] **Pacing**: Voice does not sound rushed; speech gap is at least `0.45s` between options.
- [ ] **Captions**: Monospace / retro font, readable against dark textures, exactly one highlighted red/amber word.
- [ ] **Audio Balance**: Background music from `input_music/` ducks cleanly beneath the voice (`-24 dBFS` music vs `-19 dBFS` voice).
- [ ] **Loop Continuity**: The final line transitions naturally back into the opening hook question.
