import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://api.regis.id.vn/v1/',
});
instance.defaults.timeout = 5000;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Handle timeout errors explicitly
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      return Promise.reject({ message: 'Request timed out. Please try again.' });
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response ? error.response.data : Promise.reject(error);
  },
);

export default instance;
