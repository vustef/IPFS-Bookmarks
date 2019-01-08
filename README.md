# voyager

Cross-browser bookmark plugin that stores your bookmarks in IPFS

## Install

	$ npm install

## Development
    npm start

## Build extension before packaging
    npm run build

## Package extension for debug
    npm run package-dev chrome
    npm run package-dev firefox
    npm run package-dev opera
    npm run package-dev edge

## Package extension

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge

## Create user
set up CORS for IPFS on your machine:
ipfs init
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["null"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'

stat IPFS daemon on localhost:5001
ipfs key gen --type=ed25519 User1
