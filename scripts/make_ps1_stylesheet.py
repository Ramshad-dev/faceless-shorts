#!/usr/bin/env python3
"""Generates the official style-sheet.png for styles/ps1-liminal/
Matches the 1920x1080 layout, color palette, low-poly 3D aesthetics,
and typography of the faceless-shorts style sheets.
"""
import math, os, struct, subprocess, sys

W, H = 1920, 1080
pix = bytearray([12, 14, 18] * (W * H))  # dark CRT void background #0C0E12

def set_pixel(x, y, r, g, b):
    if 0 <= x < W and 0 <= y < H:
        idx = (y * W + x) * 3
        pix[idx] = max(0, min(255, int(r)))
        pix[idx + 1] = max(0, min(255, int(g)))
        pix[idx + 2] = max(0, min(255, int(b)))

def blend_pixel(x, y, r, g, b, a):
    if 0 <= x < W and 0 <= y < H and a > 0:
        idx = (y * W + x) * 3
        inv_a = 1.0 - a
        pix[idx] = int(pix[idx] * inv_a + r * a)
        pix[idx + 1] = int(pix[idx + 1] * inv_a + g * a)
        pix[idx + 2] = int(pix[idx + 2] * inv_a + b * a)

def fill_rect(x0, y0, w, h, r, g, b, a=1.0):
    for y in range(max(0, y0), min(H, y0 + h)):
        for x in range(max(0, x0), min(W, x0 + w)):
            if a >= 1.0:
                set_pixel(x, y, r, g, b)
            else:
                blend_pixel(x, y, r, g, b, a)

def stroke_rect(x0, y0, w, h, r, g, b, lw=1):
    for i in range(lw):
        for x in range(x0, x0 + w):
            set_pixel(x, y0 + i, r, g, b)
            set_pixel(x, y0 + h - 1 - i, r, g, b)
        for y in range(y0, y0 + h):
            set_pixel(x0 + i, y, r, g, b)
            set_pixel(x0 + w - 1 - i, y, r, g, b)

def draw_line(x0, y0, x1, y1, r, g, b, a=1.0):
    dx = abs(x1 - x0)
    dy = abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    err = dx - dy
    cx, cy = x0, y0
    while True:
        if a >= 1.0:
            set_pixel(cx, cy, r, g, b)
        else:
            blend_pixel(cx, cy, r, g, b, a)
        if cx == x1 and cy == y1:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            cx += sx
        if e2 < dx:
            err += dx
            cy += sy

# Draw CRT scanlines across the canvas
for y in range(0, H, 3):
    for x in range(W):
        idx = (y * W + x) * 3
        pix[idx] = int(pix[idx] * 0.85)
        pix[idx + 1] = int(pix[idx + 1] * 0.85)
        pix[idx + 2] = int(pix[idx + 2] * 0.85)

# Header separator line
draw_line(20, 68, W - 20, 68, 55, 65, 80)

# Panels layout (6 panels)
panels = [
    (20, 80, 560, 520, "1. HERO FRAME"),
    (590, 80, 660, 520, "2. PALETTE & WORLDS"),
    (1260, 80, 640, 520, "3. RETRO PS1 INSERTS & HUD"),
    (20, 610, 760, 456, "4. THE 4 PLANET REALMS"),
    (790, 610, 520, 456, "5. CAPTIONS & DIALOGUE"),
    (1320, 610, 580, 456, "6. CORE RULES")
]

for px, py, pw, ph, _ in panels:
    fill_rect(px, py, pw, ph, 16, 20, 26, 0.7)
    stroke_rect(px, py, pw, ph, 45, 55, 70, lw=2)
    draw_line(px + 16, py + 48, px + pw - 16, py + 48, 45, 55, 70)

# ----------------- PANEL 1: HERO FRAME (9:16 vertical render) -----------------
# Hero frame box: x=40, y=140, w=235, h=418
hx, hy, hw, hh = 40, 140, 235, 418
fill_rect(hx, hy, hw, hh, 10, 12, 15)

