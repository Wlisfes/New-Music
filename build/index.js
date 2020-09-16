const { run } = require('runjs')
const Koa = require('koa')
const koaStatic = require('koa-static')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const path = require('path')
const proxy = require('koa-server-http-proxy')

const app = new Koa()
app.use(
	// proxy('/api', {
	// 	target: `http://m.lisfes.cn`,
	// 	pathRewrite: { '^/api': '' },
	// 	changeOrigin: true
	// })/dev-center
	proxy('/dev-center', {
		target: `http://10.0.17.156:8080`,
		// pathRewrite: { '^/api': '' },
		changeOrigin: true
	})
)
// run(`vue-cli-service build`)

app.use(
	historyApiFallback({
		whiteList: ['/api']
	})
)
app.use(koaStatic(path.join(__dirname, '../dist')))

const port = process.env.PORT || 3633
app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
