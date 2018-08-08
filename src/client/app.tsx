import * as React from 'react'
import { hot } from 'react-hot-loader'
import { NativeImage, Rectangle, WebviewTag } from 'electron'

interface Props {}

class App extends React.Component<Props> {
  webview: {
    current: WebviewTag
  }

  state = {
    captureDataURL: '',
    rect: {
      x: 0,
      y: 0,
      width: 100,
      height: 100
    }
  }

  constructor(props: Props) {
    super(props)
    this.webview = React.createRef()
  }

  capture = () => {
    console.log(this.webview)
    const rect: Rectangle = this.state.rect
    console.log(rect)
    this.webview.current.capturePage(rect, (image: NativeImage) => {
      this.setState({ captureDataURL: image.toDataURL() })
      console.log(image.toDataURL())
    })
  }

  render() {
    const { rect, captureDataURL } = this.state
    return (
      <div>
        <webview ref={this.webview} src="https://github.com" style={{ minHeight: '50vh' }} />
        <form onSubmit={this.capture}>
          <input
            value={rect.x}
            type="number"
            onChange={e => this.setState({ rect: { ...rect, x: Number(e.target.value) } })}
          />
          <input
            value={rect.y}
            type="number"
            onChange={e => this.setState({ rect: { ...rect, y: Number(e.target.value) } })}
          />
          <input
            value={rect.width}
            type="number"
            onChange={e =>
              this.setState({
                rect: { ...rect, width: Number(e.target.value) }
              })
            }
          />
          <input
            value={rect.height}
            type="number"
            onChange={e =>
              this.setState({
                rect: { ...rect, height: Number(e.target.value) }
              })
            }
          />
          <button type="submit">Capture</button>
        </form>
        <div>
          {captureDataURL && (
            <img
              style={{ transform: 'scale(0.5)', transformOrigin: 'left top' }}
              src={captureDataURL}
            />
          )}
        </div>
      </div>
    )
  }
}

export default hot(module)(App)
