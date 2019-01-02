var inversify = require("inversify");
require("reflect-metadata");

import EncryptionBase from '../src/identity/EncryptionBase';

const encryptionKeyBinding = 'EncryptionKey';
const consistentHashBinding = 'ConsistentHash';
const encryptedStringBinding = 'EncryptedString';

export default class MockEncryption extends EncryptionBase {
    constructor(encryptionKey, consistentHash, encryptedString) {
        super();
        this.encryptionDict = {};
        this.hashDict = {};
        this.encryptionId = 0;
        this.hashId = 0;
        this.encryptionKey = encryptionKey;
        this.consistentHash = consistentHash;
        this.encryptedString = encryptedString;
    }
    generateEncryptionKey(username, password) {
        return this.encryptionKey;
    }

    getDeterministicHash(inputStr) {
        if (this.hashDict[inputStr]) {
            return this.hashDict[inputStr];
        }

        var res = this.consistentHash + this.hashId++;
        this.hashDict[inputStr] = res;

        return res;
    }

    encrypt(inputStr, encryptionKey) {
        for (var key in this.encryptionDict) {
            if (this.encryptionDict[key] === inputStr) {
                return key;
            }
        }

        var res = this.encryptedString + this.encryptionId++;
        this.encryptionDict[res] = inputStr;

        return res;
    }

    decrypt(inputStr, encryptionKey) {
        return this.encryptionDict[inputStr];
    }
}

inversify.decorate(inversify.injectable(), MockEncryption);
inversify.decorate(inversify.inject(encryptionKeyBinding), MockEncryption, 0);
inversify.decorate(inversify.inject(consistentHashBinding), MockEncryption, 1);
inversify.decorate(inversify.inject(encryptedStringBinding), MockEncryption, 2);

export {encryptionKeyBinding};
export {consistentHashBinding};
export {encryptedStringBinding};