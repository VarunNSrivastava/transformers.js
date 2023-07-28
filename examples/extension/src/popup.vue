<template>
    <div id="app" :class="popupClass">
        <input v-model="inputText" type="text" class="search-bar">
        <div class="results-container">
            <ResultItem
                    v-for="(result, index) in results"
                    :key="index"
                    :result="result"
                    @click="handleResultClick"
            />
        </div>
        <progress id="progress" max="100" :value="progressValue"></progress>

    </div>
</template>

<script>
import {prettyLog} from './utils.js';
import ResultItem from './result.vue';

export default {
    components: {
        ResultItem,
    },
    data() {
        return {
            inputText: '',
            results: [],
            progressValue: 0,
            processId: undefined
        };
    },
    computed: {
        popupClass() {
            return this.results.length > 0 ? 'popup-expanded' : 'popup-default';
        }
    },
    watch: {
        inputText: function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.debounce(this.spawnProcess, ["inputText", this.inputText], 100);
            }
        }
    },
    methods: {
        debounce(func, args, wait) {
            let timeout;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args); // async?
            }, wait);
        },
        async spawnProcess(type, text) {
            // if (this.processId !== undefined) {
            //     chrome.runtime.sendMessage({type: "killProcess", processId: this.processId});
            // }
            // console.log("told to spawn;");
            chrome.runtime.sendMessage({type: type, text: text});
            // console.log("finished spawning");
        },
        async handleMessage(request, sender, sendResponse) {
            switch (request.type) {
                case "responseText":
                    await this.spawnProcess("bodyText", request.text);
                    break;
                case "results":
                    this.results = request.text;
                    break;
                case "download":
                    // prettyLog('Debug', 'Received download message: ' + JSON.stringify(request));
                    if (request.data.status === 'progress') {
                        this.progressValue = request.data.progress.toFixed(2);
                    } else if (request.data.status === 'done') {
                        this.progressValue = 100;
                    }
                    break;
            }
        },
        handleResultClick(result) {
            console.log('Result clicked:', result);
            // Handle the result click here
        },
    },
    async mounted() {
        // Query the active tab and send a message to it
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        // prettyLog('Sending getText message to active tab', tab.url, "green");
        await chrome.tabs.sendMessage(tab.id, {type: "getText"});

        // Listen for messages from the content or background scripts
        chrome.runtime.onMessage.addListener(this.handleMessage);
    },
    beforeUnmount() {
        chrome.runtime.sendMessage({type: "killProcess", processId: this.processId});
        this.results = [];
        chrome.runtime.onMessage.removeListener(this.handleMessage);
    },
};
</script>

<style scoped>
.results-container {
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
}

#app.popup-default {
    width: 150px;
    transition: width 0.5s ease;
}

#app.popup-expanded {
    width: 300px;
    transition: width 0.5s ease;
}

.search-bar {
    width: 90%;
}
</style>
