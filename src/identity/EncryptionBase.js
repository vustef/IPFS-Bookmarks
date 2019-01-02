var inversify = require("inversify");
require("reflect-metadata");

export default class EncryptionBase {
    generateEncryptionKey(username, password) {
        throw new Error('You have to implement the method generateEncryptionKey!');
    }

    getDeterministicHash(inputStr) {
        throw new Error('You have to implement the method getDeterministicHash!');
    }

    encrypt(inputStr, encryptionKey) {
        throw new Error('You have to implement the method encrypt!');
    }

    decrypt(inputStr, encryptionKey) {
        throw new Error('You have to implement the method decrypt!');
    }
}

inversify.decorate(inversify.injectable(), EncryptionBase);