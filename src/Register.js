import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Login from './Login';

class Register extends Component {
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
                            Register
                        </Typography>
                    </Toolbar>
           </AppBar>
           <TextField
             label="Enter your Username"
             onChange = {(event) => this.setState({username:event.target.value})}
             />
           <br/>
           <TextField
             type = "password"
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
    //TODO: validate and check for empty values before hitting submit.
    this.props.parentContext.identityHandler.RegistrationController.register(this.state.username, this.state.password);
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this.props.parentContext} appContext={this.props.appContext} key={4}/>);
    var loginmessage = "Not registered yet. Go to registration";
    this.props.parentContext.setState({
        loginscreen:loginscreen,
        loginmessage:loginmessage,
        buttonLabel:"Register",
        isLogin:true
   });
  }
}

const style = {
  margin: 15,
};

export default Register;