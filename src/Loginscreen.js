import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import Login from './Login';
import Register from './Register';

class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin:true
    }
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
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          {this.state.loginmessage}
            <div>
               <Button variant="contained" style={style} onClick={(event) => this.handleClick(event)}>
                {this.state.buttonLabel}
               </Button>
           </div>
        </div>
      </div>
    );
  }

  handleClick(event){
    // console.log("event",event);
    var loginmessage;
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<Register parentContext={this} key={1}/>);
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