# Render Silent Hill fog & low-poly catwalk inside the hero frame
for y in range(hy, hy + hh):
    prog = (y - hy) / float(hh)
    fog_r = int(70 + 30 * math.sin(prog * 3.14))
    fog_g = int(80 + 35 * math.sin(prog * 3.14))
    fog_b = int(75 + 25 * math.sin(prog * 3.14))
    for x in range(hx, hx + hw):
        # Dither & scanline
        dither = ((x ^ y) & 4) * 2
        set_pixel(x, y, fog_r + dither, fog_g + dither, fog_b + dither)

# Low-poly ground / catwalk
for y in range(hy + 260, hy + hh):
    row_y = y - (hy + 260)
    for x in range(hx, hx + hw):
        if (x + y) % 12 < 2 or (x - y) % 12 < 2:
            set_pixel(x, y, 140, 60, 40)  # Rusted grate
        else:
            set_pixel(x, y, 35, 38, 42)

# Halogen streetlight casting a light cone
light_x = hx + 180
light_y = hy + 60
for ly in range(light_y, hy + 300):
    spread = int((ly - light_y) * 0.45)
    for lx in range(light_x - spread, light_x + spread):
        if hx <= lx < hx + hw:
            dist = abs(lx - light_x) / max(1, spread)
            blend_pixel(lx, ly, 230, 160, 40, max(0.0, 0.35 * (1.0 - dist)))

# Low-poly silhouette of a watcher in the distance
wx, wy = hx + 100, hy + 230
for dy in range(-35, 35):
    span = int(12 * (1.0 - abs(dy) / 45.0))
    if dy < -15: span = 7  # head
    for dx in range(-span, span):
        blend_pixel(wx + dx, wy + dy, 15, 18, 22, 0.95)

# Scanlines and border on hero frame
for y in range(hy, hy + hh, 2):
    for x in range(hx, hx + hw):
        blend_pixel(x, y, 0, 0, 0, 0.25)
stroke_rect(hx, hy, hw, hh, 80, 100, 120, lw=2)

# ----------------- PANEL 2: PALETTE & WORLDS -----------------
# 8 Swatches: Fog, Rust, Amber, Cyan, Pastel, Void, Alert, Phosphor
swatches = [
    ("FOG", 107, 114, 112),
    ("RUST", 140, 58, 39),
    ("AMBER", 229, 142, 38),
    ("CYAN", 100, 216, 203),
    ("PASTEL", 195, 155, 211),
    ("VOID", 10, 11, 14),
    ("ALERT", 231, 76, 60),
    ("PHOSPHOR", 46, 204, 113)
]

sw_x = 610
for i, (name, sr, sg, sb) in enumerate(swatches):
    cur_x = sw_x + i * 78
    fill_rect(cur_x, 140, 68, 60, sr, sg, sb)
    stroke_rect(cur_x, 140, 68, 60, 120, 130, 145, lw=1)

# Wide 3D render display (low-poly celestial realms)
w3d_x, w3d_y, w3d_w, w3d_h = 610, 260, 620, 280
fill_rect(w3d_x, w3d_y, w3d_w, w3d_h, 8, 10, 14)

