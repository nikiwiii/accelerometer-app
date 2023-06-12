import './App.css';
import React from 'react';

// window.addEventListener("load", () => {
// })

export class App extends React.Component {
  constructor() {
    super()
    this.state = {
      x: 0,
      y: 0,
      z: 0
    }
  }
  ws = new WebSocket('ws://192.168.10.112:1337')
  componentDidMount() {
    this.ws.onopen = () => {
      console.log('połączono');
    };
    this.ws.onmessage = (e) => {
      console.log(JSON.parse(e.data));
      this.setState(JSON.parse(e.data))
      // this.setState(JSON.parse(e))
    };
    this.ws.onerror = (e) => {
      console.log(e.message);
    };
    this.ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
  }
  render() {
    return (
      <div className="all">
          <p>{this.state.x},{this.state.y},{this.state.z}</p>
          <div className="fkinwall">
          </div>
          <div className="fkinplane" 
          style={{transform: `translateX(-50%) translateY(-50%) rotateX(${-this.state.y * 90 + 75}deg)`,
          top: `${(this.state.y-.5)*(-100)}%`,
          left: `${(this.state.x-.5)*(-100)}%`,
          zIndex: 1}}>
              <div className="wings">
              </div>
              <div className="body">
              </div>
              <div className="backwings"> 
              </div>
          </div>
          
          <div className="fkinplane" 
          style={{transform: `translateX(-50%) translateY(-50%) rotateX(${-this.state.y * 90 + 75}deg)`,
          top: `${(this.state.y-.5)*(-101.5)}%`,
          left: `${(this.state.x-.5)*(-100)}%`,
          filter: 'brightness(.5)'}}>
              <div className="wings">
              </div>
              <div className="body">
              </div>
              <div className="backwings"> 
              </div>
          </div>
      </div>
    );
  }
}

export default App;
