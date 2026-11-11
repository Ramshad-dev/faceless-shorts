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

## Install

**You need:** Node.js 22+ · ffmpeg · Google Chrome · Python 3.10+ · ~1 GB of disk for the voice and Whisper
models. The setup script checks all of it; anything missing, opencode installs for you when you run setup
from a session.

### 1. Install opencode

opencode is the open-source coding agent that runs this skill (terminal, desktop or web).

```bash
curl -fsSL https://opencode.ai/v2/install | bash   # macOS / Linux
brew install anomalyco/tap/opencode-v2             # Homebrew
npm install -g @opencode/cli                       # any OS with Node
```

Windows: download the standalone CLI binary from [opencode.ai](https://opencode.ai) and run `opencode` from
PowerShell (Windows package managers aren't supported). On first launch, connect a model provider with
`/connect`, or sign in to OpenCode Console.

### 2. Add the skill

Clone this repo into opencode's global skills folder — `~/.config/opencode/skills/faceless-shorts/`
(on Windows: `%USERPROFILE%\.config\opencode\skills\faceless-shorts`):

```bash
mkdir -p ~/.config/opencode/skills
git clone https://github.com/Ramshad-dev/faceless-shorts.git ~/.config/opencode/skills/faceless-shorts
```

Already have the folder elsewhere? Copy or symlink it there instead. Any new opencode session picks the skill
up automatically (a project-local `.opencode/skills/faceless-shorts/` works too).

### 3. Run setup once

Checks Node, ffmpeg and Chrome; builds a private Python env in `~/.faceless-shorts/venv`; downloads the Kokoro
voice (~340 MB) and Whisper small.en (~0.5 GB); installs the motion renderer's npm packages. Safe to re-run
until it prints **All set**:

```bash
bash ~/.config/opencode/skills/faceless-shorts/scripts/setup.sh
```

(Tip: skip the terminal and just ask an opencode session "set up the faceless-shorts skill" — it runs this and
installs anything missing.)

### 4. Self-test

Renders a tiny clip through the whole pipeline for every style (~2-4 min); must print **SELFTEST PASSED**:

```bash
bash ~/.config/opencode/skills/faceless-shorts/scripts/selftest.sh
```

**Windows:** run the scripts above in Git Bash (installed with Git for Windows). opencode's shell on Windows is
PowerShell, where plain `bash` resolves to a WSL stub — invoke Git Bash explicitly:
`& "C:\Program Files\Git\bin\bash.exe" "$env:USERPROFILE\.config\opencode\skills\faceless-shorts\scripts\setup.sh"`

## Example

Start a new opencode session (in any folder) and type:

```
Make a Deep Dive 3D short: what happens if you crack your knuckles?
```

Then, hands-off:

1. **Intake** — it asks only what's still unknown, all in one message (say "just go" for every default:
   ~30 s, `am_michael` voice, built-in music bed).
2. **The plan** — one screen: title, the full narration line by line with caption chunks
   (`WHAT IF *YOU | CRACK YOUR *KNUCKLES?`), the shot list, facts and their sources. Reply "Build it".
3. **Build** — script → local Kokoro voice → Whisper word timings → shots drawn in code, every cut and
   caption placed on its word → procedural sound + music → headless Chrome captures every frame → ffmpeg
   renders the MP4.
4. **QA** — the agent reads a contact sheet of the whole video before you see it, fixes what it catches,
   and tells you what it caught.
5. **Deliver** — the finished MP4 opened for you, plus a share copy, cover frame, title, caption and
   hashtags. The project lives in `~/faceless-shorts/<short-name>/` if you want to tweak it.

More one-liners that work the same way:

```
Make a Night File 3D short about D.B. Cooper.
Make a Paper Atlas short: how the Great Fire of London started.
Make a Stick Story short: what to do if the power goes out for 3 days.
Make a motion look whiteboard short explaining how DNS works.
You pick 3 ideas for a Tall Tale 3D short, then build my favourite.
```

Full prompt format, all style ids and all 74 motion looks: `prompt-format.md`
(list them live: `bash scripts/new_video.sh --list`).

**Layout:** `SKILL.md` (what the agent follows) · `scripts/` (setup, selftest, new_video, voice, words, estimate) ·
`styles/<style>/` (`style-sheet.png`, `STYLE.md`, `example/` = a complete project that renders as-is) ·
`motion/` (74 explainer looks + engine + scene templates; see `motion/MOTION.md`).

**Licenses:** the code, stories, drawings and sound are original and free to use in your videos. Inter font: SIL Open Font
License 1.1. Installed on first use: Kokoro-82M (Apache-2.0) via kokoro-onnx (MIT), faster-whisper + Whisper small.en (MIT),
numpy, scipy. The `motion/` suite is MIT (from kevinbadi/claude-motion-faceless-skills); its styles load fonts from
Google Fonts at render time.
