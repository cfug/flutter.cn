/**
 * Converts the specified text, usually header,
 * into a valid slug for URL fragments.
 *
 * @param text {string} The text to convert
 * @returns {string} The converted text
 */
export function slugify(text) {
  if (!text || text.length === 0) {
    return text;
  }

  // docs.flutter.cn
  // Text contains Chinese
  // e.g. <h2 id="中文"></h2>
  const chinesePattern = /[\u4e00-\u9fa5]/;
  if (chinesePattern.test(text)) {
    return text
      .toLowerCase()
      .trim();
  }

  return text
    .toLowerCase()
    .trim()
    .replace(/[:.]/g, '-')
    .replace(/[^a-z0-9\s:._-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
