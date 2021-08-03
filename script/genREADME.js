const path = require('path')
const fs = require('fs')
const glob = require('glob')
const ejs = require('ejs')
const querystring = require('querystring')
const { getParameters } = require('codesandbox/lib/api/define')
const { parseCode } = require('./utils')

glob('src/**/*.{js,mjs,css}', (err, files) => {
  const reg = /^src\/(.+)\/(.+)\.(mjs|js)$/
  let parameters
  const filesData = files.map(file => {
    let [src, name, subName, ext] = file.match(reg)
    const data = fs.readFileSync(path.resolve(src), 'utf8')
    const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8')

    if (subName === 'index') subName = name

    if (ext === 'mjs') {
      parameters = getParameters({
        files: {
          ...parseCode(src),
          'index.html': {
            content: html,
            isBinary: false
          }
        }
      })
    } else {
      parameters = getParameters({
        files: {
          'index.js': {
            content: data,
            isBinary: false
          },
          'index.html': {
            content: html,
            isBinary: false
          }
        }
      })
    }

    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      subName,
      data,
      codesandboxUrl: `https://codesandbox.io/api/v1/sandboxes/define?${querystring.stringify({
        parameters,
        fontsize: '14px',
        hidenavigation: 1,
        theme: 'dark'
      })}`
    }
  })

  const reduceFilesData = filesData.reduce((data, item) => {
    if (data[item.name]) {
      return { ...data, [item.name]: data[item.name].concat(item) }
    } else {
      return { ...data, [item.name]: [item] }
    }
  }, {})

  ejs.renderFile(path.resolve(__dirname, 'readme.ejs'), { reduceFilesData }, function (err, str) {
    fs.writeFile(path.resolve('README.md'), `${str}`, function (err) {
      if (err) {
        console.log(err)
      } else {
        // console.log('readme 生成成功', str)
      }
    })
  })
})
