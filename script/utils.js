const fs = require('fs')
const path = require('path')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default

const parseCode = filePath => {
  const dependencies = []
  const reg = /^\.\.\/(.+)\/.+$/

  const ast = parse(fs.readFileSync(path.resolve(filePath), 'utf8'), {
    sourceType: 'module'
  })

  traverse(ast, {
    ImportDeclaration(path) {
      const node = path.node
      dependencies.push(node.source.value)
      const dirName = node.source.value.match(reg)?.[1]
      node.source.value = `./${dirName}.js`
      node.source.extra.rawValue = `./${dirName}.js`
      node.source.extra.raw = `./${dirName}.js`
    }
  })

  return {
    'index.js': { content: generator(ast).code, isBinary: false },
    ...dependencies.reduce((o, d) => {
      const key = d.match(reg)?.[1]
      const absolutePath = d.replace(/\.\./, 'src')
      const code = fs.readFileSync(absolutePath, 'utf8')
      return {
        ...o,
        [key]: {
          content: code,
          isBinary: false
        }
      }
    }, {})
  }
}

module.exports = {
  parseCode
}
