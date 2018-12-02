export default class LocalFileSystemProvider extends FileSystemProvider {
    constructor () {
        this.super(props);
    }

    openFile (filePath, mode) {
        throw new Error('You have to implement the method openFile!');
    }
}