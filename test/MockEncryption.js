var inversify = require("inversify");
require("reflect-metadata");

import EncryptionBase from '../src/identity/EncryptionBase';

const encryptionKeyBinding = 'EncryptionKey';
const consistentHashBinding = 'ConsistentHash';
const encryptedStringBinding = 'EncryptedString';

export default class MockEncryption extends EncryptionBase {
    constructor(encryptionKey, consistentHash, encryptedString) {
        super();
        this.encryptionKey = encryptionKey;
        this.consistentHash = consistentHash;
        this.encryptedString = encryptedString;
    }
    generateEncryptionKey(username, password) {
        return this.encryptionKey;
    }

    getConsistentHash(inputStr) {
        return this.consistentHash;
    }

    encrypt(inputStr, encryptionKey) {
        return this.encryptedString;
    }
}

inversify.decorate(inversify.injectable(), MockEncryption);
inversify.decorate(inversify.inject(encryptionKeyBinding), MockEncryption, 0);
inversify.decorate(inversify.inject(consistentHashBinding), MockEncryption, 1);
inversify.decorate(inversify.inject(encryptedStringBinding), MockEncryption, 2);

export {encryptionKeyBinding};
export {consistentHashBinding};
export {encryptedStringBinding};