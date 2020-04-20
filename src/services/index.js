const polka = require('polka')
const googleService = require('./google')
const microsoftService = require('./microsoft')

serviceRouter = polka()

serviceRouter.use('/google', googleService)
serviceRouter.use('/microsoft', microsoftService)

module.exports = serviceRouter
