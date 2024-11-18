# @ulu/vite-plugin-markdown-in-vue

This Vite plugin lets you write Markdown directly within Vue components or other files. It pre-processes the Markdown into HTML during the build process, removing the need for browser-side rendering.

In addition to Vue files it also supports ".md" files (ie. if using something like [unplugin-vue-markdown]((https://github.com/unplugin/unplugin-vue-markdown))), see Advanced Setup Example. Technically this could be used by any source file that you bundle with vite, you would just need to add the extensions to options.include. Currently only ".vue" and ".md" files have been tested.

While primarily designed for .vue and .md files, this plugin can potentially work with any file type bundled by Vite. Simply add the desired extensions to the options.include configuration.

## Table of Contents

- [Usage](#usage)
- [Vite Setup](#vite-setup)
  - [Advanced Setup Example](#advanced-setup-example)
- [Options](#options)
- [Limitations](#limitations)
- [Bugs, Issues and Changelog](#bugs-issues-and-changelog)

## Usage

This plugin provides two placeholder components "MarkdownBlock" and "MarkdownInline". Markdown placed within the component start/end tags will be replaced with HTML.

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
    <SomeComponent>
      <template #slotName>
        <MarkdownBlock>
          ## Hello

          - This is working
          - This is a bullet
        </MarkdownBlock>
      </template>
    </SomeComponent>
  </div>
</template>
```

The components "MarkdownBlock" and "MarkdownInline" are not actual Vue components, they are replaced with HTML by this plugin before Vue transforms the single file component (ie .vue file).

Note, indentation will be trimmed off all markdown lines before passing to markdown render (unless customParser). This should only be an issue if you are relying on whitespace (ie. pre) or something, you can implement your own parser to adjust how this works. Custom parser is passed the original string with indentation.

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

### Advanced Setup Example

Example with changing the element names to "MdBlock" and "MdInline" and using [unplugin-vue-markdown](https://github.com/unplugin/unplugin-vue-markdown). Note this plugin would only be used for transforming markdown used within custom components or html within the markdown files, the normal markdown (not nested in components, etc) will be transformed after by the unplugin-vue-markdown when it transforms it into the final vue component.

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import markdownInVue from "@ulu/vite-plugin-markdown-in-vue";
import markdown from "unplugin-vue-markdown/vite";

export default defineConfig({
  plugins: [
    markdownInVue({
      elementNameBlock: "MdBlock",
      elementNameInline: "MdInline"
    }),
    // This has to be included after markdownInVue! 
    markdown(),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
  ],
})
```

## Options

Code below show's defaults until they're documented, setting these in the options object passed to the plugin will override them

```js
const defaults = {
  /**
   * Define custom element name ie <MdBlock>
   */
  elementNameBlock: "MarkdownBlock",
  /**
   * Define custom element name ie <MdInline>
   */
  elementNameInline: "MarkdownInline",
  /**
   * What file types to include (regex)
   */
  include: /\.(vue|md)$/,
  /**
   * What file types to exclude (regex)
   */
  exclude: null,
  /**
   * Options to pass to markdown-it
   */
  markdownItOptions: {
    html: true
  },
  /**
   * Alter markdown-it instance (add plugins, etc)
   */
  markdownItSetup(md) {
    // md.use(something)
  },
  /**
   * Wrap content in <div>, only if default parser
   */
  wrapBlock: false,
  /**
   * Wrap content in <span>, only if default parser
   */
  wrapInline: false,
  /**
   * Class to add to block wrapper
   */
  wrapBlockClasses: "markdown-block",
  /**
   * Class to add to inline wrapper
   */
  wrapInlineClasses: "markdown-inline",
  /**
   * Provide custom markdown parser (gets string, return string)
   * @example 
   *   const customParser = (content, ctx) => someMarkdownLibrary(content)
   */
  customParser: null,
  /**
   * Provide custom markdown parser for inline (gets string and ctx, return string)
   */
  customParserInline: null,
  /**
   * Vue files will pull <MarkdownBlock>'s only from within <template>
   * for all other extensions it will parse the whole file and replace the blocks
   * - This is matched against the file/id in vite
   */
  isVueSfc: /\.vue$/,
}
```

## Limitations

- When using with "unplugin-vue-markdown" this can't override how that plugin handles markdown. Any code that is indented more than 4 spaces with line-break before it will be converted to indented code block. To prevent this use `md.disable('code');` in markdownItSetup option in "unplugin-vue-markdown" plugin.

## Bugs, Issues and Changelog

If you encounter bugs or have a feature request, feel free to open an issue on github

[Change Log](CHANGELOG.md)