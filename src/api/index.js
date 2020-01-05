import http from '../utils/request';


//登陆
export const login = params => {
    return http({
        url: `/login/cellphone`,
        method: 'POST',
        data: params
    })
}


//登出
export const logout = params => {
    return http({
        url: `/logout`,
        method: 'GET',
        params
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


//每日推荐歌单（需登陆）
export const recommend = params => {
    return http({
        url: `/recommend/resource`,
        method: 'GET',
        params
    })
}


//每日推荐歌曲（需登录）
export const recommendSongs = params => {
    return http({
        url: `/recommend/songs`,
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


//歌手
export const playsinger = params => {
    return http({
        url: `/toplist/artist`,
        method: 'GET',
        params
    })
}


//歌手详情
export const playsingerdetail = params => {
    return http({
        url: `/artists`,
        method: 'GET',
        params
    })
}


//用户歌单
export const Userplaylist = params => {
    return http({
        url: `/user/playlist`,
        method: 'POST',
        data: params
    })
}


//查询音乐是否可用
export const musicCheck = params => {
    return http({
        url: `/check/music`,
        method: 'GET',
        params
    })
}


//获取音乐 url
export const musicUrl = params => {
    return http({
        url: `/song/url`,
        method: 'GET',
        params
    })
}


//排行榜
export const RanKinglist = params => {
    return http({
        url: `/toplist/detail`,
        method: 'GET',
        params
    })
}


//歌单广场 其他歌单
export const SquarePalylist = params => {
    return http({
        url: `/top/playlist`,
        method: 'GET',
        params
    })
}


//歌单广场 精品歌单
export const BoutiqueSquarePalylist = params => {
    return http({
        url: `/top/playlist/highquality`,
        method: 'GET',
        params
    })
}


//热搜榜
export const searchHot = params => {
    return http({
        url: `/search/hot/detail`,
        method: 'GET',
        params
    })
}


//搜索建议
export const searchSuggest = params => {
    return http({
        url: `/search/suggest`,
        method: 'GET',
        params
    })
}


//分类搜索
export const search = params => {
    return http({
        url: `/search`,
        method: 'GET',
        params
    })
}


//搜索数据详情
export const searchDetail = params => {
    return http({
        url: `/song/detail`,
        method: 'GET',
        params
    })
}


//专辑详情
export const albumDetail = params => {
    return http({
        url: `/album`,
        method: 'GET',
        params
    })
}