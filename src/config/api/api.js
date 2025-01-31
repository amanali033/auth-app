import axios from 'axios';

export const createAPIEndPoint = (endpoint) => {
  const BASE_URL = process.env.REACT_APP_BASE;
  const X_API_Key = process.env.REACT_APP_X_API_Key;

  let token = typeof localStorage !== 'undefined' && localStorage.getItem('access_token');

  let url = `${BASE_URL}/${endpoint}`;
  return {
    fetchAll: () =>
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-API-Key': X_API_Key
        }
      }),
    create: (newRecord) =>
      axios.post(url, newRecord, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': X_API_Key
        }
      }),
    fetchById: (id) =>
      axios.get(url + id, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': X_API_Key
        }
      }),
    delete: (id) =>
      axios.delete(url + id, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': X_API_Key
        }
      }),
    fetchFiltered: (params) =>
      axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': X_API_Key
        },
        params // Include query parameters
      }),
    update: (id, updatedRecord) =>
      axios.put(url + id, updatedRecord, {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': X_API_Key
        }
      })
  };
};