# 3D low poly planet spheres
def draw_poly_planet(cx, cy, radius, r, g, b, rings=False):
    for py in range(cy - radius, cy + radius):
        for px in range(cx - radius, cx + radius):
            dx = (px - cx) / float(radius)
            dy = (py - cy) / float(radius)
            if dx * dx + dy * dy <= 1.0:
                dz = math.sqrt(max(0.0, 1.0 - dx * dx - dy * dy))
                # Facet quantization for PS1 look
                qdx = math.floor(dx * 8) / 8.0
                qdy = math.floor(dy * 8) / 8.0
                qdz = math.floor(dz * 8) / 8.0
                lum = max(0.1, qdx * 0.5 + qdy * -0.3 + qdz * 0.8)
                dither = ((px ^ py) & 3) * 6
                set_pixel(px, py, min(255, int(r * lum) + dither),
                                 min(255, int(g * lum) + dither),
                                 min(255, int(b * lum) + dither))
    if rings:
        for a in range(-radius - 20, radius + 20):
            rx = cx + a
            ry = cy + int(a * 0.35)
            if w3d_x <= rx < w3d_x + w3d_w and w3d_y <= ry < w3d_y + w3d_h:
                blend_pixel(rx, ry, 210, 160, 220, 0.85)

draw_poly_planet(w3d_x + 80, w3d_y + 110, 48, 195, 155, 211, rings=True)    # Planet 1 (Pastel Eden)
draw_poly_planet(w3d_x + 230, w3d_y + 110, 45, 240, 210, 110, rings=False)  # Planet 2 (Yellow Facility)
draw_poly_planet(w3d_x + 380, w3d_y + 110, 46, 140, 58, 39, rings=False)    # Planet 3 (Rust Fog)

# Planet 4: Glitched Black Obelisk / Pyramidal Monolith
ob_cx, ob_cy = w3d_x + 530, w3d_y + 110
for y in range(ob_cy - 55, ob_cy + 55):
    half_w = int(28 * (1.0 - abs(y - ob_cy) / 60.0))
    for x in range(ob_cx - half_w, ob_cx + half_w):
        d = ((x * 3) ^ (y * 5)) & 7
        set_pixel(x, y, 20 + d * 5, 20 + d * 5, 30 + d * 8)
# Red warning outline on Planet 4
stroke_rect(ob_cx - 32, ob_cy - 58, 64, 116, 230, 40, 50, lw=1)

stroke_rect(w3d_x, w3d_y, w3d_w, w3d_h, 60, 75, 95, lw=2)

# ----------------- PANEL 3: RETRO PS1 INSERTS & HUD -----------------
# 4 Sub-boxes: Memory Card, Tape Reel, Radar, Glitch Waveform
ins_w, ins_h = 280, 180
inserts = [
    (1280, 140, "PS1 MEMORY CARD"),
    (1590, 140, "EMERGENCY CASSETTE"),
    (1280, 360, "RADAR TERMINAL"),
    (1590, 360, "AUDIO DRONE WAVE")
]

for ix, iy, title in inserts:
    fill_rect(ix, iy, ins_w, ins_h, 8, 10, 15)
    stroke_rect(ix, iy, ins_w, ins_h, 45, 60, 75, lw=1)

# Memory Card Block representation
mc_x, mc_y = 1295, 175
for row in range(3):
    for col in range(5):
        bx = mc_x + col * 48
        by = mc_y + row * 38
        is_corrupt = (row == 1 and col == 2)
        r, g, b = (230, 50, 50) if is_corrupt else (40, 50, 65)
        fill_rect(bx, by, 42, 32, r, g, b)
        stroke_rect(bx, by, 42, 32, 100, 120, 140)

# Cassette Tape representation
cx, cy = 1605, 175
fill_rect(cx, cy, 250, 120, 25, 28, 35)
stroke_rect(cx, cy, 250, 120, 110, 120, 135)
fill_rect(cx + 25, cy + 20, 200, 80, 210, 200, 180)  # Label paper
# Tape spools
for sx in [cx + 70, cx + 180]:
    for a in range(360):
        rad = math.radians(a)
        px = int(sx + 20 * math.cos(rad))
        py = int(cy + 60 + 20 * math.sin(rad))
        set_pixel(px, py, 40, 45, 55)

# Radar Terminal (phosphor green circular sweep)
rx, ry = 1420, 450
for r_ring in [25, 50, 75]:
    for a in range(360):
        rad = math.radians(a)
        set_pixel(int(rx + r_ring * math.cos(rad)), int(ry + r_ring * math.sin(rad)), 40, 180, 80)
