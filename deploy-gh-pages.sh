#!/bin/bash

# Build the project
npm run build

# Navigate to the build output directory
cd dist

# Initialize a new git repo
git init

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages"

# Push to the gh-pages branch using HTTPS instead of SSH to avoid SSH resolution issues
git remote add origin https://github.com/anirudhtanwar/Urban-Threads.git
git push --force origin master:gh-pages

# Go back to the root directory
cd ..
