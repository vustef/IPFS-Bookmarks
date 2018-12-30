import Encryption from '../../test/MockEncryption';
import FileSystemFactory from '../io/FileSystemFactory';

export default class RegistrationController {
    constructor(storageType){
        this.storageType = storageType;
        this.fileSystemProvider = FileSystemFactory.createFileSystemProvider(storageType);
    }

    register(username, password) {
        var fileName = fileSystemProvider.getUniqueFileNameForUser(username);
        var encryptionKey = Encryption.generateEncryptionKey(username, password);
        var encryptedUsername = Encryption.encrypt(username, encryptionKey);

        // Try to open file with name equal to username, to see if this user was already registered.
        var fileExists = fileSystemProvider.checkIfExists(fileName); // TODO: Perhaps leave failing to createFileWithContent method, it has to fail anyway.

        if (fileExists) {
            throw new Error("Username already exists");
        }
        else {
            // TODO: use abstraction for writing, to have concurrent reads (collaborative editing).
            encryptedFileContent = Encryption.encrypt(encryptedUsername, encryptionKey);

            fileSystemProvider.createFileWithContent(encryptedFileContent, fileName /* destinationPath */); // TODO: could fail.
        }
    }
}