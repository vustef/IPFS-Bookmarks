var inversify = require("inversify");
require("reflect-metadata");

var TYPES = {
    Encryptor: "Encryptor"
};

export {TYPES};
export var container = new inversify.Container();