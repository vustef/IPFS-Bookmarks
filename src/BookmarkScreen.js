import React from "react";

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

import Home from "./Home";
import Stuff from "./Stuff";
 
class BookmarkScreen extends React.Component {
  render() {
    return (
      <div>
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
            
          </div>
        </HashRouter>
        </div>
    );
  }
}
 
export default BookmarkScreen;