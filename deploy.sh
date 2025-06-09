#!/usr/bin/env bash

# -----------------------------------------------------------------------------
# Wulu Deploy Script
# Builds the static site and deploys to GitHub Pages (gh-pages branch)
# -----------------------------------------------------------------------------

set -euo pipefail

echo "🛠 Building the Wulu site for production..."

# Clean previous Gatsby cache/output to avoid stale data
npm run clean

# Build Gatsby static site
npm run build

echo "🚀 Deploying built site to GitHub Pages..."

# Push the contents of the /public directory to the gh-pages branch
# Requires gh-pages package installed (already in package.json)
npx gh-pages -d public -b gh-pages -m "chore: deploy Wulu static build $(date '+%Y-%m-%d %H:%M:%S')"

echo "✅ Deploy complete! Your site should be live shortly if GitHub Pages is configured."
