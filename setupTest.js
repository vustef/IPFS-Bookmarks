var fs = require('fs');
var rimraf = require("rimraf");

var workingDir = './workingDir';
var startingDir = '.';

// Jest built-in setup and teardown functions.
beforeEach(() => {
    process.chdir(startingDir);
    if (fs.existsSync(workingDir)) {
        rimraf.sync(workingDir);
    }

    fs.mkdirSync(workingDir);

    startingDir = '..';
    process.chdir(workingDir);
});

beforeAll(() => {
    process.chdir(startingDir);
    if (fs.existsSync(workingDir)) {
        rimraf.sync(workingDir);
    }

    fs.mkdirSync(workingDir);

    startingDir = '..';
    process.chdir(workingDir);
});