import {container, TYPES} from '../inversify.config'
import FileSystemProvider from './FileSystemProvider'
var fs = require('fs');

export default class LocalFileSystemProvider extends FileSystemProvider {
    constructor () {
        super();
        this.encryptor = container.get(TYPES.Encryptor);
    }

    createFileWithContent (fileContent, destinationFilePath) {
        if (fs.existsSync(destinationFilePath)) {
            throw new Error("File already exists");
        }
        fs.writeFileSync(destinationFilePath, fileContent);
    }

    getFileContent(filePath) {
        return fs.readFileSync(filePath).toString();
    }

    getUniqueFileNameForUser(username) {
        return this.encryptor.getDeterministicHash(username);
    }
}