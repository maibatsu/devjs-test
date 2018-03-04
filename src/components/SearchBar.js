import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, AutoComplete } from 'antd';

const SearchBar = ({ params, onSelect }) => (
  <div className="search-bar">
    <AutoComplete
      className="certain-category-search"
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: 300 }}
      size="large"
      style={{ width: '100%' }}
      dataSource={params}
      value=""
      onSelect={onSelect}
      // placeholder="умный поиск (нет)"
      filterOption={(inputValue, option) =>
        option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      optionLabelProp="value"
    >
      <Input suffix={<Icon type="search" className="certain-category-icon" />} />
    </AutoComplete>
  </div>
);

SearchBar.propTypes = {
  params: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SearchBar;
