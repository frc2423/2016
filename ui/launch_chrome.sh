#!/bin/bash

# Linux
CHROME="google-chrome"

# OSX
if [ -f /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome ]; then
  CHROME=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
fi

"$CHROME" --window-position=0,0 --window-size=1366,525 http://localhost:8888/teleop.html http://localhost:8888/autonomous.html &
