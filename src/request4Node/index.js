const https = require('https')

const hostname = ''

const request = (options, postData, headers = {}) =>
  new Promise(resolve => {
    if (options.method === 'get') {
      options.path = options.path + '?' + new URLSearchParams(postData).toString()
      postData = null
    } else {
      postData = JSON.stringify(postData)
      headers['Content-Type'] = 'application/json'
      headers['Content-Length'] = Buffer.byteLength(postData)
    }

    const req = https.request(
      {
        hostname,
        port: 443,
        ...options,
        headers: {
          ...headers
        }
      },
      res => {
        let result = ''

        res.setEncoding('utf8')

        res.on('data', chunk => {
          result += chunk
        })

        res.on('error', error => {
          console.error('res=', error)
        })

        res.on('end', () => {
          resolve(result)
        })
      }
    )

    req.on('error', error => {
      console.error('req=', error)
    })

    postData && req.write(postData)
    req.end()
  })

request({ method: 'get', path: '' }).then(data => {})
