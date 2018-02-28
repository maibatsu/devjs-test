import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Input, AutoComplete } from 'antd';

const { Option } = AutoComplete;

/* const options = dataSource.map(group => (
  <Option key={opt.title} value={opt.title}>
    {opt.title}
    <span className="certain-search-item-count">{opt.count} 人 关注</span>
  </Option>
)); */

const SearchBar = ({ params }) => (
  <div className="certain-category-search-wrapper">
    <AutoComplete
      disabled
      className="certain-category-search"
      dropdownClassName="certain-category-search-dropdown"
      dropdownMatchSelectWidth={false}
      dropdownStyle={{ width: 300 }}
      size="large"
      style={{ width: '100%' }}
      dataSource={params}
      placeholder="input here"
      optionLabelProp="value"
    >
      <Input suffix={<Icon type="search" className="certain-category-icon" />} />
    </AutoComplete>
  </div>
);

SearchBar.propTypes = {
  params: PropTypes.arrayOf(PropTypes.string),
};

export default SearchBar;
