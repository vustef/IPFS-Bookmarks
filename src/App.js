'use strict'

import React from "react";
import { hot } from 'react-hot-loader'

//import MuiThemeProvider from 'material-ui/core/styles/MuiThemeProvider'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import PropTypes from 'prop-types';

import Loginscreen from './Loginscreen'

console.log('Start')

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
    console.log('render App')
    return (
        <MuiThemeProvider theme={theme}>
        <div className="App" style={{textAlign: 'center'}}>
              {this.state.loginPage}
              {this.state.bookmarkScreen}
        </div>
        </MuiThemeProvider>
    );
  }
}

export default hot(module)(App)
