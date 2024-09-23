# Change Log

## 0.0.7

- Readme change

## 0.0.6

- Add options for adding optional wrapper elements around output html (rendered markdown). New options include wrapBlock, wrapInline, wrapBlockClasses, wrapInlineClasses. Wrapper is not used when implementing customParser or customParserInline

## 0.0.5

- Make option for elementNameBlock, elementNameInline so user can choose what the xml/component like name is. For example using the shorter `<MdBlock>` for example.
- Test this with use inside a markdown file (only used within components), using ["unplugin-vue-markdown/vite"](https://github.com/unplugin/unplugin-vue-markdown)

## 0.0.4 

- Fix issue in regex/matching for transform that didn't account for nested template tags