# Change Log

## 0.0.8

- Remove leading/trailing whitespace added by markdown renderer 
  - Extra new line break after code will cause other code to be treated as indented code block in markdown pages that are post-processed by unplugin-vue-markdown
  - This returns it to just the HTML and text content with no leading/trailing new lines / whitespace
  - Add tests to check this is working
- Add note about disabling indented code blocks in unplugin-vue-markdown
- Test returning original indent (vs non indent html currently), this was unneeded so revert and stored test in /reference

## 0.0.7

- Readme change

## 0.0.6

- Add options for adding optional wrapper elements around output html (rendered markdown). New options include wrapBlock, wrapInline, wrapBlockClasses, wrapInlineClasses. Wrapper is not used when implementing customParser or customParserInline

## 0.0.5

- Make option for elementNameBlock, elementNameInline so user can choose what the xml/component like name is. For example using the shorter `<MdBlock>` for example.
- Test this with use inside a markdown file (only used within components), using ["unplugin-vue-markdown/vite"](https://github.com/unplugin/unplugin-vue-markdown)

## 0.0.4 

- Fix issue in regex/matching for transform that didn't account for nested template tags