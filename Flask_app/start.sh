#!/bin/bash

##########################
# Install Requirements
##########################
# pip install -r 'requirements.txt'

##########################
# Run python code
##########################
# python daemon.py &
# osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'

TAB_NAME=$1; 
COMMAND="python server.py"; 
osascript -e "tell application \"Terminal\"" -e "tell application \"System Events\" to keystroke \"t\" using {command down}" -e "do script \"printf '\\\e]1;$TAB_NAME\\\a'; $COMMAND\" in front window" -e "end tell" > /dev/null
python -m http.server 8080





