#!/usr/bin/env bash
set -e

echo "Installing dependencies..."
npm install

echo "Forcing Puppeteer to download Chromium..."
PUPPETEER_CACHE_DIR=./.cache/puppeteer node node_modules/puppeteer/install.mjs
