# Faceless Shorts: Prompt Format & Style List

Copy a prompt below, fill what you know, and send it to opencode. Anything you leave out uses the defaults.
Say **"just go"** to accept every default in one shot.

---

## 1. Prompt format

```
Make a <style> short about: <topic>
Style:        <deep-dive | night-file | inside-out | stick-story | paper-atlas | tall-tale | motion/<look-id>>
Length:       <~30 s>                      (default 30 s; range 12-60 s)
Voice:        <am_michael>                 (default am_michael; `voice.py --list` for all)
Voiceover:    <AI voice | my recording | captions-only>   (default AI voice)
Music:        <built-in bed | none | my file>            (default built-in bed)
End line:     <subscribe text / handle>    (optional)
Reference:    <link to a short whose format you like>    (optional)
Ideas:        <you pick 3 ideas>           (use instead of a topic)
```

### Minimal prompts

```
Make a Deep Dive 3D short: what happens if you crack your knuckles?
Make a Night File 3D short about D.B. Cooper.
Make a Paper Atlas short: how the Great Fire of London started.
Make a motion look whiteboard short explaining how DNS works.
You pick 3 ideas for a Stick Story short, then build my favourite.
```

### What happens next

1. **Intake** - opencode asks only what is still unknown, all in one message.
2. **The plan** (one screen, then it waits): title, full narration line by line with caption chunks,
   shot list (what we see, what moves, which word it lands on), new components, facts and sources.
   Reply **"Build it?"** with go / changes.
3. **Build** - script, voice, word timings, shots, sound, capture, render.
4. **QA** - every frame checked on a contact sheet before you see the video.
5. **Deliver** - MP4, share copy, cover frame, title, caption, hashtags.

---

## 2. Narrative styles (6)

| ID | Name | What it makes | Length | Aspect |
|---|---|---|---|---|
| `deep-dive` | **Deep Dive 3D** | The flagship, Zack D. Films-like: sculpted 3D people in sunlit sets, glowing x-ray bodies, camera journeys through blood vessels, shallow focus. "What happens if…?" body and science. | 30-45 s | 9:16 |
| `night-file` | **Night File 3D** | Unsolved mysteries / true crime: dark 3D places with one light, faceless people (the subject glows red), typewriter dates, case-file inserts. | 30-45 s | 9:16 |
| `inside-out` | **Inside Out** | Flat 2D "What happens if…?" explainer: a simple hero, x-ray cutaways, bold 1-3 word captions, punchy cuts. Lighter and faster than Deep Dive. | 25-40 s | 9:16 |
| `stick-story` | **Stick Story** | "What would you do if…?" survival steps: stick people with acting eyes, flat rooms day/night, gold step cards. | 30-45 s | 9:16 |
| `paper-atlas` | **Paper Atlas** | History in cut paper: parchment maps, crimson routes, gold date ribbons, period figures. | 30-45 s | 9:16 |
| `tall-tale` | **Tall Tale 3D** | Funny true stories: flat 2D cartoon people (big round heads, ink outlines) acting in a sunny 3D small-town world, camera always moving, one-word captions. | 40-60 s | 9:16 |

### Which one?

- Body / health / science "what happens if" → **Deep Dive 3D** (or **Inside Out** for a lighter, faster 2D look)
- Creepy, unexplained, true crime, "this happened in 1971" → **Night File 3D**
- Survival, life hacks, "here's what you do" → **Stick Story**
- A historical event, "how X happened" → **Paper Atlas**
- A funny or clever true story, a con, a loophole, "this guy did X" → **Tall Tale 3D**
- Data, process, tech or concept explainer, or a named medium ("make it look like an old newspaper", "claymation") → a **motion look** (below)

---

## 3. Motion looks (74 built, one shared engine)

Prompt with `motion/<id>`, e.g. `Make a motion look risograph short: how a bill becomes law`.
All render in **16:9 or 9:16** (add `--size 1080x1920` for vertical), 12-60 s, synthesized sound score,
narration optional. Browse: `motion/index.json` · `bash scripts/new_video.sh --list` · contact sheet:
`node motion/engine/gallery.mjs --out sheet.jpg`.

### Popular Explainer Looks
- `flat-space` - Flat-Vector Science
- `tech-glow` - Tech Glow Explainer
- `papercraft` - Papercraft Models
- `math-anim` - Manim-Style Math
- `editorial-collage` - Editorial Essay Collage
- `product-launch` - Product Launch Reveal
- `kawaii` - Kawaii Anime

