import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' ? '' : '/api'
const service = axios.create({
    baseURL: baseURL,
    timeout: 6000
})


//请求拦截
service.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.resolve([true, error]);
});


//响应拦截
service.interceptors.response.use(response => {
    return [null, response.data];
}, error => {
    return Promise.resolve([true, error.response.data]);
});


export default service;