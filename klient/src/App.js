import './App.css';
import React from 'react';

export class App extends React.Component {
  constructor() {
    super()
    this.state = {
      x: .2,
      y: .2,
      z: 0,
      size: 0,
      growingAdded: 0,
      blocks: [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0]
    }
  }
  chosen
  ip = '192.168.184.1'
  ws = new WebSocket('ws://192.168.184.1:1337')
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
    setInterval(this.increaseThat, 24)
  }
  increaseThat = () => {      
    if(this.state.size < 100){
        this.setState({size: this.state.size+this.state.growingAdded})
        this.setState({growingAdded: this.state.growingAdded+.003})
      }
      else {
        this.setState({size: 0, growingAdded: 0})
        this.randomize()
        this.checkCrash()
      }
    }
  randomize = () => {
    let tempArr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    this.chosen = Math.floor(Math.random() * 15)
    console.log(this.chosen);
    tempArr[this.chosen] = 1
    this.setState({blocks: tempArr})
  }
  checkCrash = () => {
    if(this.state.x < 1*((this.chosen%4)/4) && 
    this.state.x > 1*((this.chosen%4)/4)-1*(1/4) && 
    this.state.y < 1*((this.chosen%4)/4) && 
    this.state.y > 1*((this.chosen%4)/4)-1*(1/4)) {
      console.log('you good')
    }
    else {
      console.log('you crashed');
    }
  }
  render() {
    return (
      <div className="all">
          <p>{this.state.x},{this.state.y},{this.state.z}</p>
          <div className="fkinwall"
          style={{width: `${this.state.size}%`, height: `${this.state.size}%`}}>
            {
              this.state.blocks.map((e) => {
                return(
                  <div className='wall' 
                  style={{background: e === 0 ? 'none' : 'white'}}></div>
                )
              })
            }
          </div>
          <div className="fkinplane" 
          style={{transform: `translateX(-50%) translateY(-50%) rotateX(${-this.state.y * 90 + 75}deg)`,
          top: `${(this.state.y-.5)*(-100)}%`,
          left: `${(this.state.x-.5)*(-100)}%`,
          zIndex: 1}}>
              <div className="wings" style={{backgroundColor: 'lightgrey'}}>
              </div>
              <div className="body">
              </div>
              <div className="backwings"> 
              </div>
          </div>
          
          <div className="fkinplane shade" 
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
