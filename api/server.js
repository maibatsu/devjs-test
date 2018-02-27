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
const filteredStudios = (list, min, max) =>
  list.filter(item => item.price <= max && item.price >= min);

API.get('/api/getStudios', (req, res) => {
  const { query: { minPrice, maxPrice } } = req;
  const params = {
    'Content-Type': 'application/json; charset=utf-8',
  };

  res.set(params);

  if (minPrice && maxPrice) {
    const filtered = filteredStudios(sortedStudios, minPrice, maxPrice);

    return res.send(filtered);
  }

  res.send(sortedStudios);
});

API.get('/api/getPrices', (req, res) => {
  const params = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  const pricesParams = [minPrice, maxPrice];

  res.set(params);
  res.send(pricesParams);
});

API.listen(4000, () => console.log('API on port: 4000'));
