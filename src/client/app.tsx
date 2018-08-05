import * as React from 'react'
import { hot } from 'react-hot-loader'
import { NativeImage, Rectangle, WebviewTag } from 'electron'

interface Props {} 

class App extends React.Component<Props> {
  webview: {
    current: WebviewTag
  }

  constructor(props: Props) {
    super(props)
    this.webview = React.createRef()
  }

  capture = () => {
    console.log(this.webview)
    const rect : Rectangle = {x: 200, y: 200, width: 100, height: 100}
    this.webview.current.capturePage(
      rect,
      (image: NativeImage) => {
        console.log(image.toDataURL())
      }
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.capture}>Capture...</button>
        <p>Hello World</p>
        <webview ref={this.webview} src="https://github.com" />
      </div>
    )
  }
}

export default hot(module)(App)
