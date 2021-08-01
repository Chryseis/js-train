/*
请实现抽奖函数rand，保证随机性
输入为表示对象数组，对象有属性n表示人名，w表示权重
随机返回一个中奖人名，中奖概率和w成正比
*/
const genPeoples = count => {
  let arr = []
  for (let i = 0; i < count; i++) {
    arr.push({ n: `p${i + 1}`, w: Math.floor(Math.random() * 5000000) })
  }

  return arr
}

const peoples = genPeoples(200)

// 方法1
const rand = function (p) {
  const ret = p.map(o => ({ ...o, score: o.w * Math.random() }))

  const max = Math.max(...ret.map(o => o.score))

  return ret.find(o => o.score === max).n
}

let startTime = +new Date()
console.log(rand(peoples))
console.log(+new Date() - startTime, 'rand1')

// 方法2
const rand2 = function (p) {
  const ret = p.reduce((arr, o) => {
    const multiple = Math.floor(o.w / 100)
    for (let i = 0; i < multiple; i++) {
      arr.push(o)
    }
    return arr
  }, [])

  const randomIdx = Math.floor(ret.length * Math.random())
  return ret[randomIdx]
}

let startTime1 = +new Date()
console.log(rand2(peoples).n)
console.log(+new Date() - startTime1, 'rand2')
