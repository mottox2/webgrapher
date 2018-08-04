import * as React from 'react'
import { hot } from 'react-hot-loader'

class App extends React.Component {
  capture() {
    console.log('capture')
  }

  render() {
    return (
      <div>
        <button onClick={this.capture}>Capture...</button>
        <p>Hello World</p>
        <webview src="https://github.com" />
      </div>
    )
  }
}

export default hot(module)(App)
