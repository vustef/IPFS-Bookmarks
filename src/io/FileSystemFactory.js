import LocalFileSystemProvider from "./LocalFileSystemProvider";
import IpfsFileSystemProvider from "./IpfsFileSystemProvider";

/**
 * Factory for creating a filesystem provider.
 */
export default class FileSystemFactory {
    static createFileSystemProvider(fileSystemType) {
        switch (fileSystemType) {
            case "local":
                return new LocalFileSystemProvider();
            case "ipfs":
                return new IpfsFileSystemProvider();
            default:
                throw new Error ("Filesystem type " + fileSystemType + " not supported");
        }
    }
}