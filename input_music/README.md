# Input Music Folder (`input_music/`)

Drop your custom background music, ambient drones, and audio beds here for use in your faceless shorts.

---

## 🎧 Supported Formats
Any format supported by `ffmpeg`:
- `.mp3` (recommended)
- `.wav` (uncompressed 16-bit / 24-bit)
- `.m4a` / `.aac`
- `.ogg`
- `.flac`

---

## ⚙️ How to Use in Your Short

In your video project's `script.json`, point the `"music"` field to the audio file inside this folder (or relative to the project directory):

```json
{
  "title": "4 PLANETS YOU MUST LIVE ON",
  "style": "ps1-liminal",
  "voice": "am_onyx",
  "music": "../../input_music/silent_hill_fog_ambient.mp3",
  "lines": [ ... ]
}
```

*Note:* You can also copy the track into your project's local directory as `audio/music.mp3` and specify `"music": "audio/music.mp3"`.

---

## 🔊 How the Audio Engine Handles Your Music (`tools/mix.py`)
1. **Auto Ducking**: Music automatically ducks under the spoken narration (by default ~55% volume reduction during speech) so the voice is always punchy and intelligible.
2. **Auto Trimming & Fade**: The track is cleanly trimmed to match your video's exact calculated length, ending with a smooth 1.5-second fadeout.
3. **Mastering & Headroom**: Music is normalized and mixed to `-24 dBFS` underneath the narration (`-19 dBFS`), with peak limiter headroom at `-1 dBFS`.

---

## 📻 Recommended Music Vibes for PS1 / Silent Hill / Liminal / Dreamcore
For uncanny, liminal, or PS1 horror shorts (like *"Choose 4 Planets"* or *"Trapped in Liminal Spaces"*), look for royalty-free tracks with:
- **Akira Yamaoka Style Ambient**: Detuned acoustic chords, industrial clanks, distant reverb-drenched beats, warped music boxes.
- **Liminal Space Drones**: Continuous 55 Hz – 110 Hz room-tone hum, air-duct hum, empty fluorescent light buzz.
- **Dreamcore Mallsoft / Vaporwave**: Extremely slowed, pitched-down 1980s elevator jazz, underwater low-pass filtered audio, dreamy ethereal synth pads.
- **Dark Analog Horror**: Radio static bursts, vinyl crackle, tape hiss, and slow heartbeat-like bass pulses.
