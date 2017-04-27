import React from 'react';
import Header from './Header';

class App extends React.Component {
  render () {
    return (
      <div className='catch-of-day'>
        <div className='menu'>
          <Header tagline='Fresh SeaFood Market'/>
        </div>
      </div>
    );
  }
}

export default App;
