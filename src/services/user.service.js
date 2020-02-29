import { fetchData } from '../helpers';

const config = {
  apiUrl: 'http://localhost:4000'
};

export const userService = {
  login,
  logout,
  createUser,
  getList,
  updateUser,
  deleteUser
};

/**
 *
 * @param data
 */
function createUser(data) {
  return fetchData('/v1/user', 'post', data);
}

/**
 *
 * @param params
 */
function getList(params) {
  return fetchData('/v1/user', 'get', null, params);
}

/**
 *
 * @param id
 * @param data
 */
function updateUser(id, data) {
  return fetchData(`/v1/user/${id}`, 'put', data);
}

/**
 *
 * @param id
 */
function deleteUser(id) {
  return fetchData(`/v1/user/${id}`, 'delete');
}

/**
 *
 * @param username
 * @param password
 * @returns {Promise<Response>}
 */
function login(username, password) {
  // const requestOptions = {
  //   method: 'POST',
  //   url: `${config.apiUrl}/users/authenticate`,
  //   headers: { 'Content-Type': 'application/json' },
  //   data: JSON.stringify({ username, password })
  // };
  //
  // return axios(requestOptions)
  //   .then((res) => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     localStorage.setItem('user', JSON.stringify(res.data));
  //     return res.data
  //   })
  //   .catch((error) => {
  //     console.log(error.response)
  //   })
  //   .finally(() => {
  //     // always executed
  //   });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
