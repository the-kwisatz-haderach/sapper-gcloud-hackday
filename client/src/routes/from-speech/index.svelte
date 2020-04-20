<script>
    import { onMount } from 'svelte'

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent =
        SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    var recognition = new SpeechRecognition()
    var speechRecognitionList = new SpeechGrammarList()

    recognition.grammars = speechRecognitionList
    recognition.continuous = true
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    speechRecognitionList.addFromString(grammar, 1)

    var colors = ['black', 'lights', 'out', 'that', "that's", 'it']
    var grammar =
        '#JSGF V1.0; grammar colors; public <color> = ' +
        colors.join(' | ') +
        ' ;'

    let recordingStarted = false
    let recordingResults = ''
    let mediaRecorder
    let audioChunks = []
    let darkMode = false

    onMount(() => {
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
            })
            .then(function(stream) {
                mediaRecorder = new MediaRecorder(stream)
            })
            .catch(function(err) {
                console.error(err)
            })
    })

    function startRecording(e) {
        mediaRecorder.start()
        recognition.start()
        recordingStarted = true
    }

    function stopRecording(e) {
        mediaRecorder.stop()
        recognition.stop()
        recordingStarted = false
    }

    $: {
        if (recognition) {
            recognition.onresult = function(event) {
                darkMode = true
                recognition.stop()
                mediaRecorder.stop()
            }
        }
    }

    $: {
        if (mediaRecorder) {
            mediaRecorder.ondataavailable = function(e) {
                audioChunks.push(e.data)
            }

            mediaRecorder.onstop = function(e) {
                const blob = new Blob(audioChunks, {
                    type: 'audio/ogg; codecs=opus',
                })
                audioChunks = []
                const audioURL = window.URL.createObjectURL(blob)
            }
        }
    }
</script>

<style>
    .speech-text {
        margin-top: 40px;
        display: block;
        font-size: 24px;
        max-width: 50vw;
    }

    .recording-status {
        margin-top: 20px;
        animation: pulse 1s ease-in-out infinite;
        font-size: 24px;
    }

    @keyframes pulse {
        from {
            opacity: 1;
        }

        50% {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .dark-mode {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 100;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 64px;
    }
</style>

{#if darkMode}
    <div class="dark-mode">That's it!</div>
{/if}
<div>
    <button
        class="button"
        on:click={recordingStarted ? stopRecording : startRecording}>
        {recordingStarted ? 'Stop' : 'Start'} recording
    </button>
    <p class="speech-text">{recordingResults}</p>
</div>
{#if recordingStarted}
    <div class="recording-status">
        <p>Recording...</p>
    </div>
{/if}
