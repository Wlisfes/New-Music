
/**
 * http资源替换成https
 * @param { String } value 
 */
export const replaceHttps = value => {
    return value.replace(/^http:\/\//i, 'https://')
}




