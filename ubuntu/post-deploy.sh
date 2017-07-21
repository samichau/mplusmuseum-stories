#!/bin/sh

export HOME=/home/ubuntu

cd /usr/local/mplusmuseum/projects/mplusmuseum-stories
npm i -g npm
npm install
npm run build

pm2 restart plus
