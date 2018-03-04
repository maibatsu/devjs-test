const express = require('express');

const API = express();

const studios = [
  {
    id: 12,
    name: 'Фламинго',
    price: 1200,
    view: ['https://128121.selcdn.ru/react/1.jpg'],
    params: ['птица', 'окно'],
  },
  {
    id: 13,
    name: 'Семейная',
    price: 1800,
    view: ['https://128121.selcdn.ru/react/2.jpg'],
    params: ['камин', 'качель', 'окно'],
  },
  {
    id: 15,
    name: 'Ночная',
    price: 2000,
    view: ['https://128121.selcdn.ru/react/3.jpg'],
    params: ['зеркало', 'стул', 'портрет'],
  },
  {
    id: 122,
    name: 'Калибри',
    price: 1300,
    view: ['https://128121.selcdn.ru/react/4.jpg'],
    params: ['картина', 'слон', 'стекло'],
  },
  {
    id: 123,
    name: 'Стильная',
    price: 1500,
    view: ['https://128121.selcdn.ru/react/5.jpg'],
    params: ['занавес', 'тумба'],
  },
  {
    id: 100,
    name: 'Лофт',
    price: 2200,
    view: ['https://128121.selcdn.ru/react/6.jpg'],
    params: [],
  },
  {
    id: 178,
    name: 'Таганка',
    price: 1100,
    view: ['https://128121.selcdn.ru/react/7.jpg'],
    params: ['картина', 'обои', 'окно'],
  },
  {
    id: 1221,
    name: 'Лондон',
    price: 1250,
    view: ['https://128121.selcdn.ru/react/8.jpg'],
    params: ['камин', 'картина', 'окно'],
  },
  {
    id: 1891,
    name: 'Уют',
    price: 1450,
    view: ['https://128121.selcdn.ru/react/9.jpg'],
    params: ['камин', 'обои', 'картина'],
  },
];
const sortedStudios = studios.sort((itemA, itemB) => itemA.price - itemB.price);

const prices = studios.map(item => item.price);
const minPrice = Math.min.apply(null, prices);
const maxPrice = Math.max.apply(null, prices);

const params = studios.map(item => item.params);
const paramsConcat = [].concat(...params);
const studioParams = Array.from(new Set(paramsConcat));

const sortedByKeys = (studiosList, options) =>
  studiosList.filter(item =>
    item.params.some((par) => {
      if (options.includes(par)) return true;
      return false;
    }));
const sortedByPrice = (min, max, arr) => arr.filter(item => item.price >= min && item.price <= max);

API.use(express.json());

API.get('/api/getStudios', (req, res) => {
  const resParams = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  res.set(resParams);
  res.send(sortedStudios);
});

API.get('/api/getPrices', (req, res) => {
  const resParams = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  const pricesParams = [minPrice, maxPrice];

  res.set(resParams);
  res.send(pricesParams);
});

API.get('/api/getParams', (req, res) => {
  const resParams = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  res.set(resParams);
  res.send(studioParams);
});

API.post('/api/getFilteredData', (req, res) => {
  const resParams = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  res.set(resParams);

  if (!req.body.selected.length) {
    return res.send(sortedByPrice(req.body.minPrice, req.body.maxPrice, sortedStudios));
  }

  const byKeys = sortedByKeys(sortedStudios, req.body.selected);
  const result = sortedByPrice(req.body.minPrice, req.body.maxPrice, byKeys);

  res.send(result);
});

API.listen(4000, () => console.log('API on port: 4000'));
