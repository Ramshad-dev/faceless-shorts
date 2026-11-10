#!/bin/bash
# Start a new video project from a style, so it renders straight away.
#   bash new_video.sh <style> <short-name> [--dir <parent>]      → ~/faceless-shorts/<short-name>/  a narrative style:
#     a full example project (engine + shots + script + voice pipeline) that renders as-is
#   bash new_video.sh motion/<look> <short-name> [--dir <parent>] → a scene project for one of the 74 motion looks:
#     scene.js from motion/templates/ + data/ renders/ review/
#   bash new_video.sh --list                                      every style and motion look
set -eu
SKILL="$(cd "$(dirname "$0")/.." && pwd)"
if [ "${1:-}" = "--list" ]; then
  echo "styles (narrative, full narrated shorts):"
  for d in "$SKILL"/styles/*/; do echo "  $(basename "$d")"; done
  echo "motion looks (scene-based explainers, use as motion/<id>):"
  for f in "$SKILL"/motion/styles/*.js; do echo "  motion/$(basename "$f" .js)"; done
  exit 0
fi
USAGE="usage: new_video.sh <style|motion/<look>> <short-name> [--dir <parent>]   (list: bash new_video.sh --list)"
STYLE="${1:?$USAGE}"; NAME="${2:?$USAGE}"; shift 2
PARENT="$HOME/faceless-shorts"
while [ $# -gt 0 ]; do case "$1" in --dir) PARENT="${2:?}"; shift 2 ;; *) echo "unknown option $1" >&2; exit 2 ;; esac; done
DST="$PARENT/$NAME"
[ -e "$DST" ] && { echo "$DST already exists: pick another name" >&2; exit 2; }
mkdir -p "$PARENT"

case "$STYLE" in
motion/*)
  LOOK="${STYLE#motion/}"
  [ -f "$SKILL/motion/styles/$LOOK.js" ] || { echo "no motion look '$LOOK' (bash new_video.sh --list)" >&2; exit 2; }
  mkdir -p "$DST/renders" "$DST/review" "$DST/data"
  cp "$SKILL/motion/templates/scene.js" "$DST/scene.js"
  echo "$DST"
  echo "motion look: $LOOK. Read $SKILL/motion/styles/$LOOK.md + $SKILL/motion/MOTION.md, then rewrite scene.js."
  echo "demo:  node $SKILL/motion/engine/render.mjs --style $LOOK --out $DST/renders/demo.mp4"
  echo "video: node $SKILL/motion/engine/render.mjs --style $LOOK --scene $DST/scene.js --out $DST/renders/$NAME.mp4 --size 1080x1920"
  ;;
*)
  SRC="$SKILL/styles/$STYLE/example"
  if [ ! -d "$SRC" ]; then
    if [ -f "$SKILL/motion/styles/$STYLE.js" ]; then echo "style '$STYLE' is a motion look: use 'motion/$STYLE'" >&2
    else echo "no style '$STYLE' ($USAGE)" >&2; fi
    exit 2
  fi
  cp -R "$SRC" "$DST"; mkdir -p "$DST/renders" "$DST/review"
  rm -f "$DST/data/narration.wav" "$DST/data/mix.wav"
  echo "$DST"
  echo "style: $STYLE. Read $SKILL/styles/$STYLE/STYLE.md, then rewrite script.json + src/shots.js"
  ;;
esac
