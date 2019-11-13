import http from '../utils/request';


export const login = params => {
    return http({
        url: `/login/cellphone`,
        method: 'POST',
        data: params
    })
}