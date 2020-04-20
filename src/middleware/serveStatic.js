const { join } = require('path')

const dir = join(process.cwd(), 'public')
const serve = require('serve-static')(dir, {
    cacheControl: false,
    etag: false,
})

module.exports = serve
