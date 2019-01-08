const ipfsClient = require('ipfs-http-client')
import FileSystemProvider from './FileSystemProvider'
const regeneratorRuntime = require("regenerator-runtime");

export default class IpfsFileSystemProvider extends FileSystemProvider {
    constructor () {
        super();
        this.ipfs = ipfsClient('localhost', '5001');
        console.log('IPFS: ', this.ipfs);
    }

    async createFileWithContent(fileContent, destinationFilePath) {
        var self = this;
        var content = this.ipfs.types.Buffer.from(fileContent);
        console.log('creating file...', fileContent, '---', destinationFilePath);
        await this.ipfs.add(content)
        .then(async (res) => {
            // TODO: Handle errors.

            console.log('File written: ', res);
            // var request = require('request');
            // var url = 'http://localhost:5001/api/v0/name/publish?arg=/ipfs/' + res[0].hash + '&key=' + destinationFilePath;
            // console.log('url: ', url);
            // var r = request.post(
            //     url,
            //     function(err, response, body) {
            //       var values = JSON.parse(body);
            //       console.log('values:', values);
            
            //     }
            //   );
            //   r.end();
            //   console.log('Request ended');
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

        console.log('here: ', foundKey.id);

        // TODO: This could happen before list function above is done? Or now this function needs to be awaited?
        var result = undefined;
        await this.ipfs.name.resolve(foundKey.id)
        .then(async (name) => {
            console.log('here2');
            await self.ipfs.cat(name)
              .then((file) => {
                var content = file.toString('utf8');
                console.log(content);
                result = content;
              })
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
        content = content + line + '\n';
        console.log('Got content: ', content)
        await this.createFileWithContent(content, filePath);
    }
}