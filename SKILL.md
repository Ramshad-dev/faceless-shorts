---
name: faceless-shorts
description: Make narrated faceless YouTube Shorts / TikToks / Reels fully in code on the user's computer, with a free local AI voice and word-synced captions, $0. Six styles - Deep Dive 3D (Zack D. Films-like 3D "what happens if" body/science explainers), Night File 3D (unsolved mysteries, true crime), Inside Out (flat 2D x-ray explainers), Stick Story (stick-figure "what would you do if" survival steps), Paper Atlas (history in cut paper with maps), Tall Tale 3D (funny true stories with flat 2D cartoon people in a sunny 3D world, one-word captions). Use whenever someone wants a faceless short, a what-if or what-happens-if explainer, a Zack D. Films style video, a mystery or true-crime short, a stick-figure story, a history short, a funny true story or storytime cartoon short, or a video in one of these styles, even from just a topic. Also carries a 74-look motion-style suite (whiteboard, chalkboard, watercolor, claymation, CRT terminal, Game Boy, synthwave, manga, ukiyo-e, blueprint, film noir, isometric, voxel, kinetic type): use when the user asks for an animated explainer, a motion graphic, B-roll in the style of a medium, a "<style> version" of a topic, or to compare looks for a video.
---

# Faceless Shorts

You make a finished vertical short from a topic: script, voice, word-synced captions, animated shots, sound and
music, rendered to MP4. **Everything is code**: canvas drawing, headless Chrome capture, ffmpeg, a local Kokoro voice,
local Whisper word timing, numpy sound. No AI images or video, no API keys, no credits.
`SKILL` = the folder this file is in. Projects live in `~/faceless-shorts/<short-name>/`.

| style | what it makes | length · aspect |
|---|---|---|
| **Deep Dive 3D** `deep-dive` | the flagship, Zack D. Films-like: sculpted 3D people in sunlit sets, glowing x-ray bodies, camera journeys through blood vessels, shallow focus. "What happens if…?" body and science | 30-45 s · 9:16 |
| **Night File 3D** `night-file` | unsolved mysteries / true crime: dark 3D places with one light, faceless people (the subject glows red), typewriter dates, case-file inserts | 30-45 s · 9:16 |
| **Inside Out** `inside-out` | flat 2D "What happens if…?" explainer: a simple hero, x-ray cutaways, bold 1-3 word captions, punchy cuts | 25-40 s · 9:16 |
| **Stick Story** `stick-story` | "What would you do if…?" survival steps: stick people with acting eyes, flat rooms day/night, gold step cards | 30-45 s · 9:16 |
| **Paper Atlas** `paper-atlas` | history in cut paper: parchment maps, crimson routes, gold date ribbons, period figures | 30-45 s · 9:16 |
| **Tall Tale 3D** `tall-tale` | funny true stories: flat 2D cartoon people (big round heads, ink outlines) acting in a sunny 3D small-town world, camera always moving, one-word captions | 40-60 s · 9:16 |
| **Motion looks** `motion/` | 74 scene-based explainer looks from ONE engine: whiteboard, chalkboard, watercolor, stained glass, risograph, claymation, manga, ukiyo-e, CRT terminal, Game Boy, synthwave, isometric, voxel, film noir, transit map, kinetic type and more. Write one scene; any look renders it. Synth sound score built in, narration optional | 12-60 s · 16:9 or 9:16 |

Which style: body / health / science "what happens if" → **Deep Dive 3D** (or **Inside Out** for a lighter, faster 2D
look) · creepy, unexplained, true crime, "this happened in 1971" → **Night File 3D** · survival, life hacks, "here's what
you do" → **Stick Story** · a historical event, "how X happened" → **Paper Atlas** · a funny or clever true story, a con, a loophole, "this guy did X" → **Tall Tale 3D**. Anything else - a data, process, tech or concept explainer, or a named medium
("make it look like an old newspaper", "claymation") - use a **motion look** (`motion/`, 74 of them; search
`motion/index.json` names and looks, offer the 2 or 3 closest). If it isn't obvious, ask once.

