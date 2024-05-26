import { RE2JS } from 're2js'
import { minimatch } from 'minimatch'
import { pathToRegexp, match, parse, compile } from 'path-to-regexp'
import data from './data/firebase_json.js'

const currentPath = window.location.pathname
const redirect = getRedirect(currentPath)
console.log('Redirect: ', redirect)
if (redirect) {
  window.location.href = redirect
}

/**
 * 获取重定向路由
 * 
 * @param {String} currentPath 当前路由
 * @returns {String | null} 重定向路由
 */
function getRedirect(currentPath) {
  const redirects = data.hosting.redirects
  for (const redirect of redirects) {
    try {
      // redirects[].regex
      if (redirect.regex) {
        const regexp = RE2JS.compile(redirect.regex)
        const regexpMatcher = regexp.matcher(currentPath)
        if (regexpMatcher.matches()) {
          let destination = redirect.destination

          // 处理有命名的变量（类似 P<name>）
          const namedGroups = regexp.namedGroups()
          if (Object.keys(namedGroups).length > 0) {
            for (const name in namedGroups) {
              destination = destination.replace(`:${name}`, regexpMatcher.group(name))
            }
          }

          // 处理未命名的变量
          const groupCount = regexpMatcher.groupCount()
          if (groupCount > 0) {
            for (let i = 0; i < groupCount; i++) {
              destination = destination.replace(`:${i}`, regexpMatcher.group(i))
            }
          }
          return destination
        }
      }

      // redirects[].source
      if (redirect.source) {
        // Glob
        const globMatch = minimatch(currentPath, redirect.source)
        if (globMatch) {
          return redirect.destination
        }

        // Regexp
        const regexpMatch = pathToRegexp(redirect.source).exec(currentPath)
        if (regexpMatch) {
          let destination = redirect.destination
          const params = parse(redirect.source)
          for (let i = 0; i < params.length; i++) {
            const { name, modifier } = params[i]
            // 处理有命名的变量（类似 :name 、:name* 、:name? 等）
            if (name) {
              destination = destination.replace(`:${name}${modifier}`, regexpMatch[i])
            }

            // 处理未命名的变量
            if (!name) {
              destination = destination.replace(`:${i}`, params[i])
            }
          }
          return destination
        }

      }
    } catch (error) { }
  }
  return null
}

export { getRedirect }