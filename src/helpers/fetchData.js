import axios from 'axios';
import { message } from 'antd';

const config = {
  apiUrl: 'http://localhost:33000'
};

const ACCESS_HEADERS = {
  'Content-Type': 'application/json'
};

export const fetchData = (path, method, data, params) => {
  const requestOptions = {
    method: method,
    url: `${config.apiUrl}${path}${matchParams(params || {})}`,
    headers: ACCESS_HEADERS,
    data
  };

  return axios(requestOptions)
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Error');
      } else {
        return {
          success: true,
          data: res.data || []
        };
      }
    })
    .catch(error => {
      console.log(error.response);
      // show error to user interface
      message.error(
        (error.response &&
          error.response.data &&
          // eslint-disable-next-line no-mixed-operators
          error.response.data.message) ||
          'Resource Not Found!'
      );
      return {
        success: false
      };
    })
    .finally(() => {
      // always executed
    });
};

const matchParams = params => {
  return `${Object.keys(params).length ? '?' : ''}${Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;
};
