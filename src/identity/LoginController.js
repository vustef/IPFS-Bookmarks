import Encryption from './Encryption';
import FileSystemFactory from '../io/FileSystemFactory';

export default class LoginController {
    static login(username, password) {


        var usernameHash = Encryption.getConsistentHash(username);
        var encryptionKey = Encryption.generateEncryptionKey(username, password);

        var encryptedUsername = Encryption.encrypt(username, encryptionKey);
        var fileSystemProvider = FileSystemFactory.createFileSystemProvider("local");

        // Try to open file with name equal to username, to see if this user exists.
        // TODO: use abstraction for generating filename, it might be different. Perhaps this should be done through fsProvider.
        var userFile = fileSystemProvider.openFile(usernameHash);

        if (!userFile) {
            throw new Error("Username doesn't exist.");
        }
        else {
            var content = fileSystemProvider.readAll(usernameHash); // TODO: could fail.
            var decryptedContent = Encryption.decrypt(content, encryptionKey);

            if (decryptedContent !== encryptedUsername) {
                throw new Error("Incorrect password.");
            }

            // TODO: store encryptionKey somewhere, to be used for reading encrypted bookmarks.
        }
    }
}