const polka = require('polka')
const bodyParser = require('body-parser')
const resSend = require('./middleware/resSend')
const resRedirect = require('./middleware/resRedirect')
const serviceRouter = require('./services')

const app = polka()

// Middleware
app.use(bodyParser.json(), resSend, resRedirect, (_, res, next) => {
    res.setHeader('Cache-Control', 'no-store')
    next()
})

// Routes
app.use('/api', serviceRouter)

module.exports = app
