const path = require('path')
const glob = require('glob')
const fs = require('fs')

const readCss = function (pattern) {
  return new Promise(resolve => {
    glob(pattern, function (err, files) {
      const str = files.reduce((cssStr, file) => {
        return cssStr.concat(fs.readFileSync(path.resolve(file), 'utf8'))
      }, '')
      resolve(str)
    })
  })
}

readCss('less/**/*.{css,less,scss,sass}').then(cssStr => {
  console.log(cssStr)
})
