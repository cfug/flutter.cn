#!/usr/bin/env bash
# Check for non-200 links in built Jekyll site
# first looking for invalid link references then
# using Firebase emulator and Dart linkcheck utility
set -eu -o pipefail

# Eliminate clutter
dart --disable-analytics

echo "Checking for valid link references..."
# Check for invalid link references before checking for links
dart run tool/check_link_references.dart
echo $'No invalid link references found!\n'

trap clean_up EXIT

EMULATOR_PORT=5500 # airplay runs on :5000

clean_up() {
  exit_value=$?
  echo "Shutting down emulator..."
  lsof -t -i:$EMULATOR_PORT | xargs kill -9 > /dev/null 2>&1
  echo "Exit code is $exit_value"
  echo $'Done!\n'

  # Linkcheck returns status 1 if there are warnings
  if [[ $exit_value -gt 1 ]]; then
    echo "Exiting with errors"
    exit $exit_value
  else
    exit 0
  fi
}

echo "Starting emulator async..."
cd _site
ruby -run -e httpd . -p$EMULATOR_PORT > /dev/null &
cd ..

sleep 5 # wait a few just in case

SKIP_FILE="./tool/config/linkcheck-skip-list.txt"

# Will naturally print all output to stdout for visibility
dart run linkcheck http://localhost:$EMULATOR_PORT/docs --skip-file $SKIP_FILE
