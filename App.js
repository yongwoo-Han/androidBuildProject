import React, { Component } from 'react';
import HomeScreen from './component/HomeScreen/index.js';

export default class App extends Component {

  render() {
    return(
        <HomeScreen/>
    );
  }
}

// skip this line if using Create React Native App
// AppRegistry.registerComponent('simplePerformanceProject', () => withNavigation(App));