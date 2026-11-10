# Faceless Shorts: a free opencode skill

Narrated faceless shorts (YouTube Shorts, TikTok, Reels) made 100% in code on your own computer: script, AI voice,
word-synced captions, animation, sound effects and music, rendered to MP4. No AI video, no API keys, no credits.

**Styles** (each has a style sheet, a style guide and a finished example video project)
1. **Deep Dive 3D** (flagship): Zack D. Films-like 3D "What happens if…?" explainers. Example: *What happens if you hold your breath?*
2. **Night File 3D**: unsolved mysteries and true crime in dark 3D rooms. Example: *The man who jumped out of a plane* (D.B. Cooper).
3. **PS1 Liminal 3D**: retro low-poly psychological horror & dreamcore: Silent Hill distance fog, affine jitter, scanlines. Example: *Choose 4 planets: you must live here*.
4. **Inside Out**: flat 2D x-ray explainers. Example: *What if you swallow gum?*
5. **Stick Story**: stick-figure survival steps. Example: *What if the power went out for 3 days?*
6. **Paper Atlas**: history in cut paper and maps. Example: *How one bakery burned down London*.
7. **Tall Tale 3D**: funny true stories, flat 2D cartoon people in a sunny 3D world. Example: *The girl who was mailed to grandma*.

**Plus 74 motion looks** (`motion/`): scene-based animated explainers from one shared engine - whiteboard, chalkboard,
watercolor, stained glass, claymation, manga, ukiyo-e, CRT terminal, Game Boy, synthwave, isometric, voxel, film noir,
transit map, kinetic type and more. Write one scene for your topic and any look renders it (16:9 or 9:16), with a
synthesized sound score; narration optional through the same voice pipeline. Every look is a first-class style:
`bash scripts/new_video.sh --list` shows all 80 (6 narrative + 74 motion), and
`bash scripts/new_video.sh motion/<id> <name>` starts a project for one.

**How it works**
script.json → Kokoro voice (local, free) → Whisper word timings (local, free) → shots drawn in code, each cut and caption
placed on its word → procedural sound + music → headless Chrome captures every frame → ffmpeg renders the MP4.
The agent checks a contact sheet of the whole video before you ever see it.
Optional: when you ask, and a Zapier MCP or similar upload integration is configured, it uploads the finished short to
your YouTube channel (it confirms title, visibility and category first).

**Needs:** opencode, Node.js 22+, ffmpeg, Google Chrome, Python 3.10+, ~1 GB for the
voice and Whisper models. opencode installs what's missing.

**Windows:** run the scripts in Git Bash (installed with Git for Windows). opencode's shell on Windows is PowerShell,
where plain `bash` resolves to a WSL stub — invoke Git Bash explicitly:
`& "C:\Program Files\Git\bin\bash.exe" scripts/setup.sh`

**Install:** put this folder at `~/.config/opencode/skills/faceless-shorts/`, then run `bash scripts/setup.sh` (prints "All set")
and `bash scripts/selftest.sh` (prints "SELFTEST PASSED"). Start a new opencode session and ask:
"Make a Deep Dive 3D short: what happens if you crack your knuckles?"

**Layout:** `SKILL.md` (what the agent follows) · `scripts/` (setup, selftest, new_video, voice, words, estimate) ·
`styles/<style>/` (`style-sheet.png`, `STYLE.md`, `example/` = a complete project that renders as-is) ·
`motion/` (74 explainer looks + engine + scene templates; see `motion/MOTION.md`).

**Licenses:** the code, stories, drawings and sound are original and free to use in your videos. Inter font: SIL Open Font
License 1.1. Installed on first use: Kokoro-82M (Apache-2.0) via kokoro-onnx (MIT), faster-whisper + Whisper small.en (MIT),
numpy, scipy. The `motion/` suite is MIT (from kevinbadi/claude-motion-faceless-skills); its styles load fonts from
Google Fonts at render time.
