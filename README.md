# @ulu/vite-plugin-markdown-in-vue

Plugin for the Vite build tool that enables you to use Markdown directly within your Vue component templates. It pre-processes the markdown so markdown rendering is not needed in the browser/application

## Usage

```vue
<template>
  <div>
    <SomeComponent>
      <h2>
        <MarkdownInline>This is a **test**</MarkdownInline>
      </h2>
      <MarkdownBlock>
        - This is nested markdown
      </MarkdownBlock>
    </SomeComponent>
  </div>
</template>
```

## Vite Setup

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