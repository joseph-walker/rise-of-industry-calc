#!/bin/bash

echo "Deploying:"
echo "Deleting branch 'gh-pages'..."
git branch -D gh-pages

echo "Creating new deployment branch..."
git checkout -b gh-pages

echo "Shuffling indexes..."
mv ./index.html ./index-dev.html
mv ./index-prod.html ./index.html

echo "Running build..."
npm run build-prod

echo "Commiting build assets..."
git add -A
git add -f --all dist/
git commit -m "Automated Deployment"

echo "Deploying to Github Pages..."
git push -f origin gh-pages

echo "Deployment complete. Cleaning up..."
mv ./index.html ./index-prod.html
mv ./index-dev.html ./index.html
git checkout -f master
