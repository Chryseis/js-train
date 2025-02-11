// requestUserProfile 是个通用查询用户接口
// 传入uid 拿用户昵称 10个并发请求会阻塞接口，10个依次请求耗时久显示昵称太慢
// 需求优化请求 在并发和耗时之间掌握一个平衡
const requestProfile = uid => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ uid, nick: `nick-${uid}`, age: '18' })
    }, 1000)
  })
}

let requestQueue = []

const requestUserProfile = (uid, max) => {
  return new Promise((resolve, reject) => {
    if (requestQueue.length < max) {
      requestQueue.push(uid)
      console.log(performance.now(), uid)
      console.time(`${uid} is running`)
      requestProfile(uid)
        .then(res => {
          console.timeEnd(`${uid} is running`)
          return res
        })
        .then(res => {
          requestQueue = requestQueue.filter(item => item !== uid)
          resolve(res)
        })
        .catch(err => {
          requestQueue = requestQueue.filter(item => item !== uid)
          reject(err)
        })
    } else {
      setTimeout(() => resolve(requestUserProfile(uid, max)))
    }
  })
}

;(async function () {
  try {
    console.time('request')
    const result = await Promise.all([
      requestUserProfile(1, 2),
      requestUserProfile(2, 2),
      requestUserProfile(3, 2),
      requestUserProfile(4, 2),
      requestUserProfile(5, 2),
      requestUserProfile(6, 2)
    ])
    console.log(result)
  } catch (err) {
    console.log(err)
  }

  console.timeEnd('request')
})()
