import React, { Component } from 'react'
import { Provider } from 'react-redux';

import MemeApp from './src/MemeApp'
import store from "./src/redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <MemeApp />
      </Provider>
    );
  }
}

export default App;
