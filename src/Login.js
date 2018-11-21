'use strict'

import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import UploadScreen from './UploadScreen';

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
            <MuiThemeProvider>
              <div>
                <AppBar title="Login" />
                <TextField
                 hintText="Enter your Username"
                 floatingLabelText="Username"
                 onChange = {(event,newValue) => this.setState({username:newValue})}
                 />
                <br/>
                <TextField
                   type="password"
                   hintText="Enter your Password"
                   floatingLabelText="Password"
                   onChange = {(event,newValue) => this.setState({password:newValue})}
                   />
                <br/>
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>
            </MuiThemeProvider>
            </div>
        );
    }

  handleClick(event){
        var payload={
            "email":this.state.username,
            "password":this.state.password
        }

        var uploadScreen=[];
        uploadScreen.push(<UploadScreen appContext={this.props.appContext}/>)
        this.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
    }
}
const style = {
 margin: 15,
};
export default Login;