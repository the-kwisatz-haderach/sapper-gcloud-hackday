<script>
    import SentimentResults from '../../components/SentimentResults.svelte'

    let textContent = ''
    let sentiment
    let loading = false
    let errorMessage = ''

    async function analyze() {
        loading = true
        await fetch('/api/google/analyze', {
            method: 'POST',
            body: JSON.stringify({
                type: 'text',
                content: textContent,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(({ error, result }) => {
                if (error) {
                    throw error
                }
                errorMessage = null
                sentiment = result
            })
            .catch(error => {
                errorMessage = error
            })
            .finally(() => {
                loading = false
            })
    }

    async function translate() {
        loading = true
        await fetch('/api/google/translate', {
            method: 'POST',
            body: JSON.stringify({
                content: textContent,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(({ error, result }) => {
                if (error) {
                    throw error
                }
                errorMessage = null
                textContent = result
            })
            .catch(error => {
                errorMessage = error
            })
            .finally(() => {
                loading = false
            })
    }
</script>

<style>
    h1 {
        font-size: 42px;
        line-height: 2;
        text-transform: capitalize;
    }

    textarea {
        font-size: 20px;
        resize: none;
        width: 50%;
        margin-top: 30px;
        margin-bottom: 30px;
        border-radius: 5px;
        border: none;
    }

    .results {
        margin-top: 20px;
    }

    .error {
        color: rgb(207, 38, 38);
        padding: 20px;
        border: 1px solid rgb(143, 0, 0);
    }

    .button-container button:first-child {
        margin-right: 20px;
    }
</style>

<h1>Analyze text content</h1>
<textarea cols={150} rows={10} bind:value={textContent} />
<div class="button-container">
    <button class="button primary" on:click={analyze}>Analyze</button>
    <button class="button" on:click={translate}>Translate</button>
</div>
<div class="results">
    {#if loading}loading...{/if}
    {#if sentiment}
        <SentimentResults
            magnitude={sentiment.magnitude}
            score={sentiment.score} />
    {/if}
    {#if errorMessage}
        <p class="error">{errorMessage}</p>
    {/if}
</div>
