const polka = require('polka')
const MicrosoftGraphClient = require('./MicrosoftGraphClient')

serviceRouter = polka()

const microsoftGraphClient = new MicrosoftGraphClient({
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
    redirectUri: process.env.AZURE_REDIRECT_URI,
    clientSecret: process.env.AZURE_CLIENT_SECRET,
    scopes: ['offline_access', 'User.Read', 'Channel.ReadBasic.All'],
})

serviceRouter.get(
    '/auth',
    microsoftGraphClient.authenticate.bind(microsoftGraphClient)
)

serviceRouter.get(
    '/authenticate',
    microsoftGraphClient.requestToken.bind(microsoftGraphClient)
)

serviceRouter.get('/logout', (req, res) => {
    res.redirect('/')
})

serviceRouter.get('/:resource', async (req, res) => {
    const { params } = req
    try {
        const response = await microsoftGraphClient.getResource(params.resource)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

module.exports = serviceRouter
