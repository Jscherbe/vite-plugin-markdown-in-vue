import markdownIt from "markdown-it";
import defaults from "./defaults.js";

/**
 * 
 * @param {Object} options Plugin options, see defaults for options
 * @returns 
 */
export default function pluginMarkdownInVue(options) {
  const config = Object.assign({}, defaults, options);
  const md = markdownIt(config.markdownItOptions);
  const regex = {
    unclosedHtmlComment: /<!--(?![\s\S]*-->)/gm,
    emptyLines         : /^\s*\n/g,
    markdownBlock      : newTagRegex(config.elementNameBlock),
    markdownInline     : newTagRegex(config.elementNameInline),
  };
  const shared = { config, md, regex };

  if (config.markdownItSetup) {
    config.markdownItSetup(md);
  }
  
  return {
    name: "pluginMarkdownInVue",
    enforce: "pre",
    transform(code, id) {
      const included = config.include.test(id);
      const excluded = config.exclude ? config.exclude.test(id) : false;
      const ctx = { code, id, ...shared };
      return included && !excluded ? parseCode(ctx) : code;
    },
  }
}

/**
 * Responsible for taking string of module and checking for markdown 
 * and transforming them (find/parse/replace), then returning the module
 */
function parseCode(ctx) {
  const { 
    code, 
    config, 
    md, 
    id,
    regex
  } = ctx;

  // Ensure this needs to be transformed before doing any work in file
  const hasBlock = code.match(regex.markdownBlock);
  const hasInline = code.match(regex.markdownInline);
  
  // Exit if none
  if (!hasBlock && !hasInline) {
    return code;
  }

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
  
  const transform = (content) => {
    return content
      .replace(regex.markdownBlock, replacer(parseBlock))
      .replace(regex.markdownInline, replacer(parseInline));
  }

  if (id.match(config.isVueSfc)) {
    const indices = getTemplateIndices(code, regex);

    if (!indices) {
      console.error("Unable to preprocess markdown in vue:", id);
      return code;
    };

    const templateCode = code.substring(indices.startLast, indices.end);
    const transformed = transform(templateCode);
    const before = code.substring(0, indices.startLast);
    const after = code.substring(indices.end)
  
    // Put the original file back together with the new content
    return before + transformed + after;
  // For non vue file replace anywhere
  } else {
    return transform(code);
  }
}

/**
 * Trims the indent off the markdown so it's as if it was not indented
 * since it's inside components (indented)
 */
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

/**
 * Create regex object with dynamic tag name (ie for <MarkdownBlock>, <MdBlock> etc)
 * @return {RegExp} 
 */
function newTagRegex(name) {
  return new RegExp(`<${ name }>([\\s\\S]*?)</${ name }>`, "gm");
}