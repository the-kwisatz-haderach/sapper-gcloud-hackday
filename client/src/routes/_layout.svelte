<script>
    import Nav from '../components/Nav.svelte'
    export let segment
</script>

<style>
    main {
        position: relative;
        background-color: white;
        margin: 0 auto;
        box-sizing: border-box;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
        transition: background-color 0.1s ease-in;
    }

    main.from-text {
        background-color: #b0e0e6;
    }

    main.from-speech {
        background-color: #b4dcb4;
    }

    .button.from-text {
        background-color: #2395a5;
        color: white;
    }

    .button.from-text:hover {
        background-color: #157581;
    }

    .button.from-speech {
        background-color: #23a55d;
        color: white;
    }

    .button.from-speech:hover {
        background-color: #147c43;
    }

    .home-link-container {
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 100px;
    }

    .main-content-container {
        width: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>

<main class={segment}>
    <div class="main-content-container">
        <slot />
    </div>
    {#if segment !== undefined}
        <div class="home-link-container">
            <a class={`button ${segment}`} href="/">Go home</a>
        </div>
    {/if}
</main>
