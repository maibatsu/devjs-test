import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Card } from 'antd';

const FilterPrice = ({
  minPrice,
  maxPrice,
  loaded,
  initValue: { min, max },
  onChange,
  onAfterChange,
}) => {
  if (!loaded) return null;

  return (
    <Card className="filter-range">
      <div className="filter-range__title">
        <span>Стоимость</span>
        <span>{`${minPrice} – ${maxPrice}`}</span>
      </div>
      <Slider
        range
        defaultValue={[minPrice, maxPrice]}
        min={min}
        max={max}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </Card>
  );
};

FilterPrice.propTypes = {
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  initValue: PropTypes.objectOf(PropTypes.number).isRequired,
  loaded: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func.isRequired,
};

export default FilterPrice;
