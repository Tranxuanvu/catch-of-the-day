import React from 'react';
import Header from './Header';
import Investory from './Investory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import Order from './Order';
import base from '../base';
import { Grid, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount() {
    this.ref = base.syncState(
      `${this.props.params.storeId}/fishes`,
      {
        context: this,
        state: 'fishes'
      }
    );

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef)
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  };

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
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

  addToOrder(key) {
    const order = { ...this.state.order };

    order[key] = order[key] + 1 || 1;
    this.setState({order});
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;

    this.setState({ fishes });
  }

  removeFish(key) {
    const fishes = {...this.state.fishes};
    fishes[key] = null;

    this.setState({fishes});
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];

    this.setState({order});
  }

  render () {
    return (
      <div className='catch-of-day'>
        <Header />
        <Grid>
          <Row className="show-grid">
            <Col md={6}>
              <div className='menu'>
                {/*<Header tagline='Fresh SeaFood Market'/>*/}
                <h2 className='tagline'>Fresh SeaFood Market</h2>
                <ul className='list-of-fishes'>
                  {
                    Object
                      .keys(this.state.fishes)
                      .map(key => <Fish key={key}
                                        details={this.state.fishes[key]}
                                        index={key}
                                        addToOrder={(key) => { this.addToOrder(key); }}
                                  />
                          )
                  }
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <Order
                fishes={this.state.fishes}
                order={this.state.order}
                params={this.props.params}
                removeFromOrder={(key) => this.removeFromOrder(key)}
              />
            </Col>
          </Row>
        </Grid>
        <Col md={6} xsOffset={3}>
          <Investory
            addFish={(fish) => { this.addFish(fish); }}
            loadSample={() => { this.loadSample(); }}
            fishes={this.state.fishes}
            updateFish={(key, fish) => { this.updateFish(key, fish); }}
            removeFish={(key, fish) => { this.removeFish(key, fish); }}
          />
        </Col>
      </div>
    );
  }
}

export default App;