draw_line(rx - 80, ry, rx + 80, ry, 30, 140, 60)
draw_line(rx, ry - 80, rx, ry + 80, 30, 140, 60)
# Blips on radar
for bx, by in [(rx + 30, ry - 25), (rx - 45, ry + 35), (rx + 55, ry + 40), (rx - 20, ry - 50)]:
    fill_rect(bx - 3, by - 3, 7, 7, 240, 255, 100)

# Audio waveform (55Hz Sub-drone)
wx, wy = 1605, 375
fill_rect(wx + 10, wy + 20, 230, 110, 5, 8, 12)
for x in range(220):
    val = math.sin(x * 0.15) * 25 + math.sin(x * 0.04) * 15 + math.cos(x * 0.3) * 5
    draw_line(wx + 15 + x, wy + 75, wx + 15 + x, wy + 75 + int(val), 220, 140, 35)

# ----------------- PANEL 4: THE 4 PLANET REALMS -----------------
# 3 Vertical Preview Shots (w: 220, h: 360)
for idx, (px, label) in enumerate([
    (40, "PLANET 1: FALSE HAVEN"),
    (280, "PLANET 2: ENDLESS FACILITY"),
    (520, "PLANET 3: SILENT HILL RUST")
]):
    py = 670
    pw, ph = 215, 360
    fill_rect(px, py, pw, ph, 15, 18, 22)

    # Shading and environment per realm
    if idx == 0:  # Pastel Eden
        for y in range(py, py + ph):
            prog = (y - py) / float(ph)
            r = int(180 + 40 * prog)
            g = int(130 + 50 * prog)
            b = int(170 + 60 * prog)
            for x in range(px, px + pw):
                set_pixel(x, y, r, g, b)
        # Calm ocean
        fill_rect(px, py + 220, pw, ph - 220, 90, 180, 170)
        # Smiling frozen low-poly sun
        for dy in range(-30, 30):
            for dx in range(-30, 30):
                if dx * dx + dy * dy <= 900:
                    set_pixel(px + 105 + dx, py + 80 + dy, 245, 230, 140)

    elif idx == 1:  # Endless Facility (backrooms / poolrooms)
        for y in range(py, py + ph):
            prog = (y - py) / float(ph)
            r = int(190 * (1.0 - prog * 0.5))
            g = int(180 * (1.0 - prog * 0.5))
            b = int(120 * (1.0 - prog * 0.5))
            for x in range(px, px + pw):
                set_pixel(x, y, r, g, b)
        # Perspective corridor lines
        vanish_x, vanish_y = px + 107, py + 150
        for lx, ly in [(px, py + ph), (px + pw, py + ph), (px, py), (px + pw, py)]:
            draw_line(vanish_x, vanish_y, lx, ly, 70, 70, 40)
        # Fluorescent lights on ceiling
        fill_rect(px + 60, py + 40, 95, 8, 255, 255, 220)

    else:  # Silent Hill Rust & Fog
        for y in range(py, py + ph):
            fog = int(80 + 30 * math.sin((y - py) * 0.05))
            for x in range(px, px + pw):
                set_pixel(x, y, fog, fog - 5, fog - 10)
        # Catwalks and amber beacon
        for cat_y in range(py + 200, py + ph, 40):
            draw_line(px, cat_y, px + pw, cat_y, 140, 50, 30)
        fill_rect(px + 90, py + 120, 35, 35, 240, 160, 40)

    # Scanlines on all 3
    for y in range(py, py + ph, 2):
        for x in range(px, px + pw):
            blend_pixel(x, y, 0, 0, 0, 0.25)
    stroke_rect(px, py, pw, ph, 80, 100, 125, lw=2)

