#!/usr/bin/env bash

set -e -u
set -o pipefail

for i in $(ls node_modules/); do
  (
    cd node_modules/$i
    DEVDEPS=$(node ../../get-dev-deps.js)
    if [[ ! $DEVDEPS == "" ]]; then
        echo "$(pwd):"
        echo "    installing '$DEVDEPS'"
        npm install $DEVDEPS
    fi
  )
done
