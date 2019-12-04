

//播放次数转换
export const playCount = value => {
    if(value > 99999999) {
        return (value / 100000000).toFixed(1) + '亿'
    }
    else if(value > 99999) {
        return (value / 10000).toFixed(1) + '万'
    }
    return value
}


//http资源重新成https
export const https = http => http.replace(/^http/, "https")



