import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
          <div>
            <List component="nav">
            {this.state.bookmarkList}
            </List>
          </div>
        </div>
        
      </div>
    );
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
        var deserializedBookmarkInFile = JSON.parse(decryptedBookmarkInFile);
        console.log('deserializedBookmarkInFile: '+ deserializedBookmarkInFile)
        bookmarkList.push(deserializedBookmarkInFile);
      }
      var bookmark = <a href={this.state.bookmarkLink}>
      <ListItem button key={bookmarkList.length}>
        <ListItemText primary={this.state.bookmarkName} />
      </ListItem>
    </a>

      // TODO: link has to have http prefix...handle this?
      bookmarkList.push(
        bookmark
      );

      var jsonBookmark = JSON.stringify(bookmark);
      var encryptedBookmark = this.encryptor.encrypt(jsonBookmark, this.props.encryptionKey);

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