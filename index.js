import markdownIt from "markdown-it";

const defaults = {
  include: /\.(vue|md)$/,
  exclude: null,
  markdownItOptions: {
    html: true
  },
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
      const included = config.include.test(id);
      const excluded = config.exclude ? config.exclude.test(id) : false;
      const ctx = { code, id, config, md };
      return included && !excluded ? parseCode(ctx) : code;
    },
  }
}

/**
 * Responsible for taking string of module and checking for markdown 
 * and transforming them (find/parse/replace), then returning the module
 */
function parseCode(ctx) {
  const { code, config, md, id } = ctx;
  const regex = {
    htmlComment: /<!--([^-->]*?)-->/gm,
    unclosedHtmlComment: /<!--(?![\s\S]*-->)/gm,
    markdownBlock: /<MarkdownBlock>([\s\S]*?)<\/MarkdownBlock>/gm,
    markdownInline: /<MarkdownInline>([\s\S]*?)<\/MarkdownInline>/gm,
    // templateBlock: /<template>([\s\S]*?)<\/template>/gm, // Will not work for nesting
    emptyLines: /^\s*\n/g,
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

  // Ensure this needs to be transformed before doing any work in file
  const hasBlock = code.match(regex.markdownBlock);
  const hasInline = code.match(regex.markdownInline);

  // Exit if none
  if (!hasBlock && !hasInline) {
    return code;
  }

  const indices = getTemplateIndices(code, regex);

  if (!indices) {
    console.error("Unable to preprocess markdown in vue:", id);
    return code;
  };
  const templateCode = code.substring(indices.startLast, indices.end);
  const transformed = templateCode
    .replace(regex.markdownBlock, replacer(parseBlock))
    .replace(regex.markdownInline, replacer(parseInline));

  const before = code.substring(0, indices.startLast);
  const after = code.substring(indices.end)

  // Put the original file back together with the new content
  return before + transformed + after;
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

/**
 * In order to allow nested <template> to be captured
 * we instead search for first last and return indices for
 * extraction.
 * - One edge case is if <template> is within a comment at top of file
 */
function getTemplateIndices(code, regex) {
  const regexStart = /<template>/g;
  const regexEnd = /<\/template>/g;

  let startMatch, startIndex, endMatch, endIndex;

  // Make sure we get the first <template> not in a comment
  while ((startMatch = regexStart.exec(code)) !== null) {
    if (regex.unclosedHtmlComment.test(code.slice(0, startMatch.index))) {
      continue; // Skip this template in comment block
    }
    startIndex = startMatch.index;
  }

  while ((endMatch = regexEnd.exec(code)) !== null) {
    endIndex = endMatch.index;
  }

  const hasStart = startIndex > -1;
  const hasEnd = endIndex > -1;

  if (!hasStart || !hasEnd) {
    return null;
  }

  return { 
    start: startIndex,
    startLast: startIndex + 10,
    end: endIndex,
    endLast: endIndex + 10
  };
}