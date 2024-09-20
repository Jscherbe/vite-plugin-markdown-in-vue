import markdownIt from "markdown-it";

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
};

export default function pluginMarkdownInVue(options) {
  const config = Object.assign({}, defaults, options);
  const md = markdownIt(config.markdownItOptions);
  
  if (config.markdownItSetup) {
    config.markdownItSetup(md);
  }
  
  return {
    name: "pluginMarkdownInVue",
    transform(code, id) {
      const should = config.include.test(id);
      const ctx = { code, id, config, md };
      return should ? parseCode(ctx) : code;
    },
  }
}

/**
 * Responsible for taking string of module and checking for markdown 
 * and transforming them (find/parse/replace), then returning the module
 */
function parseCode(ctx) {
  const { code, config, md } = ctx;
  const regex = {
    htmlComment: /<!--([^-->]*?)-->/gm,
    unclosedHtmlComment: /<!--(?![\s\S]*-->)/gm,
    markdownBlock: /<MarkdownBlock>([\s\S]*?)<\/MarkdownBlock>/gm,
    markdownInline: /<MarkdownInline>([\s\S]*?)<\/MarkdownInline>/gm,
    templateBlock: /<template>([\s\S]*?)<\/template>/gm,
    emptyLines: /^\s*\n/g
  };

  const correctIndent = (content) => {
    const clean = content.replace(regex.emptyLines, "");
    return trimToMinimumIndent(clean);
  };

  const newParser = (method, custom) => {
    return (content) => {
      if (custom) {
        return custom(content, ctx);
      } else {
        return md[method](correctIndent(content));
      }
    }
  };
  const parseBlock = newParser("render", config.customParser);
  const parseInline = newParser("renderInline", config.customParser);
  
  const replacer = (parser) => {
    return (match, body, index, full) => {
      const markupBefore = full.substring(0, index);
      const inComment = regex.unclosedHtmlComment.test(markupBefore);
      if (inComment) return match;
      return parser(body);
    }
  };
  
  return code.replace(regex.templateBlock, (markup) => {
    return markup
      .replace(regex.markdownBlock, replacer(parseBlock))
      .replace(regex.markdownInline, replacer(parseInline));
  });
}

function trimToMinimumIndent(text) {
  const lines = text.split('\n');
  let minIndent = Infinity;

  // Find the minimum indent
  for (const line of lines) {
    const firstCharIndex = line.search(/\S/); // Find index of first non-whitespace character
    if (firstCharIndex !== -1 && firstCharIndex < minIndent) {
      minIndent = firstCharIndex;
    }
  }

  // Trim each line by the minimum indent
  return lines
    .map(line => line.substring(minIndent))
    .join('\n');
}