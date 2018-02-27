import React, { Component } from 'react';
import { Row, Col } from 'antd';
import logo from './logo.svg';
import './App.css';
import Teaser from './components/Teaser';
import FilterPrice from './components/FilterPrice';
import SearchBar from './components/SearchBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studios: {
        list: [],
        loaded: false,
      },
      prices: {
        initValue: {
          min: null,
          max: null,
        },
        minPrice: null,
        maxPrice: null,
        loaded: false,
      },
    };
  }
  componentDidMount = () => {
    const fetchStudios = fetch(`/api/getStudios`)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ studios: { list: [...data], loaded: true } });
      })
      .catch(error => console.error(error));

    const fetchPrices = fetch(`/api/getPrices`)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({
          prices: {
            minPrice: data[0],
            maxPrice: data[1],
            loaded: true,
            initValue: { min: data[0], max: data[1] },
          },
        });
      })
      .catch(error => console.error(error));
  };

  handleFilterPriceTitle = value => {
    const [min, max] = [...value];

    this.setState(prevState => ({
      prices: {
        ...prevState.prices,
        minPrice: min,
        maxPrice: max,
      },
    }));
  };

  handleFilterPrice = value => {
    const [min, max] = [...value];
    const fetchStudios = fetch(`/api/getStudios?minPrice=${min}&maxPrice=${max}`)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ studios: { list: data, loaded: true } });
      })
      .catch(error => console.error(error));
  };

  getTeaser = () => {
    const { studios: { list } } = this.state;
    const teasers = list.map(item => <Teaser key={item.id} {...item} />);

    return <div className="teasers-list">{teasers}</div>;
  };

  getSearchBar = () => {
    return <SearchBar />;
  };

  getFilterPrice = () => {
    const { prices: { minPrice, maxPrice, loaded, initValue } } = this.state;

    if (!loaded) return null;

    return (
      <FilterPrice
        initValue={initValue}
        minPrice={minPrice}
        maxPrice={maxPrice}
        loaded={loaded}
        onChange={this.handleFilterPriceTitle}
        onAfterChange={this.handleFilterPrice}
      />
    );
  };

  render() {
    const { studios, prices } = this.state;

    if (!studios.loaded && !prices.loaded) return null;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <Row type="flex" justify="space-around">
            <Col span={18}>{this.getTeaser()}</Col>
            <Col span={6}>
              <div className="filters-list">
                <div className="filters-list__item">{this.getSearchBar()}</div>
                <div className="filters-list__item">{this.getFilterPrice()}</div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
