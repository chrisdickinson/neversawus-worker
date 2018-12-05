#!/bin/bash
set -e

npm ci
npm t
webpack -o dist/main.js
aws s3 cp dist/main.js s3://cloudflare-workers/neversawus.js --content-type=text/javascript
