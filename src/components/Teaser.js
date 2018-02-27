import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";

const Teaser = ({ name, price, view }) => {
  const { Meta } = Card;

  return (
    <Card
      hoverable
      cover={<img alt={name} src={view[0]} />}
      style={{ width: 300, margin: 16 }}
    >
      <div className="card-price">{`${price} ₽`}</div>
      <Meta title={name} />
    </Card>
  );
};

Teaser.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    view: PropTypes.arrayOf(PropTypes.string).isRequired,
    params: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.number.isRequired
  })
};

export default Teaser;
