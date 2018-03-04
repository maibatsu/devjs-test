import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

const Teaser = ({ name, price, view }) => {
  const { Meta } = Card;

  return (
    <Card hoverable cover={<img alt={name} src={view[0]} />} style={{ width: 300, margin: 16 }}>
      <div className="card-price">{`${price} ₽`}</div>
      <Meta title={name} style={{ textAlign: 'center' }} />
    </Card>
  );
};

Teaser.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  view: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Teaser;
