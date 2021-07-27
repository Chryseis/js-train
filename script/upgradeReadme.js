const path = require('path')
const fs = require('fs')
const glob = require('glob')

glob('src/**/*.js', (err, files) => {
  const reg = /^src\/(.+)\/(.+).js$/
  const filesData = files.map(file => {
    const [src, name, subName] = file.match(reg)
    const data = fs.readFileSync(path.resolve(src), 'utf8')
    return {
      name,
      subName,
      data
    }
  })

  console.log(filesData, 'filesData')
})
