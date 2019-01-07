'use strict'

import React from "react";
import { hot } from 'react-hot-loader'
import {container, TYPES} from '../src/inversify.config'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import PropTypes from 'prop-types';
import Loginscreen from './Loginscreen'

import Encryption from './identity/Encryption';

container.bind(TYPES.Encryptor).to(Encryption).inSingletonScope();
// Installs globals onto window:
// * Buffer
// * require (monkey-patches if already defined)
// * process
// You can pass in an arbitrary object if you do not wish to pollute
// the global namespace.
BrowserFS.install(window);
// Configures BrowserFS to use the LocalStorage file system.
BrowserFS.configure({
  fs: "LocalStorage"
}, function (e) {
  if (e) {
    // An error happened!
    throw e;
  }
  // Otherwise, BrowserFS is ready-to-use!
});

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: '#11cb5f' },
  },
  typography: {
    useNextVariants: true,
  },
});

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
      bookmarkScreen:[]
    }
  }

  static get childContextTypes()
  {
    return { muiTheme: PropTypes.object };
  }

  getChildContext()
  {
    return { muiTheme: theme };
  }

  componentWillMount(){
    var loginPage =[];
    loginPage.push(<Loginscreen parentContext={this} key={0}/>);
    this.setState({
                  loginPage:loginPage
                    })
  }

  render () {
    return (
        <div id="myapp">
        <MuiThemeProvider theme={theme}>
        <div className="App" style={{textAlign: 'center'}}>
              {this.state.loginPage}
              {this.state.bookmarkScreen}
        </div>
        </MuiThemeProvider>
        </div>
    );
  }
}

export default hot(module)(App)
