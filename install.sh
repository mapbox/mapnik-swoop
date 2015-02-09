#!/usr/bin/env bash

set -e -u
set -o pipefail

npm install --loglevel=http --fallback-to-build=false
./install-dev.sh
