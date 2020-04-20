require('dotenv').config()
const app = require('./src/app')

const port = process.env.PORT || 8000

app.listen(port, (err) => {
    if (err) {
        throw err
    }
    console.log(`server listening on port ${port}...`)
})
