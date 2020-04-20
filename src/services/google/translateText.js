const { TranslationServiceClient } = require('@google-cloud/translate')

const translationClient = new TranslationServiceClient()

const location = 'global'

async function translateText(text = '') {
    const request = {
        parent: `projects/${process.env.GOOGLE_PROJECT_ID}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain',
        sourceLanguageCode: 'sv',
        targetLanguageCode: 'en',
    }

    try {
        const [response] = await translationClient.translateText(request)
        return response.translations
    } catch (error) {
        throw error
    }
}

module.exports = translateText
