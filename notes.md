# Notes

## Todo

- Test with unplugin vue md

## Trash/Old Regex patterns

```js
{
  htmlComment: /<!--([^-->]*?)-->/gm,
  markdownBlock: /<MarkdownBlock>([\s\S]*?)<\/MarkdownBlock>/gm, // made dynamic
  markdownInline: /<MarkdownInline>([\s\S]*?)<\/MarkdownInline>/gm, // made dynamic
  templateBlock: /<template>([\s\S]*?)<\/template>/gm, // Will not work for nesting
}
```