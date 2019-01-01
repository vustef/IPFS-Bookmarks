import {container, TYPES} from '../inversify.config'
import FileSystemFactory from '../io/FileSystemFactory';

export default class LoginController {
    constructor(storageType){
        this.encryptor = container.get(TYPES.Encryptor);;
        this.storageType = storageType;
        this.fileSystemProvider = FileSystemFactory.createFileSystemProvider(storageType);
    }

    login(username, password) {
        var fileName = this.fileSystemProvider.getUniqueFileNameForUser(username);
        var encryptionKey = this.encryptor.generateEncryptionKey(username, password);

        var encryptedUsername = this.encryptor.encrypt(username, encryptionKey);

        // Try to open file with name equal to username, to see if this user exists.
        var content = this.fileSystemProvider.getFileContent(fileName); // TODO: could fail.
        var decryptedContent = this.encryptor.decrypt(content, encryptionKey);

        if (decryptedContent !== encryptedUsername) {
            console.log(decryptedContent);
            console.log(encryptedUsername);
            throw new Error("Incorrect password.");
        }

        // TODO: store encryptionKey somewhere, to be used for reading encrypted bookmarks.
        return encryptionKey;
    }
}