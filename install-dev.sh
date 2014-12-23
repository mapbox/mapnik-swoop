#!/usr/bin/env bash

for i in $(ls node_modules/); do
  (
    cd node_modules/$i
    DEVDEPS=$(node ../../get-dev-deps.js)
    if [[ ! $DEVDEPS == "" ]]; then
        npm install $DEVDEPS --no-rollback
    fi
  )
done
