import LocalFileSystemProvider from "./LocalFileSystemProvider";

/**
 * Factory for creating a filesystem provider.
 */
export default class FileSystemFactory {
    static createFileSystemProvider(fileSystemType) { // TODO: type should come from config.
        switch (fileSystemType) {
            case "local":
                return new LocalFileSystemProvider();
            default:
                throw new Error ("Filesystem type " + fileSystemType + " not supported");
        }
    }
}