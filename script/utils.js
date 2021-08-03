const fs = require('fs')
const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default

const parseCode = code => {
  const dependencies = []
  const reg = /^\.\.\/(.+)\/.+$/

  const ast = parse(code, {
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
    'index.js': generator(ast).code,
    ...dependencies.reduce((o, d) => {
      const key = d.match(reg)?.[1]
      const code = fs.readFileSync(d, 'utf8')
      return {
        ...o
      }
    }, {})
  }
}

module.exports = {
  parseCode
}
