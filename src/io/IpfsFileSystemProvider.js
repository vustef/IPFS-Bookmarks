const ipfsClient = require('ipfs-http-client')
import FileSystemProvider from './FileSystemProvider'
const regeneratorRuntime = require("regenerator-runtime");

export default class IpfsFileSystemProvider extends FileSystemProvider {
    constructor () {
        super();
        this.ipfs = ipfsClient('localhost', '5001');
    }

    async createFileWithContent(fileContent, destinationFilePath) {
        var self = this;
        var content = this.ipfs.types.Buffer.from(fileContent);
        await this.ipfs.add(content)
        .then(async (res) => {
            // TODO: Handle errors.
            await self.ipfs.name.publish('/ipfs/' + res[0].hash,
                {
                    key: destinationFilePath
                })
                .then(res => {
                    var name = res.name
                    console.log('published name: ', name);
                })
                .catch((err) => {
                    console.error(err);
                    throw err;
                })
        })
    }

    async getFileContent(filePath) {
        var self = this;
        var foundKey = undefined
        await this.ipfs.key.list()
        .then((keys) => {
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                if (key.name == filePath) { // Need to have key with the same name as username: key per user.
                    foundKey = key;
                    break;
                }
            }
        })

        // TODO: This could happen before list function above is done? Or now this function needs to be awaited?
        var result = undefined;
        await this.ipfs.name.resolve(foundKey.id)
        .then(async (name) => {
            await self.ipfs.cat(name)
              .then((file) => {
                var content = file.toString('utf8');
                result = content;
              })
        })

        return result;
    }

    getUniqueFileNameForUser(username) {
        // Each username has its own key, which is unique.
        return username;
    }

    async appendLine(filePath, line) {
        var content = await this.getFileContent(filePath);
        content = content + line + '\n';
        await this.createFileWithContent(content, filePath);
    }
}