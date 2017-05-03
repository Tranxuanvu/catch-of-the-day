import React from 'react';
import Header from './Header';
import Investory from './Investory';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {}
    }
  }

  addFish(fish) {
    const fishes = { ...this.state.fishes };
    const timestamp = Date.now();

    fishes[`fish-${timestamp}`] = fish;

    this.setState({fishes});
  }

  render () {
    return (
      <div className='catch-of-day'>
        <div className='menu'>
          <Header tagline='Fresh SeaFood Market'/>
        </div>
        <Investory addFish={(fish) => { this.addFish(fish); }}/>
      </div>
    );
  }
}

export default App;
