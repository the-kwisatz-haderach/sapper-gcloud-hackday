import { createProxyMiddleware } from 'http-proxy-middleware'
import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
import { proxy } from '../package.json'

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

const server = polka()

server.use(
    '/api',
    createProxyMiddleware({
        target: proxy,
        changeOrigin: true,
    })
)

server
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware()
    )
    .listen(PORT, (err) => {
        if (err) console.log('error', err)
    })
