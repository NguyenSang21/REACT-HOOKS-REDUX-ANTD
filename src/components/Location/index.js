import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { Location } from '../../utils';

const { Option } = Select;

const LocationInput = props => {
  const data = [];
  // call loading only once
  useEffect(() => {
    console.log("Loading Effect")
    props.sourceName && Location[props.sourceName].map((item, idx) => {
      data.push(
        <Option key={idx.toString(36) + idx} value={item.id + ''}>
          {item.name}
        </Option>
      );
    });
  }, [])

  const handleChange = value => {
    console.log(`selected ${value}`);
  };

  return (
    <Select
      showSearch={true}
      style={{ width: '100%' }}
      placeholder={props.placeholder}
      onChange={e => handleChange(e)}
    >
      {data}
    </Select>
  );
};

LocationInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  sourceName: PropTypes.oneOf(['Provinces', 'Districts', 'Wards']),
};

export default LocationInput;
