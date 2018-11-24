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
                 onChange = {(event,newValue) => this.setState({username:newValue})}
                 />
                <br/>
                <TextField
                   type="password"
                   label="Enter your Password"
                   onChange = {(event,newValue) => this.setState({password:newValue})}
                   />
                <br/>
                <Button variant="contained" style={style} onClick={(event) => this.handleClick(event)}>
                    Submit
                </Button>
            </div>
        );
    }

  handleClick(event){
        var payload={
            "email":this.state.username,
            "password":this.state.password
        }

        var bookmarkScreen=[];
        bookmarkScreen.push(<BookmarkScreen appContext={this.props.appContext} key={0} />)
        this.props.appContext.setState({loginPage:[],bookmarkScreen:bookmarkScreen})
    }
}

export default Login;