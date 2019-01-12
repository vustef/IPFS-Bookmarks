# IPFS Bookmarks

Proof of concept prototype cross-browser extension for client-side only bookmarks manager that stores your bookmarks in [IPFS](https://ipfs.io/).
File that holds bookmarks is found using IPNS, and username is equal to the private key name that should be created on IPFS node that you are running (see below how). Bookmarks are encrypted using the encryption key generated from username and password, and login is verified by comparing the header of the file that is generated from the same information.

## IPFS setup
Set up CORS for IPFS on your machine:
```
ipfs init
ipfs config Addresses.API /ip4/0.0.0.0/tcp/5001
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "GET", "POST"]'
````

Start IPFS daemon on localhost:5001
```
ipfs daemon
# In other terminal:
ipfs key gen --type=ed25519 username
```

If you want to be able to use bookmarks from other machine, you need the same key on that IPFS node by copying key form `~/.ipfs/keystore`.

## Install

	$ npm install

## Development
    npm start

## Build extension before packaging
    npm run build

## Create unpacked extension
    npm run package-dev chrome
    npm run package-dev firefox
    npm run package-dev opera
    npm run package-dev edge

## Package extension

    npm run build chrome
    npm run build firefox
    npm run build opera
    npm run build edge

## Issues
It's just proof of concept, and there are many things that could be  fixed when it comes to user interface, like to know that IPFS operations are in progress and proper logout, to name a few, as well as improvements like better integration into browser. Also, performance is bad mostly because of IPNS publishing, so this is something worth looking into.
