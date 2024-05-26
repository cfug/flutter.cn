/**
 * 读取 firebase.json 并
 * 生成 firebase_json.js 文件
 */

const fs = require('fs')

// firebase.json 文件路径
const READ_FILE_FIREBASE_JSON = '../../firebase.json'
// 生成 firebase_json.js 的文件路径
const WRITE_FILE_FIREBASE_JSON_JS = './src/data/'

// 读取 JSON 文件
fs.readFile(READ_FILE_FIREBASE_JSON, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err)
    return
  }
  try {
    const jsonData = JSON.parse(data)
    // 生成包含 JSON 数据的 JavaScript 文件内容
    const jsContent = `const data = ${JSON.stringify(jsonData, null, 2)}; export default data;`
    fs.mkdir(WRITE_FILE_FIREBASE_JSON_JS, { recursive: true }, (err) => {
      if (err) {
        console.error('Failed to create directory:', err)
        return
      }
      // 写入到新的 JavaScript 文件
      fs.writeFile(`${WRITE_FILE_FIREBASE_JSON_JS}firebase_json.js`, jsContent, 'utf8', (err) => {
        if (err) {
          console.error('Error writing the file:', err)
          return
        }
        console.log('firebase_json.js file has been generated successfully!')
      })
    })
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr)
  }
})