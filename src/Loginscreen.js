import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Login from './Login';
import Register from './Register';
import IdentityHandler from './identity/IdentityHandler';
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin:true,
      fileSystemType: "local"
    }
    this.identityHandler = new IdentityHandler(this.state.fileSystemType);
  }
  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext} key={2}/>);
    var loginmessage = "Not registered yet? Go to Registration.";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage
                    })
  }
  render() {
    const classes = this.props;

    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
            <div>
               <Button variant="contained" style={style} onClick={(event) => this.handleClick(event)}>
                {this.state.buttonLabel}
               </Button>
               <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Type</FormLabel>
                  <RadioGroup
                    aria-label="Type"
                    name="type1"
                    className={classes.group}
                    value={this.state.fileSystemType}
                    onChange={(event) => this.handleChange(event)}>
                    <FormControlLabel value="local" control={<Radio />} label="Local" />
                    <FormControlLabel value="ipfs" control={<Radio />} label="IPFS" />
                  </RadioGroup>
                </FormControl>
           </div>
        </div>
      </div>
    );
  }

  handleChange(event) {
    this.setState({
      fileSystemType: event.target.value
        });
    this.identityHandler = new IdentityHandler(event.target.value);
  }

  handleClick(event){
    var loginmessage;
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<Register parentContext={this} appContext={this.props.parentContext} key={1}/>);
      loginmessage = "Already registered? Go to Login";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Login",
                     isLogin:false
                   })
    }
    else{
      var loginscreen=[];
      loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext} key={0} />);
      loginmessage = "Not registered yet? Go to Registration.";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Register",
                     isLogin:true
                   })
    }
  }
}

const style = {
  margin: 15,
};

export default Loginscreen;