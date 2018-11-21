'use strict'

import React from "react";
import { hot } from 'react-hot-loader'
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import BookmarksList from './BookmarksList';
import Home from "./Home";
import Stuff from "./Stuff";
import Loginscreen from './Loginscreen'
import UploadScreen from './UploadScreen';

console.log('Start')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      version: null,
      protocol_version: null,
      added_file_hash: null,
      added_file_contents: null,
      loginPage:[],
      uploadScreen:[]
    }
  }

  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }

  render () {
    console.log('render App')
    return (
        <HashRouter> 
          <div style={{textAlign: 'center'}}>
            <h1>Everything is working!</h1>
            <ul className="header">
              <li><NavLink exact to="/">Home</NavLink></li>
              <li><NavLink to="/stuff">Stuff</NavLink></li>
            </ul>
            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/stuff" component={Stuff}/>
            </div>
            <BookmarksList />
            <div className="App">
              {this.state.loginPage}
              {this.state.uploadScreen}
            </div>
          </div>
        </HashRouter>
    );
  }
}

export default hot(module)(App)
