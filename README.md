# @ulu/vite-plugin-markdown-in-vue

Plugin for the Vite that enables you to use Markdown directly within your Vue component templates. It pre-processes the markdown to html so markdown rendering is not needed in your browser/application.

## Table of Contents

- [Usage](#usage)
- [Vite Setup](#vite-setup)
- [Options](#options)
- [Bugs, Issues and Changelog](#bugs-issues-and-changelog)

## Usage

```vue
<template>
  <div>
    <h1>Tests</h1>
    <h2>Markdown block below</h2>
    <MarkdownBlock>
      ## Hello

      - This is working
      - This is a bullet

      This is a paragraph with a [link in it](https://www.google.com) and some text
      after it too. Maybe another sentence.

      <TestComponent/>
    </MarkdownBlock>
    <h2>
      <MarkdownInline>
        This title has *Wow*
      </MarkdownInline>
    </h2>
    <TestComponent/>
  </div>
</template>
```

## Vite Setup

Note it is important that this plugin is loaded before Vue Vite plugin.

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import markdownInVue from "@ulu/vite-plugin-markdown-in-vue";

export default defineConfig({
  plugins: [
    markdownInVue(),
    vue(),
  ],
})
```

## Options

Code below show's defaults until they're documented

```js
const defaults = {
  include: /\.(vue|md)$/,
  markdownItOptions: {
    html: true
  },
  markdownItSetup(md) {
    // md.use(something)
  },
  /**
   * Provide custom markdown parser (gets string, return string)
   */
  customParser: null,
  /**
   * Provide custom markdown parser for inline (gets string and ctx, return string)
   */
  customParserInline: null
}
```

## Bugs, Issues and Changelog

If you encounter bugs or have a feature request, feel free to open an issue on github

[Change Log](CHANGELOG.md)