const polka = require('polka')
const resSend = require('./middleware/resSend')

const app = polka()

app.use(resSend)

app.get('/', (req, res) => {
    res.send({ hello: 'hello world' })
})

module.exports = app
