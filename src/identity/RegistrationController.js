import Encryption from './Encryption';
import FileSystemFactory from '../io/FileSystemFactory';

export default class RegistrationController {
    static register(username, password) {
        var usernameHash = Encryption.getConsistentHash(username);
        var encryptionKey = Encryption.generateEncryptionKey(username, password);
        var encryptedUsername = Encryption.encrypt(username, encryptionKey);
        var fileSystemProvider = FileSystemFactory.createFileSystemProvider("local");

        // Try to open file with name equal to username, to see if this user was already registered.
        // TODO: use abstraction for generating filename, it might be different. Perhaps this should be done through fsProvider.
        var fileExists = fileSystemProvider.checkIfExists(usernameHash);

        if (fileExists) {
            throw new Error("Username already exists");
        }
        else {
            // TODO: file should be created with its content...to avoid moments of having empty files.
            var userFile = fileSystemProvider.createFile(usernameHash); // TODO: could fail.
            
            // TODO: use abstraction for writing, to have concurrent reads (collaborative editing).
            encryptedFileContent = Encryption.encrypt(encryptedUsername, encryptionKey);
            userFile.writeText(encryptedFileContent);
        }
    }
}