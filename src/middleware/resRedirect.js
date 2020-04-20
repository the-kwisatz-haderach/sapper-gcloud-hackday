const redirect = require('@polka/redirect')

function resRedirect(req, res, next) {
    res.redirect = (location, statusCode = 301) =>
        redirect(res, statusCode, location)
    next()
}

module.exports = resRedirect
