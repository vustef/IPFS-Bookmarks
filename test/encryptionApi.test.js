import Encryption from '../src/identity/Encryption'

test('create encryption key', () => {
    const username = "NewUser";
    const password = "NewPassword";
    var encryptor = new Encryption();
    var encryptionKey = encryptor.generateEncryptionKey(username, password);
    console.log(encryptionKey);

    const message = "My super secret message.";
    var cipher = encryptor.encrypt(message, encryptionKey);
    console.log(cipher);
    var decipheredMessage = encryptor.decrypt(cipher, encryptionKey);
    expect(decipheredMessage).toBe(message);
});