# ----------------- PANEL 5: CAPTIONS & DIALOGUE -----------------
# 3 Caption Box Cards
for i, cy in enumerate([680, 780, 880]):
    fill_rect(810, cy, 480, 75, 10, 14, 20)
    stroke_rect(810, cy, 480, 75, 55, 75, 95, lw=1)

# Write out raw pixels to ffmpeg with drawtext filter
font_mono = 'styles/night-file/example/fonts/FreeMonoBold.ttf'.replace('\\', '/')
font_sans = 'styles/night-file/example/fonts/Inter-Black.otf'.replace('\\', '/')

def dt(font, text, size, color, x, y):
    # Escape special characters for ffmpeg drawtext filter
    safe_text = text.replace('\\', '\\\\').replace(':', '\\:').replace("'", "\\'").replace('%', '\\\\\\%')
    return f"drawtext=fontfile='{font}':text='{safe_text}':fontsize={size}:fontcolor='{color}':x={x}:y={y}"

# Build drawtext filters
vf_filters = [
    # Main Header
    dt(font_sans, "PS1 LIMINAL 3D: VIDEO STYLE SHEET", 36, "#F2F4F8", 24, 48),
    dt(font_mono, "RETRO HORROR · DREAMCORE · CHOOSE 4 PLANETS // 2026", 18, "#9BA3B5", W - 620, 46),

    # Panel 1: Hero Frame Callouts
    dt(font_sans, "1. HERO FRAME", 22, "#FFD54F", 36, 112),
    dt(font_mono, "PS1 HARDWARE VERTEX JITTER", 16, "#E0E6ED", 290, 180),
    dt(font_mono, "DENSE DISTANCE FOG (SILENT HILL)", 16, "#E0E6ED", 290, 240),
    dt(font_mono, "RETRO CRT SCANLINES & DITHER", 16, "#E0E6ED", 290, 300),
    dt(font_mono, "CLINICAL / UNCANNY VOICE TONE", 16, "#E0E6ED", 290, 360),
    dt(font_mono, "MONOSPACE DIALOGUE BOX HUD", 16, "#E0E6ED", 290, 420),
    dt(font_mono, "SYSTEM RECORD // LEVEL 04", 13, "#E74C3C", 50, 155),
    dt(font_mono, "EARTH IS GONE.", 14, "#FFFFFF", 50, 500),
    dt(font_mono, "CHOOSE *ONE OF *4 PLANETS", 14, "#E74C3C", 50, 525),

    # Panel 2: Palette Swatch Labels
    dt(font_sans, "2. PALETTE & WORLDS", 22, "#FFD54F", 606, 112),
    dt(font_mono, "FOG", 12, "#CAD2C5", 628, 215),
    dt(font_mono, "RUST", 12, "#CAD2C5", 706, 215),
    dt(font_mono, "AMBER", 12, "#CAD2C5", 780, 215),
    dt(font_mono, "CYAN", 12, "#CAD2C5", 862, 215),
    dt(font_mono, "PASTEL", 12, "#CAD2C5", 936, 215),
    dt(font_mono, "VOID", 12, "#CAD2C5", 1020, 215),
    dt(font_mono, "ALERT", 12, "#CAD2C5", 1094, 215),
    dt(font_mono, "PHOSPHOR", 12, "#CAD2C5", 1160, 215),
    dt(font_mono, "(01) EDEN", 15, "#D2B4DE", 650, 515),
    dt(font_mono, "(02) FACILITY", 15, "#F9E79F", 790, 515),
    dt(font_mono, "(03) SILENT RUST", 15, "#E59866", 940, 515),
    dt(font_mono, "(04) VOID GLITCH", 15, "#E74C3C", 1090, 515),

    # Panel 3: Retro PS1 Inserts & HUD
    dt(font_sans, "3. RETRO PS1 INSERTS & HUD", 22, "#FFD54F", 1276, 112),
    dt(font_mono, "PS1 MEMORY CARD // BLOCK 04 CORRUPT", 13, "#CAD2C5", 1285, 330),
    dt(font_mono, "EMERGENCY BROADCAST TAPE CASSETTE", 13, "#CAD2C5", 1595, 330),
    dt(font_mono, "CRT RADAR HUD // SCANNING 4 REALMS", 13, "#CAD2C5", 1285, 555),
    dt(font_mono, "55Hz SUB-DRONE // TAPE WARBLE FX", 13, "#CAD2C5", 1595, 555),

    # Panel 4: Realms Labels
    dt(font_sans, "4. THE 4 PLANET REALMS", 22, "#FFD54F", 36, 642),
    dt(font_mono, "(A) THE FALSE HAVEN", 14, "#CAD2C5", 60, 1042),
    dt(font_mono, "(B) ENDLESS MALL", 14, "#CAD2C5", 315, 1042),
    dt(font_mono, "(C) SILENT HILL RUST", 14, "#CAD2C5", 545, 1042),

    # Panel 5: Captions & Dialogue Text
    dt(font_sans, "5. CAPTIONS & DIALOGUE", 22, "#FFD54F", 806, 642),
    dt(font_mono, "[ EARTH IS *GONE | CHOOSE *ONE ]", 16, "#CAD2C5", 830, 715),
    dt(font_mono, "[ THE SIREN SOUNDS AT *MIDNIGHT ]", 16, "#CAD2C5", 830, 815),
    dt(font_mono, "[ FORGET YOUR *NAME | COMMENT *BELOW ]", 16, "#CAD2C5", 830, 915),
    dt(font_sans, "TIMING: 0.5s GAP · SPEED: 0.93x · VOICE: AM_ONYX", 14, "#90A4AE", 820, 985),

    # Panel 6: Core Rules
    dt(font_sans, "6. CORE RULES", 22, "#FFD54F", 1336, 642),
    dt(font_sans, "1. LOW-POLY PS1 3D: AFFINE JITTER & SCANLINES.", 14, "#ECEFF1", 1345, 690),
    dt(font_sans, "2. DISTANCE FOG: HEAVY MIST CLIPS AT 15 UNITS.", 14, "#ECEFF1", 1345, 735),
    dt(font_sans, "3. UNCANNY DREAD: ISOLATION & RULES, NO JUMPSCARES.", 14, "#ECEFF1", 1345, 780),
    dt(font_sans, "4. VOICE: CALM, LOW REGISTER (AM_ONYX), 0.5S GAPS.", 14, "#ECEFF1", 1345, 825),
    dt(font_sans, "5. DUCKING: TAPE WARBLE / DRONES DUCK -55% UNDER VOICE.", 14, "#ECEFF1", 1345, 870),
    dt(font_sans, "6. SCRIPT SHAPE: HOOK -> 4 CHOICES WITH CATCHES -> LOOP.", 14, "#ECEFF1", 1345, 915),
    dt(font_sans, "7. FORMAT: 9:16 VERTICAL, 35-45S, SEAMLESS LOOP LAST LINE.", 14, "#ECEFF1", 1345, 960)
]

out_png = 'styles/ps1-liminal/style-sheet.png'
cmd = [
    'ffmpeg', '-y', '-f', 'rawvideo', '-pixel_format', 'rgb24',
    '-video_size', f'{W}x{H}', '-i', '-',
    '-vf', ','.join(vf_filters),
    '-frames:v', '1', out_png
]

print(f"Rendering {out_png} ({W}x{H})...")
res = subprocess.run(cmd, input=bytes(pix), capture_output=True)
if res.returncode != 0:
    print("FFmpeg error:", res.stderr.decode('utf-8', errors='ignore'))
    sys.exit(res.returncode)
else:
    size_kb = os.path.getsize(out_png) / 1024
    print(f"SUCCESS: {out_png} generated ({size_kb:.1f} KB)")
