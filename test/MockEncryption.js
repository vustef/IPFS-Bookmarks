var inversify = require("inversify");
require("reflect-metadata");

import EncryptionBase from '../src/identity/EncryptionBase';

const encryptionKeyBinding = 'EncryptionKey';
const consistentHashBinding = 'ConsistentHash';
const encryptedStringBinding = 'EncryptedString';

export default class MockEncryption extends EncryptionBase {
    constructor(encryptionKey, consistentHash, encryptedString) {
        super();
        this.dict = {};
        this.id = 0;
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
        for (var key in this.dict) {
            console.log("Found: " + key + ", value: " + this.dict[key]);
            if (this.dict[key] === inputStr) {
                return key;
            }
        }

        var res = this.encryptedString + this.id++;
        this.dict[res] = inputStr;

        return res;
    }

    decrypt(inputStr, encryptionKey) {
        return this.dict[inputStr];
    }
}

inversify.decorate(inversify.injectable(), MockEncryption);
inversify.decorate(inversify.inject(encryptionKeyBinding), MockEncryption, 0);
inversify.decorate(inversify.inject(consistentHashBinding), MockEncryption, 1);
inversify.decorate(inversify.inject(encryptedStringBinding), MockEncryption, 2);

export {encryptionKeyBinding};
export {consistentHashBinding};
export {encryptedStringBinding};