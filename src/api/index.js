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
        method: 'GET',
        params
    })
}


//推荐歌单
export const personalized = params => {
    return http({
        url: `/personalized`,
        method: 'GET',
        params
    })
}


//每日推荐（需登陆）
export const recommend = params => {
    return http({
        url: `/recommend/resource`,
        method: 'GET',
        params
    })
}


//歌单详情
export const playlistdetail = params => {
    return http({
        url: `/playlist/detail`,
        method: 'GET',
        params
    })
}

