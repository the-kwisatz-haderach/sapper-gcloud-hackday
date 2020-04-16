const send = require('@polka/send-type')

function resSend(_, res, next) {
    res.send = (
        data,
        options = {
            statusCode: 200,
            headers: {},
        }
    ) => send(res, options.statusCode, data, options.headers)
    next()
}

module.exports = resSend
