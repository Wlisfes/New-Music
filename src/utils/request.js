import axios from 'axios';

const service = axios.create({
    baseURL: `/api`,
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