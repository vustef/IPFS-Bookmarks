import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { serialize, deserialize } from "react-serialize"
import {container, TYPES} from './inversify.config'

const style = {
  margin: 15,
 };

class BookmarkScreen extends React.Component {
  constructor(props){
      super(props);
      this.state={
          bookmarkLink:'',
          bookmarkName:'',
          bookmarkList:[]
      }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Bookmarks</h1>

        <TextField
          label="Enter bookmark name"
          onChange = {(event) => this.setState({bookmarkName:event.target.value})}/>
        <br/>
        <TextField
          label="Enter bookmark URL"
          onChange = {(event) => this.setState({bookmarkLink:event.target.value})}/>
        <br/>
        <Button variant="contained" style={style} onClick={(event) => this.handleClick(event)}>
          Add bookmark
        </Button>
        <div>
            {this.state.bookmarkList}
        </div>
      </div>
    );
  }

  componentWillMount(){
    var bookmarkList=[];
      var fileSystemProvider = this.props.fileSystemProvider;
      var fileName = this.props.fileName;

      this.encryptor = container.get(TYPES.Encryptor);

      var content = fileSystemProvider.getFileContent(fileName);
      console.log('content: ' + content)
      var bookmarksInFile = content.split('<HEADER_END>')[1];
      console.log('bookmarksInFile: '+ bookmarksInFile)
      bookmarksInFile = bookmarksInFile.split('\n');
      for (var i = 0; i < bookmarksInFile.length; ++i) { // TODO: susceptible to script injection?
        var bookmarkInFile = bookmarksInFile[i];
        console.log('bookmarkInFile: '+ bookmarkInFile)
        if (!bookmarkInFile || bookmarkInFile == '') {
          continue;
        }
        var decryptedBookmarkInFile = this.encryptor.decrypt(bookmarkInFile, this.props.encryptionKey);
        decryptedBookmarkInFile = decryptedBookmarkInFile//.substr(0, decryptedBookmarkInFile.length-1);
        console.log('decryptedBookmarkInFile: '+ decryptedBookmarkInFile)
        var deserializedBookmarkInFile = deserialize(decryptedBookmarkInFile);
        console.log('deserializedBookmarkInFile: '+ deserializedBookmarkInFile)
        bookmarkList.push(deserializedBookmarkInFile);
      }

      this.setState({
        bookmarkList:bookmarkList,
        bookmarkLink:'',
        bookmarkLink:''
      });
  }

  handleClick(event){
      var bookmarkList=[];
      var fileSystemProvider = this.props.fileSystemProvider;
      var fileName = this.props.fileName;

      this.encryptor = container.get(TYPES.Encryptor);

      var content = fileSystemProvider.getFileContent(fileName);
      console.log('content: ' + content)
      var bookmarksInFile = content.split('<HEADER_END>')[1];
      console.log('bookmarksInFile: '+ bookmarksInFile)
      bookmarksInFile = bookmarksInFile.split('\n');
      for (var i = 0; i < bookmarksInFile.length; ++i) { // TODO: susceptible to script injection?
        var bookmarkInFile = bookmarksInFile[i];
        console.log('bookmarkInFile: '+ bookmarkInFile)
        if (!bookmarkInFile || bookmarkInFile == '') {
          continue;
        }
        var decryptedBookmarkInFile = this.encryptor.decrypt(bookmarkInFile, this.props.encryptionKey);
        decryptedBookmarkInFile = decryptedBookmarkInFile//.substr(0, decryptedBookmarkInFile.length-1);
        console.log('decryptedBookmarkInFile: '+ decryptedBookmarkInFile)
        var deserializedBookmarkInFile = deserialize(decryptedBookmarkInFile);
        console.log('deserializedBookmarkInFile: '+ deserializedBookmarkInFile)
        bookmarkList.push(deserializedBookmarkInFile);
      }
      var bookmark = (
        <div>
          <a href={this.state.bookmarkLink}>
            {this.state.bookmarkName}
          </a>
        </div>
      )

      console.log('HAAAA: ' + bookmark)

      // TODO: link has to have http prefix...handle this?
      bookmarkList.push(
        bookmark
      );

      var jsonBookmark = serialize(bookmark);
      console.log('jsonBookmark: ' + jsonBookmark);
      var encryptedBookmark = this.encryptor.encrypt(jsonBookmark, this.props.encryptionKey);
      console.log('encryptedBookmark: ' + encryptedBookmark);
      // TODO: Filesystem could be dependency injection...
      fileSystemProvider.appendLine(fileName, encryptedBookmark)

      this.setState({
        bookmarkList:bookmarkList,
        bookmarkLink:'',
        bookmarkLink:''
      });
  }
}

export default BookmarkScreen;