### Hand-Drawn
- `whiteboard` - Whiteboard Explainer
- `chalkboard` - Chalkboard Lesson
- `etch-sketch` - Etch A Sketch Toy
- `blueprint` - Engineering Blueprint
- `napkin-sketch` - Napkin Sketch
- `ballpoint-notebook` - Ballpoint Notebook
- `sketchbook-pencil` - Sketchbook Graphite

### Painterly
- `watercolor` - Watercolor Wash
- `stained-glass` - Cathedral Glass
- `sumi-e` - Sumi-e Ink Wash
- `impasto-oil` - Impasto Night
- `gouache-poster` - Gouache Travel Poster
- `pointillism` - Pointillist Afternoon

### Print
- `halftone-pop` - Halftone Pop Panel
- `risograph` - Risograph Zine
- `linocut` - Linocut Relief Print
- `letterpress` - Wood Type Letterpress
- `newsprint` - Vintage Newsprint
- `screenprint-grid` - Silkscreen Grid

### Paper & Craft
- `shadow-puppet` - Shadow Puppet Theatre
- `claymation` - Claymation Set
- `cut-paper` - Cut-Paper Diorama
- `origami` - Origami Studio
- `collage-zine` - Punk Zine Collage
- `felt-quilt` - Felt & Patchwork
- `cross-stitch` - Cross-Stitch Sampler *(not built)*

### Illustration
- `illuminated` - Illuminated Manuscript
- `manga-panel` - Manga Page
- `tarot-card` - Tarot Card
- `botanical-plate` - Botanical Plate
- `mosaic` - Byzantine Mosaic
- `sticky-notes` - Sticky-Note Wall
- `patent-drawing` - Patent Drawing

### Art & Design Movements
- `ukiyo-e` - Ukiyo-e Woodblock
- `art-deco` - Art Deco Foil *(not built)*
- `constructivist` - Constructivist Propaganda *(not built)*
- `memphis` - Memphis Group *(not built)*
- `bauhaus` - Bauhaus Poster *(not built)*
- `swiss-grid` - International Typographic Style *(not built)*

### Retro Digital
- `oscilloscope` - Oscilloscope Vector Art
- `pixel-16bit` - 16-Bit Pixel Odyssey
- `crt-terminal` - Phosphor Terminal
- `gameboy` - Pocket Monochrome
- `vector-arcade` - Vector Arcade 1980
- `ascii-render` - ASCII Demoscene
- `mac-1bit` - MacPaint 1984

### Retro UI & Neon
- `synthwave` - Synthwave Outrun
- `win95` - Win95 Desktop
- `vaporwave` - Vaporwave
- `y2k-chrome` - Y2K Liquid Chrome *(not built)*
- `ms-paint` - Bitmap Paint Doodle *(not built)*
- `teletext` - Teletext Page *(not built)*

### Dimensional
- `isometric` - Isometric Pastel
- `voxel` - Voxel Diorama
- `low-poly` - Low-Poly Faceted
- `glassmorphism` - Glassmorphism UI
- `soft-3d` - Soft 3D Clay
- `wireframe-terrain` - Hidden-Line Wireframe

### Light & Imaging
- `film-noir` - 1940s Film Noir
- `deep-sea` - Bioluminescent Deep Sea
- `neon-sign` - Neon Sign at Night
- `holographic-foil` - Holographic Foil Card
- `thermal-camera` - Thermal Camera
- `light-painting` - Light Painting
- `x-ray` - Radiograph on Lightbox

### Data & Information
- `editorial-chart` - Editorial Chart
- `transit-map` - Transit Map
- `isotype` - ISOTYPE Pictograms
- `topographic` - Topographic Survey *(not built)*
- `ridgeline` - Ridgeline *(not built)*
- `flow-field` - Flow Field *(not built)*

### Generative & Type
- `paper-marbling` - Ebru Paper Marbling
- `kinetic-type` - Kinetic Type
- `op-art` - Op Art Sphere
- `string-art` - Nail & Thread String Art
- `spirograph` - Guilloche Security Print
- `truchet` - Multi-scale Truchet

### Cosmic & Psychedelic
- `psychedelic` - Psychedelic Poster
- `cosmic` - Cosmic Star Chart

**Built:** 74 of 86 listed. The 12 marked *(not built)* have no renderer yet - do not promise them;
offer the closest built look instead.

---

## 4. Optional extras

Append these to any prompt:

```
Narration: no          (motion looks only; synth score stays)
Aspect: 9:16           (motion looks default to 16:9)
Upload: private        (only if an upload integration is configured; confirms title/visibility/category first)
```

Keep original scripts and shots. Facts get checked against real sources, and the sources are listed in `script.json`.
