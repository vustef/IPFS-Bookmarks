export default class FileHandle {
    constructor (fileSystemProvider) {
      this.fileSystemProvider = fileSystemProvider;
    }

    append(text) {
        this.fileSystemProvider.appendFile(text)
    }
}