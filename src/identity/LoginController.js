import {container, TYPES} from '../inversify.config'
import FileSystemFactory from '../io/FileSystemFactory';

export default class LoginController {
    constructor(storageType){
        this.encryptor = container.get(TYPES.Encryptor);
        this.storageType = storageType;
        this.fileSystemProvider = FileSystemFactory.createFileSystemProvider(storageType);
        this.errorMessage = "Invalid username or password.";
    }

    login(username, password) {
        var fileName = ''
        try {
            fileName = this.fileSystemProvider.getUniqueFileNameForUser(username);
            var encryptionKey = this.encryptor.generateEncryptionKey(username, password);
            var usernameHash = this.encryptor.getDeterministicHash(username);

            // Try to open file with name equal to username, to see if this user exists.
            var content = this.fileSystemProvider.getFileContent(fileName); // TODO: could fail.
            var header = content.split('<HEADER_END>')[0];
            var decryptedHeader = this.encryptor.decrypt(header, encryptionKey);
        }
        catch {
            // TODO: Need some internal traces.
            throw new Error(this.errorMessage);
        }

        if (decryptedHeader !== usernameHash) {
            throw new Error(this.errorMessage);
        }

        // TODO: store encryptionKey somewhere, to be used for reading encrypted bookmarks.
        return [encryptionKey, fileName];
    }
}