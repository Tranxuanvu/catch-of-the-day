import React from 'react';
import Header from './Header';
import Investory from './Investory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

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

  loadSample() {
    this.setState({
      fishes: sampleFishes
    });
  }

  render () {
    return (
      <div className='catch-of-day'>
        <div className='menu'>
          <Header tagline='Fresh SeaFood Market'/>
          <ul className='list-of-fishes'>
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} details={this.state.fishes[key]} />)
            }
          </ul>
        </div>
        <Investory
          addFish={(fish) => { this.addFish(fish); }}
          loadSample={() => { this.loadSample(); }}
        />
      </div>
    );
  }
}

export default App;
