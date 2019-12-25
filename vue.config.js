
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir)


module.exports = {
    assetsDir: 'static',
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias         //配置别名
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@views', resolve('src/views'))

        config.plugins.delete('preload');          //删除预加载
        config.plugins.delete("prefetch");         //移除 preload 插件
        config.optimization.minimize(true);        //压缩代码
        config.optimization.splitChunks({          //分割代码
            chunks: 'all'
        })
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production' && false) {
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
        }
    },
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true,
            }
        },
        requireModuleExtension: true
    },
    lintOnSave: false,
    devServer: {
        port: 5900,
        open: true,
        proxy: {
            '/api': {
                target: 'http://m.lisfes.cn',
                ws: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}