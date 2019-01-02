var fs = require('fs');
var rimraf = require("rimraf");

var workingDir = './workingDir';
var startingDir = '.';

// Jest built-in setup and teardown functions.
beforeEach(() => {
    process.chdir(startingDir);
    console.log('Starting directory: ' + process.cwd());
    if (fs.existsSync(workingDir)) {
        rimraf.sync(workingDir);
    }

    fs.mkdirSync(workingDir);

    startingDir = process.cwd;
    process.chdir(workingDir);
    console.log('New directory: ' + process.cwd());
});