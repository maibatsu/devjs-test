import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';
import logo from './logo.png';
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
    const { studios: { list } } = this.state;
    const arr = list.map(item => item.params);
    const result = [].concat(...arr);
    const data = Array.from(new Set(result));

    return <SearchBar params={data} />;
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
    const { Header, Content } = Layout;
    const { studios, prices } = this.state;

    if (!studios.loaded && !prices.loaded) return null;

    return (
      <Layout className="App">
        <Header className="App-header" style={{ backgroundColor: 'transparent' }}>
          <img src={logo} className="App-logo" alt="logo" />
        </Header>
        <Content className="container">
          <Row type="flex" justify="space-around">
            <Col span={18}>{this.getTeaser()}</Col>
            <Col span={6}>
              <div className="filters-list">
                <div className="filters-list__item filters-list__item--search">
                  {this.getSearchBar()}
                </div>
                <div className="filters-list__item">{this.getFilterPrice()}</div>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
