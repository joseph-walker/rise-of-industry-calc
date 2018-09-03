#!/bin/bash

printf '\e[1;32m%-6s\e[m' "Deploying:\n"
printf '\e[1;32m%-6s\e[m' "Deleting branch 'gh-pages'...\n"
git branch -D gh-pages

printf '\e[1;32m%-6s\e[m' "Creating new deployment branch...\n"
git checkout -b gh-pages

printf '\e[1;32m%-6s\e[m' "Shuffling indexes...\n"
mv ./index.html ./index-dev.html
mv ./index-prod.html ./index.html

printf '\e[1;32m%-6s\e[m' "Running build...\n"
npm run build-prod

printf '\e[1;32m%-6s\e[m' "Commiting build assets...\n"
git add -A
git add -f --all dist/
git commit -m "Automated Deployment"

printf '\e[1;32m%-6s\e[m' "Deploying to Github Pages...\n"
git push -f origin gh-pages

printf '\e[1;32m%-6s\e[m' "Deployment complete. Cleaning up...\n"
mv ./index.html ./index-prod.html
mv ./index-dev.html ./index.html
git checkout -f master
