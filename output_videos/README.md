# Output Videos Folder (`output_videos/`)

All finished, rendered faceless shorts, preview contact sheets, and compressed share copies can be stored and exported here.

---

## 📁 Suggested Output Structure
```text
output_videos/
├── 4-planets-silent-hill.mp4         # Master high-bitrate render (1080x1920, 9:16)
├── 4-planets-silent-hill-share.mp4   # Web-optimized share copy (< 30 MB for Discord/Telegram)
├── 4-planets-silent-hill-cover.jpg   # Best high-resolution video thumbnail / cover frame
└── 4-planets-silent-hill-sheet.jpg   # QA contact sheet (visual audit of all cuts and captions)
```

---

## 🎬 How to Render Directly to this Folder

Inside your video project folder (e.g., `~/faceless-shorts/4-planets/` or inside a style folder):

### 1. Render Full High-Quality MP4
```bash
node tools/capture.mjs video ../../output_videos/4-planets-silent-hill.mp4
```

### 2. Generate Full Visual QA Contact Sheet (1 frame every 0.5s)
```bash
node tools/capture.mjs sheet ../../output_videos/4-planets-sheet.jpg 0.5 10
```

### 3. Create Compressed Web/Mobile Share Copy (< 35 MB)
```bash
ffmpeg -i ../../output_videos/4-planets-silent-hill.mp4 -c:v libx264 -crf 21 -preset slow -c:a aac -b:a 160k -movflags +faststart ../../output_videos/4-planets-share.mp4
```

### 4. Extract High-Res Cover Thumbnail
```bash
node tools/capture.mjs frames ../../output_videos/cover "2.5"
```

---

## 📱 Standard Video Specifications
- **Dimensions**: 1080 x 1920 px (Vertical 9:16)
- **Frame Rate**: 24 FPS (cinematic retro / faster render) or 30 FPS
- **Codec**: H.264 / AAC 48,000 Hz Stereo
- **Target Platforms**: YouTube Shorts, TikTok, Instagram Reels, Snapchat Spotlight
