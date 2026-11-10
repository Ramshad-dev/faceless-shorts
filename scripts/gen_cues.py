#!/usr/bin/env python3
"""Generates data/cues.json for a project based on its lines.json timings and script.
Matches the cues placed in src/shots.js.
"""
import json, sys
from pathlib import Path

def gen_cues_for(proj_path):
    p = Path(proj_path)
    lines_file = p / 'data/lines.json'
    if not lines_file.exists():
        print(f"Skipping {proj_path}: no data/lines.json")
        return
    
    data = json.loads(lines_file.read_text())
    dur = float(data['duration'])
    lines = data['lines']
    
    cues = []
    # Opening whoosh / tock
    cues.append({"t": 0.3, "type": "whoosh", "gain": 0.5})
    cues.append({"t": 0.8, "type": "tock", "gain": 0.4})
    
    # Sound transitions at each cut
    cue_types = ["whoosh", "slide", "tock", "slam", "whoosh", "alarm", "whoosh", "tock", "thud"]
    for i in range(1, len(lines)):
        cut_t = round(lines[i]['start'] - 0.1, 3)
        ctype = cue_types[(i - 1) % len(cue_types)]
        c = {"t": max(0.0, cut_t), "type": ctype, "gain": 0.5}
        if ctype == 'alarm':
            c['dur'] = 2.0
            c['gain'] = 0.6
        elif ctype == 'slide':
            c['dur'] = 0.5
            c['gain'] = 0.4
        elif ctype == 'slam':
            c['gain'] = 0.6
        cues.append(c)
    
    cues.sort(key=lambda x: x['t'])
    out = {"duration": dur, "cues": cues}
    (p / 'data/cues.json').write_text(json.dumps(out, indent=1))
    print(f"{proj_path} -> data/cues.json ({len(cues)} cues, {dur:.2f} s)")

if __name__ == '__main__':
    targets = sys.argv[1:] if len(sys.argv) > 1 else [
        'shorts/01-four-planets',
        'shorts/02-silent-hill-shelters',
        'shorts/03-dreamcore-elevator',
        'styles/ps1-liminal/example'
    ]
    for t in targets:
        gen_cues_for(t)
