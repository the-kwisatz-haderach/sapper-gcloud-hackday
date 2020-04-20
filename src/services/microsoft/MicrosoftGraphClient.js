const querystring = require('querystring')
const axios = require('axios')

module.exports = class MicrosoftGraphClient {
    requestStates = {}
    authBasePath = 'https://login.microsoftonline.com/'
    graphApiBasePath = 'https://graph.microsoft.com/v1.0/'
    accessToken = ''
    tokenType = ''
    refreshToken = ''
    tokenHasExpired = true
    grantedScopes = ''

    constructor({ tenantId, clientId, redirectUri, scopes, clientSecret }) {
        this.tenantId = tenantId
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.redirectUri = encodeURI(redirectUri)
        this.scopes = 'https://graph.microsoft.com/.default'
        /* this.scopes = scopes.reduce(this.scopeReducer, '') */
    }

    generateState(length = 10) {
        let string = ''
        for (let i = 0; i <= length; i++) {
            string += String.fromCharCode(97 + Math.ceil(Math.random() * 25))
        }

        this.requestStates[string] = true

        return string
    }

    scopeReducer(scopeString, scope, i) {
        if (i > 0) {
            scopeString += '%20'
        }
        scopeString += scope
        return scopeString
    }

    authenticate(_, res) {
        const query = querystring.stringify({
            redirect_uri: this.redirectUri,
            state: this.generateState(),
            client_id: this.clientId,
            response_type: 'code',
            response_mode: 'query',
            scope: this.scopes,
        })

        res.redirect(
            this.authBasePath +
                this.tenantId +
                '/oauth2/v2.0/authorize?' +
                query
        )
    }

    requestToken(req, res) {
        const { code, state } = req.query

        /* if (!this.requestStates[state]) {
            res.send('Unauthorized.')
        }
        delete this.requestStates[state] */

        const data = querystring.stringify({
            /* code: code, */
            /* state: state, */
            /* redirect_uri: this.redirectUri, */
            client_id: this.clientId,
            client_secret: this.clientSecret,
            /* grant_type: 'authorization_code', */
            grant_type: 'client_credentials',
            scope: this.scopes,
            /* response_mode: 'query', */
        })

        axios({
            data,
            url: this.authBasePath + this.tenantId + '/oauth2/v2.0/token',
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
            .then((response) => {
                const { data } = response
                console.log(data)
                setTimeout(() => {
                    this.tokenHasExpired = true
                }, data.expires_in)
                this.tokenHasExpired = false
                this.grantedScopes = data.scope
                this.tokenType = data.token_type
                this.accessToken = data.access_token
                res.redirect('/')
            })
            .catch(({ response }) => {
                res.send(response.data.error_description)
            })
    }

    getResource(resource) {
        return axios
            .get(this.graphApiBasePath + resource, {
                headers: {
                    Authorization: 'Bearer ' + this.accessToken,
                },
            })
            .then((response) => {
                return response.data
            })
            .catch(({ response }) => {
                throw response.data.error
            })
    }
}
