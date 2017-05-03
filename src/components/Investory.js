import React from 'react';
import AddFishForm from './AddFishForm';

class Investory extends React.Component {
  render() {
    debugger;
    return (
      <div>
        <h2>Investory</h2>
        <AddFishForm addFish={this.props.addFish}/>
      </div>
    );
  }
}

export default Investory;
