#!/bin/bash
set -e

head=$(git rev-parse HEAD)
target=$(git rev-parse origin/build)

npm ci
npm t
webpack -o dist/main.js

if [ "$head" != "$target" ]; then
  echo "skipping: target is not build"
  exit
fi

aws s3 cp dist/main.js s3://cloudflare-workers/neversawus.js --content-type=text/javascript
