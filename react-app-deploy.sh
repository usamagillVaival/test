#!/bin/sh
git checkout main
git pull
npm install
npm run build
