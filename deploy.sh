#!/bin/bash

printf '\e[1;32m%-6s\e[m\n' "Deploying:"
printf '\e[1;32m%-6s\e[m\n' "Deleting branch 'gh-pages'..."
git branch -D gh-pages

printf '\e[1;32m%-6s\e[m\n' "Creating new deployment branch..."
git checkout -b gh-pages

printf '\e[1;32m%-6s\e[m\n' "Shuffling indexes..."
mv ./index.html ./index-dev.html
mv ./index-prod.html ./index.html

printf '\e[1;32m%-6s\e[m\n' "Running build..."
npm run build-prod

printf '\e[1;32m%-6s\e[m\n' "Commiting build assets..."
git add -A
git add -f --all dist/
git commit -m "Automated Deployment"

printf '\e[1;32m%-6s\e[m\n' "Deploying to Github Pages..."
git push -f origin gh-pages

printf '\e[1;32m%-6s\e[m\n' "Deployment complete. Cleaning up..."
mv ./index.html ./index-prod.html
mv ./index-dev.html ./index.html
git checkout -f master
