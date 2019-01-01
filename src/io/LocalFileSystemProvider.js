import {container, TYPES} from '../inversify.config'
import FileSystemProvider from './FileSystemProvider'
var fs = require('fs');

export default class LocalFileSystemProvider extends FileSystemProvider {
    constructor () {
        super();
        this.encryptor = container.get(TYPES.Encryptor);
    }

    createFileWithContent (fileContent, destinationFilePath) {
        fs.writeFileSync(destinationFilePath, fileContent);
    }

    getFileContent(filePath) {
        return fs.readFileSync(filePath).toString();
    }

    getUniqueFileNameForUser(username) {
        return this.encryptor.getConsistentHash(username);
    }
}