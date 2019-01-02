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

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
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
        this.props.parentContext.identityHandler.LoginController.login(this.state.username, this.state.password);
        bookmarkScreen.push(<BookmarkScreen appContext={this.props.appContext} key={3} />)
        this.props.appContext.setState({loginPage:[],bookmarkScreen:bookmarkScreen})
    }
}

export default Login;