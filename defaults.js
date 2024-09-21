/**
 * Plugin Default Options
 */
export default {
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
};