<script>
    export let magnitude
    export let score

    const getEmotionText = magnitude => {
        if (magnitude * 10 > 4) {
            return ' clearly '
        }
        return ''
    }

    const getSentimentText = score => {
        if (score < -4) {
            return 'very negative'
        }
        if (score < 0) {
            return 'negative'
        }
        if (score > 4) {
            return 'very positive'
        }
        if (score > 0) {
            return 'positive'
        }
        return 'neutral'
    }

    $: sentimentText = getSentimentText(score)
    $: emotionText = getEmotionText(magnitude)
</script>

<style>
    .results {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .result-container {
        text-align: center;
    }

    .result-heading {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .result {
        width: 100px;
        height: 100px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 32px;
    }

    .result-container:first-child {
        margin-right: 32px;
    }

    .sentiment-text-container {
        font-size: 18px;
        text-align: center;
    }

    .sentiment-text {
        margin-top: 20px;
        text-transform: capitalize;
        font-size: 32px;
    }
</style>

<div class="results">
    <div class="result-container">
        <h3 class="result-heading">Magnitude</h3>
        <div class="result">{Math.floor(magnitude * 10)}</div>
    </div>
    <div class="result-container">
        <h3 class="result-heading">Score</h3>
        <div class="result">{Math.floor(score * 10)}</div>
    </div>
</div>
<div class="sentiment-text-container">
    <p class="sentiment-text">The sentiment is {emotionText}{sentimentText}.</p>
</div>
