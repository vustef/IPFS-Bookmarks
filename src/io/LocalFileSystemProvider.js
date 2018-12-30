import {container, TYPES} from '../inversify.config'
import FileSystemProvider from './FileSystemProvider'
var fs = require('fs');

export default class LocalFileSystemProvider extends FileSystemProvider {
    constructor () {
        this.encryptor = container.get(TYPES.Encryptor);
    }

    createFileWithContent (fileContent, destinationFilePath) {
        fs.writeFile(destinationFilePath, fileContent, function(err, data){
            if (err) throw new Error('File already exists'); // TODO: Perhaps some other reason - need to work concurrently also.
        });
    }

    getFileContent(filePath) {
        fs.readFile(filePath, function(err, buf) {
            return buf.toString();
          });
    }

    getUniqueFileNameForUser(username) {
        return this.encryptor.getConsistentHash(username);
    }
}