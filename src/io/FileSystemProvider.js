export default class FileSystemProvider {
    constructor () {
      if (this.constructor === FileSystemProvider) 
          throw new Error("Cannot instantiate FileSystemProvider");
    }

    openFile (filePath, mode) {
        throw new Error('You have to implement the method openFile!');
    }
}