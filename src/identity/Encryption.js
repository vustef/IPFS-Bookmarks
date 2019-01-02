var inversify = require("inversify");
require("reflect-metadata");
var pbkdf2 = require('pbkdf2')
var shajs = require('sha.js')
var cryptoJS = require("crypto-js");

import EncryptionBase from './EncryptionBase';

export default class Encryption extends EncryptionBase {
    constructor() {
        super();
    }

    getDeterministicHash(inputStr) {
        return shajs('sha256').update(inputStr).digest('hex');
    }

    generateEncryptionKey(username, password) {
        var usernameHash = this.getDeterministicHash(username);
        var passwordHash = this.getDeterministicHash(password);
        var salt = this.getDeterministicHash(usernameHash+passwordHash);
        return pbkdf2.pbkdf2Sync(
            password,
            salt,
            10000, // iterations
            256, // key length
            'sha512').toString('hex')
    }

    encrypt(inputStr, encryptionKey) {
        return cryptoJS.AES.encrypt(inputStr, encryptionKey).toString();
    }

    decrypt(inputStr, encryptionKey) {
        var bytes  = cryptoJS.AES.decrypt(inputStr, encryptionKey);
        return bytes.toString(cryptoJS.enc.Utf8);
    }
}

inversify.decorate(inversify.injectable(), Encryption);
