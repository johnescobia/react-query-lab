import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create an axios instance with a base configuration
const HTTP_CLIENT = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
HTTP_CLIENT.interceptors.request.use(function (config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> {
  // Do something before request is sent
  return config;
}, function (error: AxiosError): Promise<AxiosError> {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
HTTP_CLIENT.interceptors.response.use(function (response: AxiosResponse): AxiosResponse {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error: AxiosError): Promise<AxiosError> {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default HTTP_CLIENT;
