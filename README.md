

<p align="center">
    <br/>
    <picture> 
        <source media="(prefers-color-scheme: dark)" srcset="https://huggingface.co/datasets/Xenova/transformers.js-docs/raw/main/transformersjs-dark.svg" width="500" style="max-width: 100%;">
        <source media="(prefers-color-scheme: light)" srcset="https://huggingface.co/datasets/Xenova/transformers.js-docs/raw/main/transformersjs-light.svg" width="500" style="max-width: 100%;">
        <img alt="transformers.js javascript library logo" src="https://huggingface.co/datasets/Xenova/transformers.js-docs/raw/main/transformersjs-light.svg" width="500" style="max-width: 100%;">
    </picture>
    <br/>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/@xenova/transformers">
        <img alt="NPM" src="https://img.shields.io/npm/v/@xenova/transformers">
    </a>
    <a href="https://www.npmjs.com/package/@xenova/transformers">
        <img alt="Downloads" src="https://img.shields.io/npm/dw/@xenova/transformers">
    </a>
    <a href="https://github.com/xenova/transformers.js/blob/main/LICENSE">
        <img alt="License" src="https://img.shields.io/github/license/xenova/transformers.js">
    </a>
    <a href="https://huggingface.co/docs/transformers.js/index">
        <img alt="Documentation" src="https://img.shields.io/website/http/huggingface.co/docs/transformers.js/index.svg?down_color=red&down_message=offline&up_message=online">
    </a>
</p>

**This fork is meant exclusively to demonstrate the 
Semantic Searcher extension. Here's how to run it:**

In this directory,

````npm install````

Then, in examples/extension/, run 

```
npm install
npm run dev
```

Then, go to chrome://extensions and select Load Unpacked. Select the generated build/
folder in extension/. For now, this extension runs as an extension popup.
