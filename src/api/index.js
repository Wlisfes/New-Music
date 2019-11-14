import http from '../utils/request';


//登陆
export const login = params => {
    return http({
        url: `/login/cellphone`,
        method: 'POST',
        data: params
    })
}


//轮播图
export const banner = params => {
    return http({
        url: `/banner`,
        method: 'POST',
        data: params
    })
}




