import React, { Component } from 'react';
import update from 'immutability-helper';
import { Row, Col, Layout, Tag } from 'antd';
import logo from './logo.png';
import './App.css';
import Teaser from './components/Teaser';
import FilterPrice from './components/FilterPrice';
import SearchBar from './components/SearchBar';

class App extends Component {
  constructor(props) {
    super();
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
      studioParams: [],
      searchBar: {
        selected: [],
      },
    };
  };

  componentDidMount = () => {
    fetch(`/api/getStudios`)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ studios: { list: [...data], loaded: true } });
      })
      .catch(error => console.error(error));

    fetch(`/api/getPrices`)
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

    fetch(`/api/getParams`)
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ studioParams: data });
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

  handleFilterPrice = () => {
    this.handleCheckFilter();
  };

  handleSearchSelect = val => {
    const { searchBar: { selected } } = this.state;

    if (selected.includes(val)) return;

    const copy = [...selected, val];

    this.handleCheckFilter(copy);

    this.setState(prevState => ({
      searchBar: {
        selected: [...prevState.searchBar.selected, val],
      },
    }));
  };

  handleSearchSelectRemove = val => () => {
    const { searchBar: { selected } } = this.state;

    if (!selected.includes(val)) return;

    const itemIdx = selected.indexOf(val);
    const copy = [...selected];
    copy.splice(itemIdx, 1);

    this.handleCheckFilter(copy);

    this.setState(prevState => ({
      searchBar: { selected: update(prevState.searchBar.selected, { $splice: [[itemIdx, 1]] }) },
    }));
  };

  handleCheckFilter = (selected = this.state.searchBar.selected) => {
    const { prices: { maxPrice, minPrice } } = this.state;
    const postData = {
      maxPrice,
      minPrice,
      selected,
    };

    fetch(`/api/getFilteredData`, {
      method: 'POST',
      headers: {
        Accept: 'application/json;charset=utf-8',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then(response => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ studios: { list: data } });
      })
      .catch(error => console.error(error));
  };

  getSearchBar = () => {
    const { studioParams } = this.state;

    return <SearchBar params={studioParams} onSelect={this.handleSearchSelect} />;
  };

  getSearchKeys = () => {
    const { searchBar: { selected } } = this.state;

    return (
      <div className="search-keys">
        {selected.map(item => (
          <Tag
            key={item}
            closable
            onClose={this.handleSearchSelectRemove(item)}
            style={{ fontSize: '1rem' }}
            color="#2f65eb"
          >
            {item}
          </Tag>
        ))}
      </div>
    );
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

  getTeaser = () => {
    const { studios: { list } } = this.state;
    const teasers = list.map(item => <Teaser key={item.id} name={item.name} price={item.price} view={item.view} />);

    if (!list.length) return <h2>Студий по данному запросу не найдено.</h2>;

    return <div className="teasers-list">{teasers}</div>;
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
                  {this.getSearchKeys()}
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
