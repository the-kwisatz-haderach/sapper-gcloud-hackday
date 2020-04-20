const polka = require('polka')
const sentimentAnalysis = require('./analyzeText')
const translateText = require('./translateText')

const router = polka()

router.post('/translate', async (req, res) => {
    try {
        const { content } = req.body

        if (!content) {
            return res.send('Please provide content.')
        }

        const result = await translateText(content)
        return res.send({ result: result[0].translatedText })
    } catch (error) {
        if (error.details) {
            return res.send({ error: error.details })
        }
        res.send({ error })
    }
})

router.post('/analyze', async (req, res) => {
    try {
        const { type, content } = req.body

        if (!content) {
            return res.send('Please provide content.')
        }

        if (type === 'text') {
            const result = await sentimentAnalysis(content, 'PLAIN_TEXT')
            return res.send({ result })
        }

        if (type === 'speech') {
            return res.send('WIP')
        }

        res.send(`invalid type${' ' + type || ''}.`)
    } catch (error) {
        if (error.details) {
            return res.send({ error: error.details })
        }
        res.send({ error })
    }
})

module.exports = router
