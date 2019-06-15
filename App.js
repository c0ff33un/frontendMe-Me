import React, { Component } from 'react'
import { Provider } from 'react-redux';

import MemeApp from './src/MemeApp'
import configureStore from "@redux/store";

const store = configureStore()

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
