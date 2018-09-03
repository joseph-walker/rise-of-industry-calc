#!/bin/bash

echo "Deploying:"
echo "Deleting branch 'gh-pages'..."
git branch -d gh-pages

echo "Creating new deployment branch..."
git checkout -b gh-pages

echo "Shuffling indexes..."
mv ./index.html ./index-dev.html
mv ./index-prod.html ./index.html

echo "Running build..."
npm run build-prod

echo "Commiting build assets..."
git add -A
git commit -m "Automated Deployment"

echo "Deploying to Github Pages..."
git push -f origin gh-pages

echo "Done."
