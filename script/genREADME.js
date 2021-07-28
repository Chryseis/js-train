const path = require('path')
const fs = require('fs')
const glob = require('glob')
const ejs = require('ejs')

glob('src/**/*.{js,mjs,css}', (err, files) => {
  const reg = /^src\/(.+)\/(.+).js$/
  const filesData = files.map(file => {
    let [src, name, subName] = file.match(reg)
    const data = fs.readFileSync(path.resolve(src), 'utf8')
    if (subName === 'index') subName = name
    return {
      subName,
      data
    }
  })

  ejs.renderFile(path.resolve(__dirname, 'readme.ejs'), { filesData }, function (err, str) {
    fs.writeFile(path.resolve('README.md'), `${str}`, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('readme 生成成功', str)
      }
    })
  })
})
