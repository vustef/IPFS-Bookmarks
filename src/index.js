'use strict'
import ReactDOM from 'react-dom'
import React from 'react'
import App from "./App";
import "./styles/index.css";

var root = undefined;
try{
   root = document.getElementById('root')
}
catch(e) {
    console.log(e.message);
    //root = document.getElementById('content')
}
ReactDOM.render(<App />, root)
