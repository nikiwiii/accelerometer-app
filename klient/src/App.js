import './App.css';
import React from 'react';

export class App extends React.Component {
  constructor() {
    super()
    this.state = {
      x: .4,
      y: .2,
      z: 0,
      size: 0,
      growingAdded: 0,
      goer: 0.003,
      blocks: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0]
    }
  }
  failChecked = false
  chosen = 8
  ws = new WebSocket('ws://192.168.119.116:1337')
  componentDidMount() {
    this.ws.onopen = () => {
      console.log('połączono');
    };
    this.ws.onmessage = (e) => {
      this.setState(JSON.parse(e.data))
      // this.setState(JSON.parse(e))
    };
    this.ws.onerror = (e) => {
      console.log(e.message);
    };
    this.ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
    setInterval(this.increaseThat, 41)
  }
  increaseThat = () => {
    if (this.state.size <= 100) {
      this.setState({ size: this.state.size + this.state.growingAdded })
      this.setState({ growingAdded: this.state.growingAdded + this.state.goer })
      this.failChecked = false
    }
    else {
      if (!this.failChecked) {
        this.setState({ size: 0, growingAdded: 0 })
        this.checkCrash()
        this.randomize()
        this.failChecked = true
      }
    }
  }
  randomize = () => {
    let tempArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    this.chosen = Math.floor(Math.random() * 15)
    tempArr[this.chosen] = 1
    this.setState({ blocks: tempArr })
  }
  checkCrash = () => {
    const x = Math.round((1 - (this.state.x + .5)) * 100) / 100
    const y = Math.round((1 - (this.state.y + .5)) * 100) / 100

    if (x > ((this.chosen % 4) / 4) && x < ((this.chosen % 4) / 4) + 0.25
      && y > (this.chosen / 16) && y < (this.chosen / 16) + 0.25) {
      console.log('you good')
      console.log(x, ((this.chosen % 4) / 4), '/', y, (this.chosen / 16) + 0.25);
    }
    else {
      console.log('you crashed');
      console.log(x, ((this.chosen % 4) / 4), '/', y, (this.chosen / 16) + 0.25);
      this.setState({ goer: 0, size: 100 })
    }
  }
  render() {
    return (
      <div className="all">
        {
          this.state.goer === 0 ?
            <div style={{
              width: '100%', textAlign: 'center', position: 'absolute', top: '40%', zIndex: 10
            }}><p style={{
              fontSize: '40px', color: 'brown', textShadow: '0 0 5px black'
            }}>U LOST, THE PASSENGERS ARE DEAD</p><a href='' style={{ fontSize: 30, textDecoration: 'none', color: 'white' }}>RESTART</a></div> : null
        }
        <p>{this.state.x},{this.state.y},{this.state.z}</p>
        <div className="fkinwall"
          style={{ width: `${this.state.size}%`, height: `${this.state.size}%` }}>
          {
            this.state.blocks.map((e) => {
              return (
                <div className='wall'
                  style={{ background: e === 0 ? 'none' : 'white' }}></div>
              )
            })
          }
        </div>
        <div className="fkinplane"
          style={{
            transform: `translateX(-50%) translateY(-50%) rotateX(${-this.state.y * 90 + 75}deg)`,
            top: `${(this.state.y - .5) * (-100)}%`,
            left: `${(this.state.x - .5) * (-100)}%`,
            zIndex: 1,
            opacity: this.state.goer === 0 ? '0' : '1'
          }}>
          <div className="wings" style={{ backgroundColor: 'lightgrey' }}>
          </div>
          <div className="body">
          </div>
          <div className="backwings">
          </div>
        </div>

        <div className="fkinplane shade"
          style={{
            transform: `translateX(-50%) translateY(-50%) rotateX(${-this.state.y * 90 + 75}deg)`,
            top: `${(this.state.y - .5) * (-101.5)}%`,
            left: `${(this.state.x - .5) * (-100)}%`,
            filter: 'brightness(.5)',
            opacity: this.state.goer === 0 ? '0' : '1'
          }}>
          <div className="wings">
          </div>
          <div className="body">
          </div>
          <div className="backwings">
          </div>
        </div>
        {
          this.state.goer === 0 ? <img style={{
            position: 'absolute',
            top: `${(this.state.y - .5) * (-100) - 15}%`,
            left: `${(this.state.x - .5) * (-100) - 10}%`
          }} src={require('./explosion.gif')}></img> : null
        }
        <div className='grid'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default App;