Each style = `styles/<style>/style-sheet.png` (the look in one image, drawn by the style's own code) + `STYLE.md` (the rules + the engine manual) +
`example/` (a complete project that renders as-is). **Read the style's STYLE.md in full before planning.**

## 0. First use on a computer
`bash SKILL/scripts/setup.sh` until it prints **All set** (checks Node 22+, ffmpeg, Chrome; builds `~/.faceless-shorts/venv`;
downloads the Kokoro voice ~340 MB and Whisper small.en ~0.5 GB). Install anything missing the free, official way, and ask
before anything that needs a password. Then `bash SKILL/scripts/selftest.sh` must print **SELFTEST PASSED**: open the
contact sheet and clip it names and look at them.

**Windows (opencode runs PowerShell here):** plain `bash` resolves to a WSL stub, so run every script in this skill
through Git Bash explicitly, e.g. `& "C:\Program Files\Git\bin\bash.exe" "SKILL/scripts/setup.sh"` (Git for Windows).
Bash-style env prefixes (`SOFTWARE_GL=1 QS='&res=0.6&aa=0&shadow=1024' FPS=24 node tools/capture.mjs ...`) become
PowerShell assignments: `$env:SOFTWARE_GL='1'; $env:QS='&res=0.6&aa=0&shadow=1024'; $env:FPS='24'; node tools/capture.mjs ...`.

## 1. Intake (ONE message, defaults filled in)
Ask only what's unknown, all at once: topic (or "you pick 3 ideas"), a link to a short whose format they like (optional),
length (default ~30 s), voice (`SKILL/scripts/py SKILL/scripts/voice.py --list`; default `am_michael`), voiceover mode:
**AI voice** (default) · **their own recording** (they record after seeing the script; `words.py --audio`) ·
**captions-only** (no voice yet; `estimate.py`), music (built-in bed · none · their own royalty-free file), end line / handle.
"Just go" = the defaults.

## 2. The plan (ONE screen, then wait)
Show: title · the full narration, one line per cut, with its caption chunks (`WHAT IF *YOU | SWALLOW *GUM?`) · the shot list,
one line each (what we see, what moves, which word it lands on) · new components you'll add to the kit, if any · facts and
their sources. Ask **"Build it?"** and wait.

**Script rules.** Write it the way a person actually talks to a friend: full, flowing sentences with connecting words
("Well,", "where", "but", "so", "which means"), not a list of short caption-like statements. ~90-110 words for 35 s.
**A line is a CUT, not a sentence**: split each sentence into 1-3 lines at natural pauses (commas, "and", "where"), so
the picture changes every 1.5-3.5 s while the voice keeps flowing (voice.py speaks each whole sentence in one pass).
Shape: hook question, then escalation, a myth or surprise, a twist ("but if you…"), a punchy last line that loops.
Write numbers as they're said ("seven"). Read it out loud in your head: if it sounds like captions, rewrite it.
Original writing only: take a format you like, never another creator's script or shots. Every fact is checked against a
reliable source (list them in `script.json` "sources"). Health topics: accurate, no gore, no scary misinformation.

## 3. Build
1. `bash SKILL/scripts/new_video.sh <style> <short-name>` copies the example into `~/faceless-shorts/<short-name>/`.
2. Write `script.json` (lines + caps + gaps; see STYLE.md).
3. Timing: `SKILL/scripts/py SKILL/scripts/voice.py <proj>` then `SKILL/scripts/py SKILL/scripts/words.py <proj>`
   (own recording: `words.py <proj> --audio their.m4a`; captions-only: `estimate.py <proj>`).
4. Rewrite `src/shots.js`: one shot per line (or two for long lines), each placed with `cut(i)` and its key moments on
   words with `Wd('word', line)`. Reuse the kit (`src/core/kit.js`); add new components there, in the style's look.
5. In the project: `node tools/capture.mjs check` (must say CHECK OK) → `node tools/capture.mjs cues` →
   `SKILL/scripts/py tools/mix.py .` → QA (section 4) → `node tools/capture.mjs video renders/<name>.mp4`.
   Iterating on one shot: `node tools/capture.mjs frames review/f "4.2,4.6"` and look.

## 4. QA: never show a frame you haven't looked at
`node tools/capture.mjs sheet review/all.jpg 0.5 10` (a frame every 0.5 s, time-stamped) and read the whole sheet, then key
frames full size. For every frame ask:
- **Does it make sense?** One visual mode per shot: if the body is x-ray, ALL of it is x-ray (no shirt sleeves on an x-ray
  body). Props move with whatever holds them (gum stays in the hand until the hand reaches the mouth). Nothing appears before
  its cause.
- **Does it match the narration at that moment?** The picture changes just before its line; reveals land on their word.
- **Is anything colliding?** Moving things never cross labels, pills, the caption zone (y 1250-1550) or each other by accident.
- **Captions:** 1-3 words, exactly one yellow word, spelled right, on the word being said, readable on a phone.
- **Style sheet:** only the palette, flat shapes, x-ray views in cyan, danger in red.
- **Sound:** voice clear over the music; effects soft (no harsh ticks or beeps).
Fix, re-render the sheet, re-check. Tell the user what you caught and fixed.

## 5. Deliver
Open the MP4 for the user. Also give: a share copy if > 35 MB (`ffmpeg -i in.mp4 -c:v libx264 -crf 21 -preset slow -c:a aac
-b:a 160k -movflags +faststart share.mp4`), the best cover frame (`capture.mjs frames`), a title, a caption and 5-8 hashtags.
For own-recording mode, also give them the script with each line's timing to read against. Offer one round of precise changes
and re-render only what changed.

## 5b. Publish to YouTube (only when the user asks to upload)
This writes to the user's real channel, so confirm before doing anything: title, visibility (private / unlisted / public)
and category (Comedy = 23, Education = 27, Pets & Animals = 15). opencode has no built-in YouTube or Zapier tools:
- If a Zapier MCP (or similar upload integration) is configured, use its upload action; it needs a URL its servers can
  fetch, not a local path — host the MP4 first (below). A vertical video of 60 s or less becomes a Short automatically
  (no extra field); the result's `id` gives the link `https://www.youtube.com/watch?v=<id>`.
- If nothing is configured, don't attempt the upload: hand over the MP4 and offer manual upload instead
  (YouTube Studio → Create → Upload videos).
Hosting the MP4 for an integration that needs a URL (on Windows use `curl.exe`; hosts tested 2026-11-03):
- a. **litterbox** (1 h to 72 h expiry, up to 1 GB): `curl -F "reqtype=fileupload" -F "time=1h" -F "fileToUpload=@renders/<name>.mp4" https://litterbox.catbox.moe/resources/internals/api.php` → returns the direct URL as plain text.
- b. **uguu.se** (about 3 h expiry, good for shorts under 35 MB): `curl -F "files[]=@renders/<name>.mp4" https://uguu.se/upload` → returns JSON; use `files[0].url` (the `d.uguu.se/...` link).
- c. **catbox** (permanent, no expiry): same call as (a) without `-F "time=1h"`. Public forever, so only with the user's OK.
- Skip these (verified broken 2026-11-03, don't waste retries): 0x0.st (uploads disabled), tmpfiles.org (link is a viewer page, not the raw file), gofile.io (raw download needs an account token), file.io (curl API redirects to its web app), bashupload.com, temp.sh (dead).
- **Always verify** the URL before using it: `curl -sSI <url>` must return 200/206 with a video content-type. Never trust a host's JSON without checking.
- Tell the user this puts their video on a public temp host that expires by itself.
Open the local MP4 for the user too (Windows: `Start-Process renders\<name>.mp4`). Unlisted uploads usually can't take a
custom thumbnail; offer the saved cover frame if the user later makes the video public.

## Motion looks (74 styles, one engine) - `motion/`
The scene-based half of this skill: write ONE scene for the topic and ANY of the 74 looks renders it unchanged. No
word-synced captions, no per-style kit - a canvas renderer + synthesized sound score, frames captured in headless Chrome,
ffmpeg to MP4. **Read `motion/MOTION.md` in full before the first motion job.** In short:
- **Choose:** browse `motion/index.json` (86 listed, 74 built - only ids with a `motion/styles/<id>.js` render) or
  `bash SKILL/scripts/new_video.sh --list` (prints every narrative style and all 74 motion looks), make a
  contact sheet with `node motion/engine/gallery.mjs --out sheet.jpg`, read the pick's `motion/styles/<id>.md` card, watch
  its demo: `node motion/engine/render.mjs --style <id> --out demo.mp4` (or preview live in
  `motion/engine/player.html?style=<id>`). `node motion/engine/check-all.mjs` (add `--portrait`) smoke-tests every look;
  re-run it if one misbehaves.
- **Build:** `bash SKILL/scripts/new_video.sh motion/<id> <short-name>` scaffolds the project (`scene.js` from
  `motion/templates/scene.js` plus `data/`, `renders/`, `review/`); write the beats with the style's primitives
  (`S.background/title/label/arrow/box/counter/emphasis/transition/finish`, per `motion/STYLE_CONTRACT.md`). Every frame
  is a pure function of t; seeded `K.rng`/`K.noise` only, never `Math.random`. Hook inside ~2 s, something changing every
  1-2 s, arrows that draw on to show cause, one medium-true scene change, emphasis on the key number, a held takeaway.
- **Check, then render:** stills at every beat (`--stills 1,3,5,7,9,11 --out <dir>`) and LOOK at them, then
  `node motion/engine/render.mjs --style <id> --scene /abs/path/scene.js --out renders/<name>.mp4`; vertical adds
  `--size 1080x1920` (layouts must read on a phone: `K.layout(W, H)`, headlines >= 44px, labels >= 28px).
- **Narration (optional, same voice pipeline):** voice.py + words.py in the project as usual, time the scene's beats to
  the word stamps in `data/words.json` - never to guessed pacing - render with `--voiceover` (SFX sit lower, beds drop
  out), then mux: `ffmpeg -i scene.mp4 -i data/narration.wav -filter_complex amix=inputs=2:normalize=0 <name>.mp4`.
- Motion engine commands run in PowerShell directly (no Git Bash needed); Chrome is auto-detected on Windows, or set
  `CHROME_PATH`.

## Adding a new style (when the user asks)
Make `styles/<new-style>/` with `style-sheet.png`, `STYLE.md` (same sections as Inside Out: look rules, palette, format,
engine/kit map, components, shot anatomy, cue types, QA pitfalls) and a complete `example/`. Copy Inside Out's
`tools/`, `index.html`, `src/main.js`, `src/core/{lib,timing,captions}.js`, then build the new look's kit and shots. The
shared scripts (voice, words, estimate, new_video, selftest) work unchanged. Add a row to the table above and run
`selftest.sh` until every style passes.

## 3D styles (Deep Dive, Night File, Tall Tale)
They render real 3D with three.js in headless Chrome. With a graphics card it's fast and full quality. Without one
(a laptop without GPU acceleration, a cloud sandbox) render with `SOFTWARE_GL=1 QS='&res=0.6&aa=0&shadow=1024'
FPS=24` in front of `node tools/capture.mjs ...` (≈2 s per frame; tell the user the render time up front, run it in the
background, and QA with `sheet review/all.jpg 1 10` first). Their STYLE.md files list the 3D API.

## Never
Generate images or video with AI; spend the user's money or credits; upload to YouTube or any host without the user asking and confirming; copy another creator's script, shots or frames;
overwrite a user's project without asking; ship a frame you haven't looked at.
