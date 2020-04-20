<style>
    .button-container {
        display: flex;
        justify-content: center;
    }
    .button-container a:first-child {
        margin-right: 10px;
    }
</style>

<svelte:head>
    <title>Sapper project template</title>
</svelte:head>

<div class="button-container">
    <a class="button primary" href="/from-text">Analyze text</a>
    <a class="button secondary" href="/from-speech">Analyze speech</a>
</div>
