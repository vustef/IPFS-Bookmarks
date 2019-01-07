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

            await self.ipfs.name.publish(res.path,
                {
                    key: destinationFilePath
                })
                .then(res => {
                    var name = res.name
                    console.log('published name: ', name);
                })
                .catch(err => {
                    console.error(err)
                })
        })
        .catch((err) => {
            console.error(err)
        });
    }

    async getFileContent(filePath) {
        var self = this;
        var foundKey = undefined
        console.log('fileName: ', filePath)
        await this.ipfs.key.list()
        .then((keys) => {
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                console.log('key: ', key);
                if (key.name == filePath) { // Need to have key with the same name as username: key per user.
                    console.log('found');
                    foundKey = key;
                    break;
                }
            }
        })
        .catch((err) => {
            console.error(err)
        });

        console.log('here: ', foundKey.id);

        // TODO: This could happen before list function above is done? Or now this function needs to be awaited?
        var result = undefined;
        await this.ipfs.name.resolve(foundKey.id)
        .then(async (name) => {
            console.log('here2');
            await ipfs.cat(name)
              .then((file) => {
                var content = file.toString('utf8');
                console.log(content);
                result = content;
              })
              .catch((err) => {
                console.error(err)
              });
        })
        .catch((err) => {
            console.error(err)
        })

        console.log('here3');

        return result;
    }

    getUniqueFileNameForUser(username) {
        // Each username has its own key, which is unique.
        return username;
    }

    async appendLine(filePath, line) {
        var content = await this.getFileContent(filePath);
        content = content + '\n';
        await this.createFileWithContent(content, filePath);
    }
}