export default class FileSystemProvider {
    constructor () {
      if (this.constructor === FileSystemProvider) 
          throw new Error("Cannot instantiate FileSystemProvider");
    }

    createFileWithContent (fileContent, destinationFilePath) {
        throw new Error('You have to implement the method openFile!');
    }

    getFileContent(filePath) {
        throw new Error('You have to implement the method getFileContent!');
    }

    getUniqueFileNameForUser(username) {
        throw new Error('You have to implement the method getUniqueFileNameForUser!');
    }
}