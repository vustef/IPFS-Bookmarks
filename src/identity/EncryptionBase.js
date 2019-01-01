var inversify = require("inversify");
require("reflect-metadata");

export default class EncryptionBase {
    // TODO: implement inherited encryptor class.
    generateEncryptionKey(username, password) {
        throw new Error('You have to implement the method generateEncryptionKey!');
    }

    getConsistentHash(inputStr) {
        throw new Error('You have to implement the method getConsistentHash!');
    }

    encrypt(inputStr, encryptionKey) {
        throw new Error('You have to implement the method encrypt!');
    }

    decrypt(inputStr, encryptionKey) {
        throw new Error('You have to implement the method decrypt!');
    }
}

inversify.decorate(inversify.injectable(), EncryptionBase);