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
      first_name:'',
      last_name:'',
      email:'',
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
             label="Enter your First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             label="Enter your Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             label="Enter your Email"
             type="email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
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
    var apiBaseUrl = "http://localhost:4000/api/";
    console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload={
    "first_name": this.state.first_name,
    "last_name":this.state.last_name,
    "email":this.state.email,
    "password":this.state.password
    }

    //  console.log("registration successfull");
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this}/>);
    var loginmessage = "Not registered yet. Go to registration";
    self.props.parentContext.setState({
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