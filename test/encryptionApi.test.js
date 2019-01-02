import Encryption from '../src/identity/Encryption'

test('create encryption key and verify encryption and decryption', () => {
    const username = "NewUser";
    const password = "NewPassword";
    var encryptor = new Encryption();
    var encryptionKey = encryptor.generateEncryptionKey(username, password);

    const message = "My super secret message.";
    var cipher = encryptor.encrypt(message, encryptionKey);
    var decipheredMessage = encryptor.decrypt(cipher, encryptionKey);
    expect(decipheredMessage).toBe(message);
});