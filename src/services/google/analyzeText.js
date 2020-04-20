const language = require('@google-cloud/language')

const client = new language.LanguageServiceClient()

async function sentimentAnalysis(textContent = '', contentType = 'PLAIN_TEXT') {
    const [result] = await client.analyzeSentiment({
        document: {
            content: textContent,
            type: contentType,
        },
    })

    return result.documentSentiment
}

module.exports = sentimentAnalysis
