const path = require('path')
const fs = require('fs')
const glob = require('glob')
const ejs = require('ejs')

glob('src/**/*.{js,mjs,css}', (err, files) => {
  const reg = /^src\/(.+)\/(.+)\.(?:mjs|js)$/
  const filesData = files.map(file => {
    let [src, name, subName] = file.match(reg)
    const data = fs.readFileSync(path.resolve(src), 'utf8')

    if (subName === 'index') subName = name
    return {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      subName,
      data
    }
  })

  console.log(filesData)

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
        console.log('readme 生成成功', str)
      }
    })
  })
})
