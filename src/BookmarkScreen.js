import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { serialize, deserialize } from "react-serialize"
import {container, TYPES} from './inversify.config'
import Loginscreen from './Loginscreen'
const regeneratorRuntime = require("regenerator-runtime");

const style = {
  margin: 15,
 };

function eraseCookie(name)
{
  document.cookie = name+'=; expires='+new Date(0).toGMTString() +'; path=/';
}

const encryptionKeyCookie = "encryptionKey";
const fileNameCookie = "fileName";

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
        <Button variant="contained" style={style} onClick={(event) => this.handleLogoutClick(event)}>
          Logout
        </Button>
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

  async componentWillMount(){
    var bookmarkList=[];
      var fileSystemProvider = this.props.fileSystemProvider;
      var fileName = this.props.fileName;

      this.encryptor = container.get(TYPES.Encryptor);

      var content = await fileSystemProvider.getFileContent(fileName);
      var bookmarksInFile = content.split('<HEADER_END>')[1];
      bookmarksInFile = bookmarksInFile.split('\n');
      for (var i = 0; i < bookmarksInFile.length; ++i) { // TODO: susceptible to script injection?
        var bookmarkInFile = bookmarksInFile[i];
        if (!bookmarkInFile || bookmarkInFile == '') {
          continue;
        }
        var decryptedBookmarkInFile = this.encryptor.decrypt(bookmarkInFile, this.props.encryptionKey);
        decryptedBookmarkInFile = decryptedBookmarkInFile;
        var deserializedBookmarkInFile = deserialize(decryptedBookmarkInFile);
        bookmarkList.push(deserializedBookmarkInFile);
      }

      this.setState({
        bookmarkList:bookmarkList,
        bookmarkLink:'',
        bookmarkLink:''
      });
  }

  handleLogoutClick(event){
    eraseCookie(encryptionKeyCookie);
    eraseCookie(fileNameCookie);
    var appContext = this.props.appContext; // TODO: need to copy this and set its state to initial.
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={appContext} key={0}/>);
    appContext.setState({
                  loginPage:loginPage
                    })
  }

  async handleClick(event){
      var bookmarkList=[];
      var fileSystemProvider = this.props.fileSystemProvider;
      var fileName = this.props.fileName;

      this.encryptor = container.get(TYPES.Encryptor);

      var content = await fileSystemProvider.getFileContent(fileName);
      var bookmarksInFile = content.split('<HEADER_END>')[1];
      bookmarksInFile = bookmarksInFile.split('\n');
      for (var i = 0; i < bookmarksInFile.length; ++i) { // TODO: susceptible to script injection?
        var bookmarkInFile = bookmarksInFile[i];
        if (!bookmarkInFile || bookmarkInFile == '') {
          continue;
        }
        var decryptedBookmarkInFile = this.encryptor.decrypt(bookmarkInFile, this.props.encryptionKey);
        decryptedBookmarkInFile = decryptedBookmarkInFile;
        var deserializedBookmarkInFile = deserialize(decryptedBookmarkInFile);
        bookmarkList.push(deserializedBookmarkInFile);
      }
      var bookmark = (
        <div>
          <a href={this.state.bookmarkLink}>
            {this.state.bookmarkName}
          </a>
        </div>
      )

      // TODO: link has to have http prefix...handle this?
      bookmarkList.push(
        bookmark
      );

      var jsonBookmark = serialize(bookmark);
      var encryptedBookmark = this.encryptor.encrypt(jsonBookmark, this.props.encryptionKey);
      // TODO: Filesystem could be dependency injection...
      await fileSystemProvider.appendLine(fileName, encryptedBookmark)

      this.setState({
        bookmarkList:bookmarkList,
        bookmarkLink:'',
        bookmarkLink:''
      });
  }
}

export default BookmarkScreen;