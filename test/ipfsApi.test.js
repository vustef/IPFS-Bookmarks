import IpfsFileSystemProvider from '../src/io/IpfsFileSystemProvider'
const regeneratorRuntime = require("regenerator-runtime");
const fileSystemProvider = new IpfsFileSystemProvider();

test('test ipfs', async () => {
    const username = "User1";
    var content = "Content";
    var fileName = fileSystemProvider.getUniqueFileNameForUser(username);
    await fileSystemProvider.createFileWithContent(content, fileName);
    var readContent = await fileSystemProvider.getFileContent(fileName);
    expect(readContent).toBe(content);

    await fileSystemProvider.appendLine(fileName, 'line');
    readContent = await fileSystemProvider.getFileContent(fileName);
    expect(readContent).toBe(content+'line'+'\n');
});