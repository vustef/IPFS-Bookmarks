'use strict'

import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import BookmarkScreen from './BookmarkScreen';

const style = {
    margin: 15,
   };

const encryptionKeyCookie = "encryptionKey";
const fileNameCookie = "fileName";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    componentWillMount(){
        var encryptionKey = getCookie(encryptionKeyCookie);
        if (encryptionKey != undefined) {
            console.log('enc key: ', encryptionKey)
            var fileName = getCookie(fileNameCookie);
            console.log('fileName: ', fileName)
            var bookmarkScreen=[];

            // TODO: If this errors out, message won't be printed in browser - fix this. Same in register.js.
            bookmarkScreen.push(<BookmarkScreen fileSystemProvider={this.props.parentContext.identityHandler.LoginController.fileSystemProvider} appContext={this.props.appContext} key={3} encryptionKey={encryptionKey} fileName={fileName} />) // TODO: Going to other page and back requires new login...

            this.props.appContext.setState({ loginPage: [], bookmarkScreen: bookmarkScreen })
        }
      }

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Login
                        </Typography>
                    </Toolbar>
                </AppBar>
                <TextField
                 label="Enter your Username"
                 onChange = {(event) => this.setState({username:event.target.value})}
                 />
                <br/>
                <TextField
                   type="password"
                   label="Enter your Password"
                   onChange = {(event) => this.setState({password:event.target.value})}
                   />
                <br/>
                <Button variant="contained" style={style} onClick={(event) => this.handleClick(event)}>
                    Submit
                </Button>
            </div>
        );
    }

  handleClick(event){
        var bookmarkScreen=[];

        // TODO: If this errors out, message won't be printed in browser - fix this. Same in register.js.
        var loginResult = this.props.parentContext.identityHandler.LoginController.login(this.state.username, this.state.password);
        bookmarkScreen.push(<BookmarkScreen fileSystemProvider={this.props.parentContext.identityHandler.LoginController.fileSystemProvider} appContext={this.props.appContext} key={3} encryptionKey={loginResult[0]} fileName={loginResult[1]} />) // TODO: Going to other page and back requires new login...
        setCookie(encryptionKeyCookie, loginResult[0], 1);
        setCookie(fileNameCookie, loginResult[1], 1);
        this.props.appContext.setState({loginPage:[],bookmarkScreen:bookmarkScreen})
    }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return undefined;
}

export default Login;